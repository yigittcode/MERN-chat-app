import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
    return (
        <div className="h-full flex items-center justify-center p-8 bg-base-200">
            <div className="max-w-md text-center space-y-6">
                {/* Icon Display */}
                <div className="flex justify-center gap-4 mb-4">
                    <div className="relative animate-bounce">
                        <div className="w-16 h-16 border-2 border-t-base-100 border-l-base-100 
                            border-r-base-300 border-b-base-300 bg-base-200 
                            flex items-center justify-center hover:bg-base-300 
                            transition-all hover:scale-105">
                            <MessageSquare className="w-8 h-8 text-primary animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Welcome Text */}
                <div className="border-2 border-t-base-300 border-l-base-300 
                    border-r-base-100 border-b-base-100 bg-base-200 p-4 
                    hover:bg-base-300 transition-colors">
                    <h2 className="text-2xl font-bold font-['MS Sans Serif'] text-primary">
                        Welcome to RetroChat 98!
                    </h2>
                    <p className="text-base-content font-['MS Sans Serif'] mt-2">
                        Select a conversation from the sidebar to start chatting
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NoChatSelected;