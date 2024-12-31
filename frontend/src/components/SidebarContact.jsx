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
            <div className="relative">
                <UserAvatar user={user} size={40} />
                <div className={`
                    absolute bottom-0 right-0
                    w-3 h-3 rounded-full border-2 border-primary
                    ${isOnline ? 'bg-success' : 'bg-base-300'}
                `} />
            </div>

            <div className="hidden lg:block text-left min-w-0 flex-1">
                <h3 className="font-medium text-base-100 truncate">
                    {user.name}
                </h3>
            </div>
        </button>
    );
};

export default SidebarContact; 