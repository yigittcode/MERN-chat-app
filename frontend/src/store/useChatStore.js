import { create } from 'zustand'
import axiosInstance from '../lib/axios'
import { useAuthStore } from './useAuthStore'

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  
  getUsers: async () => {
    set({ isUsersLoading: true })
    try {
      const response = await axiosInstance.get('/user/getUsers')
      set({ users: response.data.users })
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      set({ isUsersLoading: false })
    }
  },

  getMessages: async (userID) => {
    set({ isMessagesLoading: true })
    try {
      const response = await axiosInstance.get(`/messages/${userID}`)
      set({ messages: response.data.messages || [] })
    } catch (error) {
      console.error('Error fetching messages:', error)
      set({ messages: [] })
    } finally {
      set({ isMessagesLoading: false })
    }
  },

  sendMessage: async (message) => {
    const { selectedUser } = get()
    const authUser = useAuthStore.getState().authUser
    
    set({ isMessagesLoading: true })
    try {
      const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`, message)
      const newMessage = {
        _id: response.data._id,
        sender: authUser._id,
        receiver: selectedUser._id,
        content: message.content,
        image: message.image,
        createdAt: new Date().toISOString()
      }

      set(state => ({ 
        messages: Array.isArray(state.messages) ? [...state.messages, newMessage] : [newMessage] 
      }))
    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    } finally {
      set({ isMessagesLoading: false })
    }
  },

  setSelectedUser: (user) => set({ selectedUser: user }),
}))


