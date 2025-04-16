import './Navbar.css';
import { ClockIcon } from '@heroicons/react/24/outline';
import { HomeIcon } from '@heroicons/react/24/outline';
import { NewspaperIcon } from '@heroicons/react/24/outline';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <div className="navbar">
      <NewspaperIcon className="navbar-icon" />
      <HomeIcon className="navbar-icon" />
      <ClockIcon className="navbar-icon" />
      <Cog6ToothIcon className="navbar-icon" />
    </div>
  );
}
