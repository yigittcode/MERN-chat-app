import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import { connectDB } from "./lib/database.js";
import { generateJwtSecret } from './lib/generateJwtSecret.js';
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js";
import cors from "cors";
dotenv.config();
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
if (!process.env.JWT_SECRET) {
    generateJwtSecret().then(() => {
        console.log('JWT secret successfully generated.');
    }).catch((err) => {
        console.error('Error generating JWT secret:', err);
    });
} else {
    console.log('JWT secret already exists.');
}


app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/messages", messageRoute);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.log("Error connecting to MongoDB", err.message);
});
