import { useAuth } from './AuthProvider.tsx';
import { FormEvent } from 'react';
import './SignInForm.css';

export default function SignInForm() {
  const { handleLogin } = useAuth();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (username && password) {
      handleLogin({ username, password });
    } else {
      console.error('Username or password field is missing or empty');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div id="form-content-container">
        <div className="form-input-label-container">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-input-label-container">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
}
