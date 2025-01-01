import { useEffect, useMemo, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import SidebarContact from "./SidebarContact";

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const [showOnlineUsers, setShowOnlineUsers] = useState(false);
    useEffect(() => {
        getUsers();
        const unsubscribe = useChatStore.getState().subscribeToNewUsers();
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [getUsers]);

    // Sort users: online users first, then alphabetically by name
    const sortedUsers = useMemo(() => {
        let filteredUsers = [...users];
        
        // Filter online users if showOnlineUsers is true
        if (showOnlineUsers) {
            filteredUsers = filteredUsers.filter(user => onlineUsers.includes(user._id));
        }

        return filteredUsers.sort((a, b) => {
            const isAOnline = onlineUsers.includes(a._id);
            const isBOnline = onlineUsers.includes(b._id);
            
            if (isAOnline && !isBOnline) return -1;
            if (!isAOnline && isBOnline) return 1;
            
            // If both users have the same online status, sort by name
            return a.name.localeCompare(b.name);
        });
    }, [users, onlineUsers, showOnlineUsers]);

    if (isUsersLoading) return <SidebarSkeleton />;

    return (
        <aside className="h-full w-20 lg:w-72 bg-primary border-r border-base-300 flex flex-col">
            <div className="h-[60px] border-b border-base-300 w-full bg-primary-focus flex items-center px-4">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                        <Users className="size-6 text-base-100" />
                        <span className="font-bold hidden lg:block text-base-100">
                            Contacts
                        </span>
                    </div>
                    <label className="cursor-pointer flex items-center gap-2 hidden lg:flex">
                        <span className="text-sm text-base-100">Show Online</span>
                        <input
                            type="checkbox"
                            className="toggle toggle-sm"
                            checked={showOnlineUsers}
                            onChange={(e) => setShowOnlineUsers(e.target.checked)}
                        />
                    </label>
                </div>
            </div>

            <div className="overflow-y-auto w-full py-1">
                {sortedUsers.map((user) => (
                    <SidebarContact
                        key={user._id}
                        user={user}
                        isSelected={selectedUser?._id === user._id}
                        onClick={() => setSelectedUser(user)}
                        isOnline={onlineUsers.includes(user._id)}
                    />
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
