import SignInForm from '../features/auth/components/SignInForm.tsx';
import Footer from '../features/auth/components/Footer.tsx';

/** serves as composition layer and arranging components to create the final view for the sign in */
export default function SignInPage() {
  return (
    <>
      <SignInForm />
      <Footer />
    </>
  );
}
