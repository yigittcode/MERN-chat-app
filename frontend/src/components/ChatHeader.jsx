import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import Avatar from 'react-avatar';

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();

    return (
        <div className="h-[60px] border-b border-base-300 bg-base-100 flex items-center px-4">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="avatar">
                        <div className="w-10 h-10 rounded-full ring-2 ring-base-300 overflow-hidden">
                            {selectedUser.profilePicture ? (
                                <img 
                                    src={selectedUser.profilePicture} 
                                    alt={selectedUser.name}
                                    className="w-full h-full object-cover" 
                                />
                            ) : (
                                <Avatar 
                                    name={selectedUser.name} 
                                    size="40" 
                                    round={true}
                                />
                            )}
                        </div>
                    </div>

                    {/* User info */}
                    <div>
                        <h3 className="font-medium">{selectedUser.name}</h3>
                        <p className="text-sm text-base-content/70">
                            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>

                {/* Close button */}
                <button onClick={() => setSelectedUser(null)}>
                    <X />
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;