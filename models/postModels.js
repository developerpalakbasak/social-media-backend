import mongoose from "mongoose";

// Create the schema for Post
const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true, // Ensuring content is required
    },
    content: {
        type: String,
        required: true, // Ensuring content is required
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Use mongoose ObjectId type
        ref: "User", // Reference to the User collection
        required: true, // Ensuring userId is required
    },
    createdAt: {
        type: Date,
        default: Date.now, // default value for createdAt
    },
    date: {
        type: Date,
        default: Date.now, // default value for date
    }
});



// verify user
postSchema.methods.verifyUser = async function (userId) {
    return userId == this.userId
}



// Create and export the Post model
const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
