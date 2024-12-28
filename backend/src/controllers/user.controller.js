import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userID).select("-password");
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            message: "User profile fetched successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture
            }
        });
    } catch (error) {
        console.log("Error in getUserProfile controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        console.log("Update profile request received:", req.body); // Debug log
        const user = await User.findById(req.user.userID);

        if (!user) {
            console.log("User not found:", req.user.userID); // Debug log
            return res.status(404).json({ error: "User not found" });
        }

        const profilePicture = req.body.profilePicture;
        if (profilePicture) {
            try {
                console.log("Processing profile picture..."); // Debug log

                // Base64 kontrolü
                if (!profilePicture.startsWith('data:image')) {
                    console.log("Invalid image format received"); // Debug log
                    return res.status(400).json({ error: "Invalid image format" });
                }

                // Cloudinary yükleme öncesi log
                console.log("Attempting to upload to Cloudinary..."); // Debug log

                const result = await cloudinary.uploader.upload(profilePicture, {
                    folder: "profile_pictures",
                    width: 500,
                    crop: "scale"
                });

                console.log("Cloudinary upload successful:", result.secure_url); // Debug log

                user.profilePicture = result.secure_url;
                await user.save();

                return res.status(200).json({
                    message: "Profile picture updated successfully",
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        profilePicture: user.profilePicture,
                        createdAt: user.createdAt
                    }
                });
            } catch (error) {
                console.error("Cloudinary upload error:", error); // Detailed error log
                return res.status(400).json({ 
                    error: "Error uploading profile picture",
                    details: error.message 
                });
            }
        }

        // Diğer profil güncellemeleri
        if (req.body.name) user.name = req.body.name;
        if (req.body.email) user.email = req.body.email;

        const updatedUser = await user.save();

        res.status(200).json({
            message: "User profile updated successfully",
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                profilePicture: updatedUser.profilePicture,
                createdAt: updatedUser.createdAt
            }
        });
    } catch (error) {
        console.error("Update profile error:", error); // Detailed error log
        res.status(500).json({ 
            error: "Internal Server Error",
            details: error.message 
        });
    }
};

export const getUsers = async (req, res) => {
    const loggedInUser = req.user.userID;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
    res.status(200).json({ 
        users: filteredUsers,
        message: "Users fetched successfully"
    });
};


