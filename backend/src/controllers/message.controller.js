import Message from "../models/message.model.js";
import cloudinary from "../lib/claudinary.js";

export const getMessages = async (req, res) => {
    const receiverId = req.params.id;
    const loggedInUserId = req.user.userID;
    const messages = await Message.find({
        $or: [
            { sender: loggedInUserId, receiver: receiverId },
            { sender: receiverId, receiver: loggedInUserId }
        ]
    }).sort({ createdAt: 1 });
    res.status(200).json({ messages });
};

export const sendMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const loggedInUserId = req.user.userID;

        let imageUrl = "";
        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "message_images",
                    width: 500,
                    crop: "scale"
                });
                imageUrl = result.secure_url;
            } catch (error) {
                return res.status(400).json({ error: "Error uploading image" });
            }
        }

        const message = new Message({
            sender: loggedInUserId,
            receiver: receiverId,
            content: req.body.message,
            image: imageUrl
        });

        await message.save();
        res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
        console.log("Error in sendMessage controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};