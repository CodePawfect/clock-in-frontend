import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar.tsx";
import useIsMobile from "../hooks/useIsMobile.ts";

const SidebarLayout = () => {
    const isMobile = useIsMobile() ;

    return (
        <div className="flex h-screen">
            {/* This div is only a placeholder that takes up space when sidebar is not mobile */}
            {!isMobile && <div className="w-64 flex-none" />}

            {/* Sidebar is rendered separately */}
            <Sidebar />

            {/* Main content with appropriate margin based on viewport */}
            <div className="flex-1 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default SidebarLayout;