import  express from "express";
import "dotenv/config";
// import dotenv  from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

// dotenv.config();
console.log("GEMINI KEY LOADED:", !!process.env.GEMINI_API_KEY);

const app= express();

app.use(cors());
app.use(express.json());

connectDB();


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI Email Generator API"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes);

app.use(errorMiddleware);
const PORT= process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
});
