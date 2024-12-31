import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId , io} from "../lib/socket.js";

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
        const image = req.body.image;
        if (image) {
            try {
                const result = await cloudinary.uploader.upload(image, {
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
            content: req.body.content,
            image: imageUrl
        });

        const savedMessage = await message.save();
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", savedMessage);
        }
        res.status(201).json(savedMessage);
    } catch (error) {
        console.log("Error in sendMessage controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};