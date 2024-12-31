import { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import MessageInput from './MessageInput'
import ChatHeader from './ChatHeader'
import MessageSkeleton from './skeletons/MessageSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import { formatMessageTime } from '../lib/utils'

const ChatContainer = () => {
  const { 
    messages, 
    getMessages, 
    isMessagesLoading, 
    selectedUser,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col h-full">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={message._id}
              className={`flex ${message.sender === authUser._id ? 'justify-end' : 'justify-start'}`}
              ref={index === messages.length - 1 ? messageEndRef : null}
            >
              <div className="flex gap-2 max-w-[80%]">
                {message.sender !== authUser._id && (
                  <div className="avatar self-end mb-1">
                    <div className="w-8 h-8 rounded-full ring-2 ring-base-300 overflow-hidden">
                      <img
                        src={selectedUser.profilePicture || "/default-avatar.png"}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                <div className={`
                  flex flex-col gap-1 p-3 rounded-lg
                  ${message.sender === authUser._id 
                    ? "bg-primary text-primary-content" 
                    : "bg-base-200 text-base-content"}
                `}>
                  {message.content && <p className="text-sm">{message.content}</p>}
                  {message.image && (
                    <img
                      src={message.image}
                      alt="message"
                      className="mt-2 max-w-[200px] rounded-lg"
                    />
                  )}
                  <span className="text-[10px] opacity-70 self-end">
                    {formatMessageTime(message.createdAt)}
                  </span>
                </div>

                {message.sender === authUser._id && (
                  <div className="avatar self-end mb-1">
                    <div className="w-8 h-8 rounded-full ring-2 ring-base-300 overflow-hidden">
                      <img
                        src={authUser.profilePicture || "/default-avatar.png"}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area - Fixed at Bottom */}
      <div className="mt-auto">
        <MessageInput />
      </div>
    </div>
  )
}

export default ChatContainer
