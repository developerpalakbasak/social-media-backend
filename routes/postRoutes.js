import express from "express"
import { upload } from "../middleware/multer.middleware.js";
import { createPost, deletePost, getMyPost } from "../controllers/postControllers.js";
import protect from "../middleware/protect.js";


const postRouter = express.Router();


postRouter.post("/createpost",protect, createPost )
postRouter.delete("/deletepost",protect, deletePost )
postRouter.get("/getmypost",protect, getMyPost )



export default postRouter