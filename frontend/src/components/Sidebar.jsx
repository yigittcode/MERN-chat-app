import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import Avatar from "react-avatar";

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    
    const { onlineUsers } = useAuthStore();
    useEffect(() => {
        getUsers();
    }, [getUsers]);

    if (isUsersLoading) return <SidebarSkeleton />;

    return (
        <aside className="h-full w-20 lg:w-72 bg-primary border-r border-base-300 flex flex-col">
            <div className="h-[60px] border-b border-base-300 w-full bg-primary-focus flex items-center px-4">
                <div className="flex items-center gap-2">
                    <Users className="size-6 text-base-100" />
                    <span className="font-bold hidden lg:block text-base-100">Contacts</span>
                </div>
            </div>

            <div className="overflow-y-auto w-full py-1">
                {users.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`
                            w-full p-2 flex items-center gap-3
                            transition-colors
                            ${selectedUser?._id === user._id 
                                ? "bg-black/20" 
                                : "hover:bg-black/10"}
                        `}
                    >
                        <div className="avatar">
                            <div className="w-10 h-10 rounded-full ring-2 ring-primary-content/20 overflow-hidden">
                                <img 
                                    src={user.profilePicture || "/default-avatar.png"} 
                                    alt={user.name}
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                        </div>

                        <div className="hidden lg:block text-left min-w-0 flex-1">
                            <h3 className="font-medium text-base-100 truncate">{user.name}</h3>
                            <p className="text-sm text-base-100/70">
                                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
