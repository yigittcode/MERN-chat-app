import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Bu, { userID: ... } şeklinde olacak
        
        next();
    } catch (error) {
        console.log("Error in auth middleware:", error);
        return res.status(401).json({ error: "Invalid token" });
    }
};