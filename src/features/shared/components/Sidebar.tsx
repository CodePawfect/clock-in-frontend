import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, CalendarIcon, UserIcon, UsersIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

type NavItemProps = {
    icon: React.ReactNode;
    label: string;
    to: string;
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, to }) => (
    <li className="flex items-center px-4 py-2 rounded-lg">
        <Link to={to} className="flex items-center text-gray-300 hover:bg-indigo-800 hover:text-white w-full">
            <div className="mr-3">{icon}</div>
            <span>{label}</span>
        </Link>
    </li>
);

const Sidebar: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    // If no user is logged in, don't render the sidebar
    if (!user) {
        return null;
    }

    const icons = {
        home: <HomeIcon className="w-5 h-5" />,
        calendar: <CalendarIcon className="w-5 h-5" />,
        user: <UserIcon className="w-5 h-5" />,
        absence: <UsersIcon className="w-5 h-5" />,
    };

    return (
        <div className="flex flex-col w-56 bg-indigo-900 text-white h-screen">
            {/* Logo area */}
            <div className="flex items-center px-4 py-6">
                <span className="text-xl font-bold">clock:in</span>
            </div>
            {/* Navigation menu */}
            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-1 px-2">
                    <NavItem icon={icons.home} label="Dashboard" to="/dashboard" />
                    <NavItem icon={icons.calendar} label="Stundentafel" to="/stundentafel" />
                </ul>
                <div className="px-4 py-2 mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase">
                    ABWESENHEITEN
                </div>
                <ul className="space-y-1 px-2">
                    <NavItem icon={icons.absence} label="Planer" to="/planer" />
                    <NavItem icon={icons.user} label="Meine Anträge" to="/antraege" />
                </ul>
            </nav>
            {/* Footer */}
            <div className="p-4 bg-indigo-950 text-xs">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-2 flex items-center justify-center">
                        {user.name ? user.name.charAt(0) : 'U'}
                    </div>
                    <div>
                        <div>{user.name || 'User'}</div>
                        <div className="text-gray-400">'C&S GmbH'</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;