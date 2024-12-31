import { create } from 'zustand'
import axiosInstance from '../lib/axios'
import { socket } from '../lib/socket'
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,


  checkAuth: async () => {
    try {
        const response = await axiosInstance.get('/auth/check-auth');
        get().connectSocket();
        set({ authUser: response.data.user })
    } catch (error) {
        set({ authUser: null })
    } finally {
        set({ isCheckingAuth: false })
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
        const response = await axiosInstance.post('/auth/signup', data);
        get().connectSocket();
        set({ authUser: response.data })
        return { success: true };
    } catch (error) {
        return { success: false, error: error.response?.data?.message };
    } finally {
        set({ isSigningUp: false });
    }
  },

  connectSocket: () => {
    const authUser = get().authUser;
    if (authUser && !socket?.connected) {
        socket.connect();
        set({ socket: socket });
        socket.auth = { authUserID: authUser._id };
        
        socket.on("getOnlineUsers", (onlineUsers) => {
          console.log("Received online users:", onlineUsers);
          if (Array.isArray(onlineUsers)) {
            set({ onlineUsers: onlineUsers });
          } else {
            console.error("Received invalid online users format:", onlineUsers);
          }
        });
        
        console.log("Socket connected!", authUser._id);
    }
  },

  disconnectSocket: () => {
    const authUser = get().authUser;
    if (authUser && socket?.connected) {
        socket.disconnect();
        console.log("Socket disconnected!", authUser._id);
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
        const response = await axiosInstance.post('/auth/login', data);
        
        try {
            set({ authUser: response.data.user}); 
            get().connectSocket();
            return { success: true };
        } catch (error) {
            console.error('State update error:', error);
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            return { success: false, error: 'Login failed due to state error' };
        }
    } catch (error) {
        console.error('Login Error:', error);
        const errorMessage = 
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            'Login failed';
        set({ authUser: null });
        return { success: false, error: errorMessage };
    } finally {
        set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
        await axiosInstance.post('/auth/logout');
        get().disconnectSocket();
        set({ authUser: null }) 
        return { success: true };
    } catch (error) {
        return { success: false, error: error.response?.data?.message };
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
        console.log("Sending profile update data:", data); // Debug log
        const response = await axiosInstance.put('/user/profile', data);
        console.log("Profile update response:", response.data); // Debug log
        set({ authUser: response.data.user });
        return { success: true };
    } catch (error) {
        console.error("Profile update error:", error.response?.data || error); // Detailed error log
        const errorMessage = error.response?.data?.error || 'Error updating profile';
        return { success: false, error: errorMessage };
    } finally {
        set({ isUpdatingProfile: false });
    }
  }
}))