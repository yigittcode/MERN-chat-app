import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
    const { logout, authUser } = useAuthStore();

    return (
        <header className="bg-[#C0C0C0] border-t-2 border-l-2 border-[#FFFFFF] border-r-2 border-b-2 border-[#808080] fixed w-full top-0 z-40">
            <div className="container mx-auto h-12">
                <div className="flex items-center justify-between h-full px-2">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="flex items-center justify-center">
                                <MessageSquare className="w-4 h-4 text-black" />
                            </div>
                            <h1 className="text-base font-bold text-black">RetroChat 98</h1>
                        </Link>
                    </div>

                    <div className="flex items-center gap-1">
                        <Link
                            to={"/settings"}
                            className="px-3 py-1 bg-[#C0C0C0] border-t-2 border-l-2 border-[#FFFFFF] border-r-2 border-b-2 border-[#808080] flex items-center gap-1 active:border-t-2 active:border-l-2 active:border-[#808080] active:border-r-2 active:border-b-2 active:border-[#FFFFFF] hover:bg-[#DFDFDF]"
                        >
                            <Settings className="w-4 h-4 text-black" />
                            <span className="hidden sm:inline text-sm text-black">Settings</span>
                        </Link>

                        {authUser && (
                            <>
                                <Link 
                                    to={"/profile"} 
                                    className="px-3 py-1 bg-[#C0C0C0] border-t-2 border-l-2 border-[#FFFFFF] border-r-2 border-b-2 border-[#808080] flex items-center gap-1 active:border-t-2 active:border-l-2 active:border-[#808080] active:border-r-2 active:border-b-2 active:border-[#FFFFFF] hover:bg-[#DFDFDF]"
                                >
                                    <User className="w-4 h-4 text-black" />
                                    <span className="hidden sm:inline text-sm text-black">Profile</span>
                                </Link>

                                <button 
                                    onClick={logout}
                                    className="px-3 py-1 bg-[#C0C0C0] border-t-2 border-l-2 border-[#FFFFFF] border-r-2 border-b-2 border-[#808080] flex items-center gap-1 active:border-t-2 active:border-l-2 active:border-[#808080] active:border-r-2 active:border-b-2 active:border-[#FFFFFF] hover:bg-[#DFDFDF]"
                                >
                                    <LogOut className="w-4 h-4 text-black" />
                                    <span className="hidden sm:inline text-sm text-black">Logout</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Navbar;