import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    content: { 
        type: String, 
        trim: true 
    },
    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true,
        index: true 
    },
    receiver: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true,
        index: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
        index: true 
    },
    image: {
        type: String,
    },
}, {
    timestamps: true // Adds updatedAt field automatically
});

// Create compound index for faster message history queries
messageSchema.index({ sender: 1, receiver: 1, createdAt: -1 });

export default mongoose.model("Message", messageSchema);