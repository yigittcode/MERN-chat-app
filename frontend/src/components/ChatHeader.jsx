import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import UserAvatar from "./UserAvatar";

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();

    return (
        <div className="h-[60px] border-b border-base-300 bg-base-100 flex items-center px-4">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                    <UserAvatar user={selectedUser} size={40} />
                    
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