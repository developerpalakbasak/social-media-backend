import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";


dotenv.config({path:"config/config.env"});
const PORT = process.env.PORT || 8000





// ✅ Allow requests from ANY origin (any frontend port)
app.use( cors());

// app.listen(PORT,()=>{
//     console.log(`Listening on PORT ${PORT}`)
// })




// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));