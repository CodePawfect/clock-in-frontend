import HeaderSection from '../features/worktimes/components/header/HeaderSection.tsx';
import Navbar from '../commons/components/Navbar.tsx';
import WorkTimeCards from '../features/worktimes/components/WorkTimeCards.tsx';
import { CalenderWeekProvider } from '../features/worktimes/components/context/CalenderWeekContextType.tsx';

/** serves as composition layer and arranging components to create the final view for work times */
export default function WorkTimePage() {
  return (
    <>
      <CalenderWeekProvider>
        <HeaderSection />
        <WorkTimeCards />
        <Navbar />
      </CalenderWeekProvider>
    </>
  );
}
