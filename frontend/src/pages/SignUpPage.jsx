import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        profilePicture: ""
    });

    const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.name.trim()) return toast.error("Name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid === true) {
            const result = await signup(formData);
            if (result.success) {
                toast.success("Sign up successful!");
            } else {
                toast.error(result.error);
            }
        }
    };

    return (
        <div className="min-h-screen p-4 bg-[#008080]">
            <Toaster position="top-center" />
            <div className="container mx-auto flex justify-center items-center min-h-screen">
                <div className="bg-[#C0C0C0] border-t-2 border-l-2 border-[#FFFFFF] border-r-2 border-b-2 border-[#808080] w-full max-w-md shadow-md">
                    {/* Title bar */}
                    <div className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            <span className="font-bold">RetroChat 98 - Sign Up</span>
                        </div>
                        <div className="flex gap-1">
                            <button className="bg-[#C0C0C0] border-t border-l border-[#FFFFFF] border-r border-b border-[#808080] px-2 text-black hover:active:bg-[#C0C0C0]">_</button>
                            <button className="bg-[#C0C0C0] border-t border-l border-[#FFFFFF] border-r border-b border-[#808080] px-2 text-black hover:active:bg-[#C0C0C0]">×</button>
                        </div>
                    </div>

                    <div className="p-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 text-black">Display Name:</label>
                                <div className="relative">
                                    <User className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                                    <input
                                        type="text"
                                        className="w-full p-1.5 pl-8 bg-white border-t border-l border-[#808080] border-r border-b border-[#FFFFFF] focus:outline-none text-black"
                                        placeholder="Your display name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-1 text-black">Email Address:</label>
                                <div className="relative">
                                    <Mail className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                                    <input
                                        type="email"
                                        className="w-full p-1.5 pl-8 bg-white border-t border-l border-[#808080] border-r border-b border-[#FFFFFF] focus:outline-none text-black"
                                        placeholder="your@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-1 text-black">Password:</label>
                                <div className="relative">
                                    <Lock className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="w-full p-1.5 pl-8 bg-white border-t border-l border-[#808080] border-r border-b border-[#FFFFFF] focus:outline-none text-black"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-black"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-[#808080]">
                                <button 
                                    type="submit" 
                                    className="min-w-[100px] px-4 py-1 bg-[#C0C0C0] border-t-2 border-l-2 border-[#FFFFFF] border-r-2 border-b-2 border-[#808080] disabled:opacity-50 disabled:cursor-not-allowed active:border-t-2 active:border-l-2 active:border-[#808080] active:border-r-2 active:border-b-2 active:border-[#FFFFFF] text-black font-bold"
                                    disabled={isSigningUp}
                                >
                                    {isSigningUp ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                                            Please wait...
                                        </>
                                    ) : (
                                        "OK"
                                    )}
                                </button>
                                <Link 
                                    to="/login"
                                    className="min-w-[100px] text-center px-4 py-1 bg-[#C0C0C0] border-t-2 border-l-2 border-[#FFFFFF] border-r-2 border-b-2 border-[#808080] active:border-t-2 active:border-l-2 active:border-[#808080] active:border-r-2 active:border-b-2 active:border-[#FFFFFF] text-black font-bold"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>

                        <div className="text-center mt-4 text-sm pt-4 border-t border-[#808080]">
                            <p className="text-black">
                                Already have an account?{" "}
                                <Link to="/login" className="text-[#000080] hover:underline">
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;