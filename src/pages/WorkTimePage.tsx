import HeaderSection from '../features/worktimes/components/header/HeaderSection.tsx';
import Navbar from '../commons/components/Navbar.tsx';

/** serves as composition layer and arranging components to create the final view for work times */
export default function WorkTimePage() {
  return (
    <>
      <HeaderSection />
      <Navbar />
    </>
  );
}
