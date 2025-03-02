import {useLoginForm} from "../hooks/useLoginForm.ts";
import {useAuth} from "../hooks/useAuth.ts";

const LoginForm = () => {
    const { user, setUser, password, setPassword, rememberMe, setRememberMe } = useLoginForm();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(user, password);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-700">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Clock:In</h2>
                 <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Benutzer</label>
            <input
              type="text"
              onChange={(e) => setUser(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <label className="text-gray-700">Angemeldet bleiben</label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            Einloggen
          </button>
        </form>
            </div>
        </div>
    )
}

export default LoginForm