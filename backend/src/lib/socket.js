import { Socket } from "dgram";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Map to store online users
const socketMap = new Map(); // {userId: socketId}

export const getSocketMap = () => socketMap;

export const getReceiverSocketId = (userId) => {
  return socketMap.get(userId);
}

io.on("connection", (socket) => {
  console.log("Socket connected!", socket.id);

  const authUserID = socket.handshake.auth.authUserID;
  socketMap.set(authUserID, socket.id);
  
  // Convert Map keys to Array and emit
  io.emit("getOnlineUsers", Array.from(socketMap.keys()));
  
  socket.on("disconnect", () => {
    console.log("Socket disconnected!", socket.id);
    socketMap.delete(authUserID);
    io.emit("getOnlineUsers", Array.from(socketMap.keys()));
  });
});

export { io, app, server }