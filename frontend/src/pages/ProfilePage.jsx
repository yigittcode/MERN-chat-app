import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Save, X, Minus, Square, X as Close } from "lucide-react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const { authUser, isUpdatingProfile, updateProfile, isCheckingAuth } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {
        if (authUser) {
            setFormData({
                name: authUser.name || '',
                email: authUser.email || ''
            });
        }
    }, [authUser]);

    const handleImageUpload = async (e) => {
        try {
            const file = e.target.files[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                toast.error('Please upload an image file');
                return;
            }

            const reader = new FileReader();

            reader.onload = async () => {
                try {
                    const base64Image = reader.result;
                    setSelectedImg(base64Image);
                    const result = await updateProfile({ profilePicture: base64Image });
                    
                    if (result.success) {
                        toast.success('Profile picture updated successfully!');
                    } else {
                        toast.error(result.error || 'Failed to update profile picture');
                        setSelectedImg(null);
                    }
                } catch (error) {
                    toast.error('Failed to process image');
                    setSelectedImg(null);
                }
            };

            reader.onerror = () => {
                toast.error('Error reading file');
                setSelectedImg(null);
            };

            reader.readAsDataURL(file);

        } catch (error) {
            toast.error('Failed to upload image');
            setSelectedImg(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name.trim()) {
            return toast.error('Name is required');
        }
        if (!formData.email.trim()) {
            return toast.error('Email is required');
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            return toast.error('Invalid email format');
        }

        const result = await updateProfile(formData);
        if (result.success) {
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } else {
            toast.error(result.error || 'Failed to update profile');
        }
    };

    if (isCheckingAuth) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#008080]">
                <div className="animate-spin size-8 border-4 border-[#000080] border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (!authUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="min-h-screen flex items-center p-4 bg-base-200">
            <div className="container mx-auto">
                <div className="bg-base-100 shadow-md border w-full max-w-2xl mx-auto p-4">
                    <div className="bg-primary text-primary-content font-bold px-2 py-1 mb-4 flex items-center justify-between">
                        <span>Profile Settings.exe</span>
                        <div className="flex gap-1">
                            <button className="bg-[#C0C0C0] text-black px-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1),inset_-1px_-1px_#808080,inset_1px_1px_#FFFFFF] hover:bg-[#d4d4d4]">
                                <Minus className="w-3 h-3" />
                            </button>
                            <button className="bg-[#C0C0C0] text-black px-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1),inset_-1px_-1px_#808080,inset_1px_1px_#FFFFFF] hover:bg-[#d4d4d4]">
                                <Square className="w-3 h-3" />
                            </button>
                            <button className="bg-[#C0C0C0] text-black px-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1),inset_-1px_-1px_#808080,inset_1px_1px_#FFFFFF] hover:bg-[#d4d4d4]">
                                <Close className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                    
                    {/* Profile Picture Section */}
                    <div className="flex items-center justify-center mb-6">
                        <div className="relative">
                            <img
                                src={selectedImg || authUser.profilePicture || "default-avatar.png"}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-2 shadow-[inset_-1px_-1px_#808080,inset_1px_1px_#FFFFFF]"
                            />
                            <label className="absolute bottom-0 right-0 bg-[#C0C0C0] p-2 rounded-full cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1),inset_-1px_-1px_#808080,inset_1px_1px_#FFFFFF] hover:bg-[#d4d4d4]">
                                <Camera className="w-5 h-5" />
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Profile Info Section */}
                    <div className="space-y-4">
                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block mb-1 text-black font-bold">Name:</label>
                                    <div className="relative">
                                        <User className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full p-1.5 pl-8 bg-white shadow-[inset_-1px_-1px_#FFFFFF,inset_1px_1px_#808080] focus:outline-none text-black"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-1 text-black font-bold">Email:</label>
                                    <div className="relative">
                                        <Mail className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className="w-full p-1.5 pl-8 bg-white shadow-[inset_-1px_-1px_#FFFFFF,inset_1px_1px_#808080] focus:outline-none text-black"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="submit"
                                        disabled={isUpdatingProfile}
                                        className="flex items-center gap-2 px-4 py-1 bg-[#C0C0C0] text-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1),inset_-1px_-1px_#808080,inset_1px_1px_#FFFFFF] hover:bg-[#d4d4d4] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                                    >
                                        <Save className="w-4 h-4" />
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setFormData({
                                                name: authUser.name,
                                                email: authUser.email
                                            });
                                        }}
                                        className="flex items-center gap-2 px-4 py-1 bg-[#C0C0C0] text-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1),inset_-1px_-1px_#808080,inset_1px_1px_#FFFFFF] hover:bg-[#d4d4d4] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                                    >
                                        <X className="w-4 h-4" />
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-2 bg-white shadow-[inset_-1px_-1px_#FFFFFF,inset_1px_1px_#808080]">
                                    <span className="text-black font-bold">Name:</span>
                                    <span className="text-black">{authUser.name}</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-white shadow-[inset_-1px_-1px_#FFFFFF,inset_1px_1px_#808080]">
                                    <span className="text-black font-bold">Email:</span>
                                    <span className="text-black">{authUser.email}</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-white shadow-[inset_-1px_-1px_#FFFFFF,inset_1px_1px_#808080]">
                                    <span className="text-black font-bold">Join Date:</span>
                                    <span className="text-black">{authUser.createdAt?.split("T")[0]}</span>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-4 py-1 bg-[#C0C0C0] text-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1),inset_-1px_-1px_#808080,inset_1px_1px_#FFFFFF] hover:bg-[#d4d4d4] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;