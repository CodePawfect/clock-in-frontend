import { useState } from "react";
import { loginService } from "../services/authService";
import {User} from "../types/User"

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string, rememberMe: boolean) => {
        setLoading(true);
        try {
            const userData: User = await loginService(email, password);
            setUser(userData);
            if (rememberMe) {
                localStorage.setItem("user", JSON.stringify(userData));
            }
        } catch (err) {
            console.log(err)
            setError("Login fehlgeschlagen. Bitte überprüfen Sie Ihre Daten.");
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return { user, login, logout, loading, error };
};
