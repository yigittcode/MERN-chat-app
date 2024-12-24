import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import { connectDB } from "./lib/database.js";
import { generateJwtSecret } from './lib/generate.JWTSecret.js';

dotenv.config();
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

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

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.log("Error connecting to MongoDB", err.message);
});
