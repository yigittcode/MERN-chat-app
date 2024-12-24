import User from "../models/user.model.js";
import cloudinary from "../lib/claudinary.js";
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
        const user = await User.findById(req.user.userID);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (req.body.name) user.name = req.body.name;
        if (req.body.email) user.email = req.body.email;

        if (req.file) {
            try {
                if (user.profilePicture) {
                    const imageId = user.profilePicture.split("/").pop().split(".")[0];
                    await cloudinary.uploader.destroy(imageId);
                }

                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "profile_pictures",
                    width: 200,
                    crop: "scale"
                });

                user.profilePicture = result.secure_url;
            } catch (error) {
                return res.status(400).json({ error: "Error uploading profile picture" });
            }
        }

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await user.save();

        res.status(200).json({
            message: "User profile updated successfully",
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                profilePicture: updatedUser.profilePicture
            }
        });
    } catch (error) {
        console.log("Error in updateUserProfile controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
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


