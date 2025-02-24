import { toast } from "react-toastify";
import {loginService} from "../services/LoginService.ts";
import {User} from "../types/User"
import {useDispatch, useSelector} from "react-redux";
import {loginFailure, loginStart, loginSuccess, logout as logoutAction} from "../store/authSlice.ts";
import {RootState} from "../../../store/store.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAuth = () => {
    const dispatch = useDispatch();
    const {user, loading, error} = useSelector((state: RootState) => state.auth);

    const login = async (email: string, password: string) => {
        dispatch(loginStart());
        try {
            const userData: User = await loginService(email, password);
            dispatch(loginSuccess(userData));
            toast.success("Login erfolgreich");
        } catch (err) {
            console.error("Login error:", err);
            dispatch(loginFailure("Login fehlgeschlagen"));
            toast.error("Login failed. Please try again.");
        }
    };

    const logout = async () => {
        await fetch(`${API_BASE_URL}/logout`, {
            method: "POST",
            credentials: "include",
        });
        dispatch(logoutAction());
        toast.success("Logged out successfully");
    };


    return {user, login, logout, loading, error};
};
