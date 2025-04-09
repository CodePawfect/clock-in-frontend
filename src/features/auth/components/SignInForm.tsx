import { useAuth } from './AuthProvider.tsx';
import { FormEvent } from 'react';

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
      <h1>Sign In</h1>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
}
