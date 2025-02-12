import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a Valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
        select: false,
        minLength: [6, "Password must be 6 characters"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Generate JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Follow a user
userSchema.methods.follow = async function (userId) {
    if (!this.following.includes(userId)) {
        this.following.push(userId);
        await this.save();
    }
};

// Unfollow a user
userSchema.methods.unfollow = async function (userId) {
    this.following = this.following.filter(id => id.toString() !== userId.toString());
    await this.save();
};

// Add follower
userSchema.methods.addFollower = async function (userId) {
    if (!this.followers.includes(userId)) {
        this.followers.push(userId);
        await this.save();
    }
};

// Remove follower
userSchema.methods.removeFollower = async function (userId) {
    this.followers = this.followers.filter(id => id.toString() !== userId.toString());
    await this.save();
};

const User = mongoose.model("User", userSchema);

export default User;
