import './Navbar.css';
import { NavLink } from 'react-router-dom';
import {
  ClockIcon,
  HomeIcon,
  NewspaperIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { to: '/', Icon: HomeIcon },
  { to: '/events', Icon: NewspaperIcon },
  { to: '/worktime', Icon: ClockIcon },
  { to: '/settings', Icon: Cog6ToothIcon },
];

export default function Navbar() {
  return (
    <div className="navbar">
      {navItems.map(({ to, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end
          className={({ isActive }) =>
            isActive ? 'navbar-icon navbar-icon--active' : 'navbar-icon'
          }
        >
          <Icon />
        </NavLink>
      ))}
    </div>
  );
}
