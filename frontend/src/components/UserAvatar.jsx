import Avatar from 'react-avatar';

const UserAvatar = ({ user, size = 40 }) => {
    return (
        <div className="avatar">
            <div className={`w-${size/4} h-${size/4} rounded-full ring-2 ring-base-300 overflow-hidden`}>
                {user.profilePicture ? (
                    <img 
                        src={user.profilePicture} 
                        alt={user.name}
                        className="w-full h-full object-cover" 
                    />
                ) : (
                    <Avatar 
                        name={user.name} 
                        size={size} 
                        round={true}
                    />
                )}
            </div>
        </div>
    );
};

export default UserAvatar; 