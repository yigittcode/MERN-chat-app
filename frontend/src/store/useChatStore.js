import { create } from 'zustand'
import axiosInstance from '../lib/axios'

export const useChatStore = create((set) => ({
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
      set({ messages: response.data })
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      set({ isMessagesLoading: false })
    }
  },
  // todo : optimize this later
  setSelectedUser: (user) => set({ selectedUser: user }),
}))


