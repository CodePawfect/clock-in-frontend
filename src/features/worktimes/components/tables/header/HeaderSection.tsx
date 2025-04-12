import './HeaderSection.css';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

export default function HeaderSection() {
  return (
    <div className="header-section">
      <div className="header-container">
        <ChevronLeftIcon />
        <h1>YEAR</h1>
        <ChevronRightIcon />
      </div>
    </div>
  );
}
