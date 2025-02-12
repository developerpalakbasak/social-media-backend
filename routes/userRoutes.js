import express from "express"
import { createUser, deleteUser, loginUser, logOutUser } from "../controllers/userControllers.js";
import { upload } from "../middleware/multer.middleware.js";
import protect from "../middleware/protect.js";


const userRouter = express.Router();


userRouter.post("/register", createUser)
userRouter.post("/login", loginUser)
userRouter.get("/logout", logOutUser)
userRouter.delete("/delete", protect, deleteUser)
// router.post("/upload", upload.single(image), createPost )



export default userRouter