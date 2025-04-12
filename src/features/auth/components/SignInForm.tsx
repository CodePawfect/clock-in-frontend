import { useAuth } from './AuthProvider.tsx';
import { FormEvent } from 'react';
import './SignInForm.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function SignInForm() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (username && password) {
      handleLogin({ username, password }).then(() => navigate('/'));
    } else {
      toast.error('Please fill in all fields');
    }
  }

  return (
    <div className="form-container">
      <h1>Clock:In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
