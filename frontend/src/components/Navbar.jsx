import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
    const { logout, authUser } = useAuthStore();

    return (
        <header className="bg-base-200 shadow-lg border-b border-base-300 fixed w-full top-0 z-50">
            <div className="container mx-auto h-14">
                <div className="flex items-center justify-between h-full px-4">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-primary" />
                            </div>
                            <h1 className="text-base font-bold text-base-content">RetroChat 98</h1>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            to={"/settings"}
                            className="px-3 py-2 bg-base-100 hover:bg-base-300 active:bg-base-200 rounded-md flex items-center gap-2 transition-colors"
                        >
                            <Settings className="w-4 h-4 text-primary" />
                            <span className="hidden sm:inline text-sm">Settings</span>
                        </Link>

                        {authUser && (
                            <>
                                <Link 
                                    to={"/profile"} 
                                    className="px-3 py-2 bg-base-100 hover:bg-base-300 active:bg-base-200 rounded-md flex items-center gap-2 transition-colors"
                                >
                                    <User className="w-4 h-4 text-primary" />
                                    <span className="hidden sm:inline text-sm">Profile</span>
                                </Link>

                                <button 
                                    onClick={logout}
                                    className="px-3 py-2 bg-base-100 hover:bg-base-300 active:bg-base-200 rounded-md flex items-center gap-2 transition-colors"
                                >
                                    <LogOut className="w-4 h-4 text-primary" />
                                    <span className="hidden sm:inline text-sm">Logout</span>
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