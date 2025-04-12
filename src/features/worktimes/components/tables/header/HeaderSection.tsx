import './HeaderSection.css';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Bars3Icon } from '@heroicons/react/24/solid';

export default function HeaderSection() {
  return (
    <div className="find-good-class-name">
      <Bars3Icon />
      <div className="header-section">
        <h1>2025</h1>
        <div className="header-container">
          <ChevronLeftIcon />
          <h1>KW: 15</h1>
          <ChevronRightIcon />
        </div>
      </div>
      <button className="add-button">Add</button>
    </div>
  );
}
