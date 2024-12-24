import { create } from 'zustand'
import axiosInstance from '../lib/axios'

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
        const response = await axiosInstance.get('/auth/check-auth')
        set({ authUser: response.data })
        
    } catch (error) {
        set({ authUser: null })
    }
    finally {
        set({ isCheckingAuth: false })
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
        const response = await axiosInstance.post('/auth/signup', data)
        set({ authUser: response.data })
        return { success: true };
    } catch (error) {
        return { success: false, error: error.response?.data?.message };
    } finally {
        set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
        const response = await axiosInstance.post('/auth/login', data)
        set({ authUser: response.data })
        return { success: true };
    } catch (error) {
        console.log('Login Error:', error);
        const errorMessage = 
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            'Login failed';
        return { success: false, error: errorMessage };
    } finally {
        set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
        await axiosInstance.post('/auth/logout')
        set({ authUser: null }) 
        return { success: true };
    } catch (error) {
        return { success: false, error: error.response?.data?.message };
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
        const response = await axiosInstance.put('/user/profile', data)
        set({ authUser: response.data.user }) // Update to get user from response.data.user
        return { success: true };
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Error updating profile';
        return { success: false, error: errorMessage };
    } finally {
        set({ isUpdatingProfile: false });
    }
  }
}))