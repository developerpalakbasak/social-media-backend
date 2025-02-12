
import catchAsyncError from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import User from "../models/userModels.js"
import sendToken from "../utils/sendToken.js";





// create user
export const createUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    // Create user in database
    await User.create({
        name,
        email,
        password
    });



    // Ensure the user is fetched with the password field
    const user = await User.findOne({ email })
    if (!user) {
        return next(new ErrorHandler("Failed to query from database", 500))
    }

    res.message = "User Created"
    sendToken(user, 201, res)

});


// login user
export const loginUser = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body

    // checking data from request
    if (!email || !password) {
        return next(new ErrorHandler('All Field Are Required', 400));
    }

    // ✅ Check if user already exists
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    // ✅ Verify password
    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid Email or password", 401));
    }

    res.message = "User Logged In"
    sendToken(user, 200, res)

}
);

// logout user
export const logOutUser = catchAsyncError(async (req, res, next) => {

    const cookie = req.cookies
    res.message = "User Logged Out"

    // console.log(cookie)


    const options = {
        expires: new Date(
            Date.now()
        ),
        httpOnly: true
    };


    res.status(200).cookie("token", "", options).json({
        success: true,
        message: res.message
    })

}
);

// delete user
export const deleteUser = catchAsyncError(async (req, res, next) => {

    const userId = req.user.id;




    const deleteUser = await User.findById(userId);

    if (deleteUser) {

        const deleteUser = await User.findByIdAndDelete(userId);
        const message = "User Deleted Successfully"

        return res.status(200).json({
            success: true,
            userId,
            deleteUser,
            message
        })

    }


    return res.status(400).json({
        success: false,
        userId,
    })

}
);




