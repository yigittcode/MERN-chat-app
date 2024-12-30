import {useEffect} from 'react'
import { useChatStore } from '../store/useChatStore'
import MessageInput from './MessageInput'
import ChatHeader from './ChatHeader'
const ChatContainer = () => {
  const { selectedUser, messages , isMessageLoading , getMessages} = useChatStore();
  console.log("selectedUser   ", selectedUser)
if(isMessageLoading) return <div>Loading...</div>

useEffect(() => {
  getMessages(selectedUser._id)
}, [selectedUser, getMessages])
  return (
    <div>
      <ChatHeader />
      <p>
        messages...
      </p>
      <MessageInput />
    </div>
  )
}

export default ChatContainer
