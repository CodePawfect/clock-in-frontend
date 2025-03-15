import {Link} from 'react-router-dom';
import {Bars3Icon, CalendarIcon, HomeIcon, UserIcon, UsersIcon, XMarkIcon} from '@heroicons/react/24/solid';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import useSidebarState from "../hooks/useSidebarState.ts";
import {ReactNode} from "react";

type NavItemProps = {
    icon: ReactNode;
    label: string;
    navigateTo: string;
    onClick?: () => void;
};

const NavItem = ({icon, label, navigateTo, onClick}: NavItemProps) => (
    <li className="flex items-center px-4 py-2 rounded-lg">
        <Link
            to={navigateTo}
            className="flex items-center text-gray-300 hover:bg-indigo-800 hover:text-white w-full"
            onClick={onClick}>
            <div className="mr-3">{icon}</div>
            <span>{label}</span>
        </Link>
    </li>
);

const Sidebar = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const {isMobile, isOpen, toggleSidebar, closeSidebarOnMobile} = useSidebarState();

    // If no user is logged in, don't render the sidebar
    if (!user) {
        return null;
    }

    const icons = {
        home: <HomeIcon className="w-5 h-5"/>,
        calendar: <CalendarIcon className="w-5 h-5"/>,
        user: <UserIcon className="w-5 h-5"/>,
        absence: <UsersIcon className="w-5 h-5"/>,
        menu: <Bars3Icon className="w-6 h-6"/>,
        close: <XMarkIcon className="w-6 h-6"/>
    };

    return (
        <>
            {/* Mobile menu button */}
            {isMobile && (
                <button
                    onClick={toggleSidebar}
                    className="fixed top-1 right-3 z-50 p-2 bg-indigo-900 rounded-md text-white"
                    aria-label="Toggle menu"
                >
                    {isOpen ? icons.close : icons.menu}
                </button>
            )}

            {/* Sidebar */}
            <div
                className={`${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } fixed top-0 bottom-0 left-0 z-40 transition-transform duration-300 ease-in-out flex flex-col 
                ${isMobile ? 'w-full' : 'w-64'} bg-indigo-900 text-white h-screen`}
            >
                {/* Logo area */}
                <div className="flex items-center px-6 py-2.5 mb-10">
                    <span className="text-3xl font-bold">clock:in</span>
                </div>
                {/* Navigation menu */}
                <nav className="flex-1 overflow-y-auto">
                    <div className="px-4 py-3 mt-5 text-s font-semibold text-gray-400 uppercase">
                        ARBEITSZEITEN
                    </div>
                    <ul className="space-y-1 px-2">
                        <NavItem
                            icon={icons.home}
                            label="Dashboard"
                            navigateTo="/dashboard"
                            onClick={closeSidebarOnMobile}
                        />
                        <NavItem
                            icon={icons.calendar}
                            label="Arbeitszeit erfassen"
                            navigateTo="/times"
                            onClick={closeSidebarOnMobile}
                        />
                    </ul>
                    <div className="px-4 py-3 mt-5 text-s font-semibold text-gray-400 uppercase">
                        EVENT PLANUNG
                    </div>
                    <ul className="space-y-1 px-2">
                        <NavItem
                            icon={icons.absence}
                            label="Einteilung"
                            navigateTo="/plan"
                            onClick={closeSidebarOnMobile}
                        />
                    </ul>
                </nav>
                {/* Footer */}
                <div className="p-4 bg-indigo-950 text-xs">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-300 rounded-full mr-2 flex items-center justify-center">
                            {user.username ? user.username.charAt(0) : 'U'}
                        </div>
                        <div>
                            <div>{user.username || 'User'}</div>
                            <div className="text-gray-400">C&S GmbH</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;