import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; 

export const socket = io(SOCKET_URL, {
  autoConnect: false, // Prevents automatic connection on socket creation, allowing manual control
  withCredentials: true,
});
