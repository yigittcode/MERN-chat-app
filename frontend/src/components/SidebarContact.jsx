import UserAvatar from "./UserAvatar";

const SidebarContact = ({ user, isSelected, onClick, isOnline }) => {
    return (
        <button
            onClick={onClick}
            className={`
                w-full p-2 flex items-center gap-3
                transition-colors
                ${isSelected ? "bg-black/20" : "hover:bg-black/10"}
            `}
        >
            <UserAvatar user={user} size={40} />

            <div className="hidden lg:block text-left min-w-0 flex-1">
                <h3 className="font-medium text-base-100 truncate">
                    {user.name}
                </h3>
                <p className="text-sm text-base-100/70">
                    {isOnline ? "Online" : "Offline"}
                </p>
            </div>
        </button>
    );
};

export default SidebarContact; 