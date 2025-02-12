import PostModel from "../models/postModels.js";
import catchAsyncError from "../utils/catchAsyncError.js";




export const createPost = catchAsyncError(async (req, res) => {

    const { title, content } = req.body;

    // Create user in database
    await PostModel.create({
        title,
        content,
        userId: req.user.id
    });

    res.status(201).json({
        success: true,
        message: "Post created successfully",
        title, content, userId: req.user.id
    })



})

// delete post
export const deletePost = catchAsyncError(async (req, res) => {

    const { id } = req.query;
    const userId = req.user.id;

    console.log(id)
    // Create user in database
    const post = await PostModel.findById(id);
    // console.log(post)

    //if post not found
    if (!post) {
        return res.status(400).json({
            success: false,
            message: "Post not found"
        })
    }

    // verify posts user(admin)
    const isPostAdmin = await post.verifyUser(userId)

    // console.log(isPostAdmin)


    // if user is admin of this post
    if (isPostAdmin) {
        const deletedPost = await PostModel.findByIdAndDelete(id);

       return res.status(201).json({
            success: true,
            message: "Post deleted successfully",
            deletedPost,
        })
    }


    //if user is wrong
      return  res.status(400).json({
            success: false,
            message: "This user is not admin of this post",
        })
    

})

// get all post
export const getMyPost = catchAsyncError(async (req, res) => {

    const userId = req.user.id;

    const myPost = await PostModel.find({userId});

    if(!myPost){
        return  res.status(200).json({
            success: false,
            message: "No Posts Available",
        })
    
    }
    //if user is wrong
      return  res.status(200).json({
            success: true,
            message: "get All Post Route",
            myPost
        })
    

})