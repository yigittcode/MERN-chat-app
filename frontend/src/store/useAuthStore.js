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
        set({ authUser: response.data.user });
        
        // Kimlik doğrulama sonrası socket bağlantısını kur
        setTimeout(() => {
            get().connectSocket();
        }, 100);
    } catch (error) {
        set({ authUser: null });
    } finally {
        set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
        const response = await axiosInstance.post('/auth/signup', data);
        
        // Önce state'i güncelle
        await set({ authUser: response.data.user });
        
        // Socket bağlantısını kur ve başarılı olduğundan emin ol
        try {
            await new Promise((resolve, reject) => {
                const socketConnect = get().connectSocket();
                
                if (socketConnect) {
                    socket.once('connect', () => {
                        resolve();
                    });
                    
                    socket.once('connect_error', (error) => {
                        reject(error);
                    });
                } else {
                    reject(new Error('Socket connection failed'));
                }
            });
            
            return { success: true };
        } catch (socketError) {
            console.error('Socket connection error:', socketError);
            return { success: true }; // Socket hatası olsa bile signup başarılı sayılabilir
        }
    } catch (error) {
        return { success: false, error: error.response?.data?.error };
    } finally {
        set({ isSigningUp: false });
    }
  },

  connectSocket: () => {
    const authUser = get().authUser;
    if (!authUser) return false;

    try {
        if (!socket?.connected) {
            socket.connect();
            socket.auth = { authUserID: authUser._id };
            
            // Önceki dinleyicileri temizle
            socket.off("getOnlineUsers");
            
            socket.on("getOnlineUsers", (onlineUsers) => {
                if (Array.isArray(onlineUsers)) {
                    set({ onlineUsers: onlineUsers });
                }
            });
            
            set({ socket: socket });
            return true;
        }
        return true;
    } catch (error) {
        console.error('Socket connection error:', error);
        return false;
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
        
        // Önce state'i güncelle
        await set({ authUser: response.data.user });
        
        // Socket bağlantısını kur ve başarılı olduğundan emin ol
        try {
            await new Promise((resolve, reject) => {
                const socketConnect = get().connectSocket();
                
                // Socket bağlantısı başarılı mı kontrol et
                if (socketConnect) {
                    socket.once('connect', () => {
                        resolve();
                    });
                    
                    socket.once('connect_error', (error) => {
                        reject(error);
                    });
                } else {
                    reject(new Error('Socket connection failed'));
                }
            });
            
            return { success: true };
        } catch (socketError) {
            console.error('Socket connection error:', socketError);
            // Socket bağlantısı başarısız olsa bile login başarılı sayılabilir
            return { success: true };
        }
    } catch (error) {
        console.error('Login Error:', error);
        const errorMessage = error.response?.data?.error || 'Login failed';
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