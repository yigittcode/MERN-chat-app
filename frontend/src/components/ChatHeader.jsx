import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import UserAvatar from "./UserAvatar";

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const isOnline = onlineUsers.includes(selectedUser._id);

    return (
        <div className="h-[60px] border-b border-base-300 bg-base-100 flex items-center px-4">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <UserAvatar user={selectedUser} size={40} />
                        <div className={`
                            absolute bottom-0 right-0
                            w-3 h-3 rounded-full border-2 border-base-100
                            ${isOnline ? 'bg-success' : 'bg-base-300'}
                        `} />
                    </div>
                    
                    {/* User info */}
                    <div>
                        <h3 className="font-medium">{selectedUser.name}</h3>
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