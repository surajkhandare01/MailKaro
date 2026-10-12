import express from "express";
import "dotenv/config";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

console.log("GEMINI KEY LOADED:", !!process.env.GEMINI_API_KEY);

const app = express();

// सर्व ओरिजिन आणि मेथड्सना पूर्ण परवानगी देण्यासाठी
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Email Generator API",
  });
});

// दोन्ही एंडपॉइंट्स सुरू ठेवा जेणेकरून /auth किंवा /api/auth कुठूनही कॉल आला तरी चालेल
app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes); 

app.use("/api/email", emailRoutes);
app.use("/email", emailRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});