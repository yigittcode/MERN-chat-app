import React from 'react'
import { useChatStore } from '../store/useChatStore'
import NoChatSelected from '../components/NoChatSelected'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'

const HomePage = () => {
  const { selectedUser } = useChatStore()

  return (
    <div className="flex h-screen items-center justify-center bg-base-200 p-4">
      <div className="container mx-auto flex h-[80vh] max-w-6xl overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-xl">
        <Sidebar />
        <div className="flex-1">
          {!selectedUser ? (
            <NoChatSelected />
          ) : (
            <ChatContainer />
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
