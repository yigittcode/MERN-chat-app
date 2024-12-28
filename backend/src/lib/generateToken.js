import jwt from "jsonwebtoken";

export const generateToken = (userID, res) => {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, { 
        expiresIn: '5d' 
    });
    
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
        sameSite: "strict",
        secure: process.env.NODE_ENV !== 'development',
    });

    return token;
};