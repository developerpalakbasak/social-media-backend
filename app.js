import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import error from "./middleware/error.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Allow any origin for "/uploads"
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ Restrict all other routes ("/") to only localhost:3000
app.use(
  cors({
    origin: "http://localhost:3000", // Only allow requests from port 3000
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1", postRouter);







app.use(error)

export default app;
