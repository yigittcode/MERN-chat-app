import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    const user = authUser.user;

    
    const [selectedImg, setSelectedImg] = useState(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePicture: base64Image });
        };
    };

    return (
        <div className="h-screen pt-20 bg-[#008080]">
            <div className="max-w-2xl mx-auto p-4 py-8">
                <div className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] rounded-none p-4 space-y-6">
                    <div className="bg-[#000080] text-white p-2 flex items-center justify-between">
                        <span className="font-bold">Profile.exe</span>
                        <div className="flex gap-1">
                            <button className="bg-[#c0c0c0] text-black px-2 border border-t-white border-l-white border-r-[#808080] border-b-[#808080]">_</button>
                            <button className="bg-[#c0c0c0] text-black px-2 border border-t-white border-l-white border-r-[#808080] border-b-[#808080]">□</button>
                            <button className="bg-[#c0c0c0] text-black px-2 border border-t-white border-l-white border-r-[#808080] border-b-[#808080]">X</button>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <img
                                src={selectedImg || user?.profilePicture || "/avatar.png"}
                                alt="Profile"
                                className="size-32 object-cover border-2 border-[#808080] border-t-black border-l-black"
                            />
                            <label
                                htmlFor="avatar-upload"
                                className={`
                                    absolute bottom-0 right-0 
                                    bg-[#c0c0c0] hover:bg-[#d0d0d0]
                                    p-2 cursor-pointer border-2
                                    border-t-white border-l-white 
                                    border-r-[#808080] border-b-[#808080]
                                    ${isUpdatingProfile ? "opacity-50 pointer-events-none" : ""}
                                `}
                            >
                                <Camera className="w-5 h-5" />
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUpdatingProfile}
                                />
                            </label>
                        </div>
                        <p className="text-sm text-black font-medium">
                            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 font-bold text-black">
                                <User className="w-4 h-4" />
                                Full Name
                            </div>
                            <p className="px-4 py-2 bg-white border-2 border-[#808080] border-t-black border-l-black text-black">{user?.name}</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 font-bold text-black">
                                <Mail className="w-4 h-4" />
                                Email Address
                            </div>
                            <p className="px-4 py-2 bg-white border-2 border-[#808080] border-t-black border-l-black text-black">{user?.email}</p>
                        </div>
                    </div>

                    <div className="border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] p-4">
                        <h2 className="font-bold mb-4 text-black">Account Information</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between py-2 border-b border-[#808080]">
                                <span className="text-black">Member Since</span>
                                <span className="text-black">{user?.createdAt?.split("T")[0]}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-black">Account Status</span>
                                <span className="text-green-700 font-bold">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProfilePage;