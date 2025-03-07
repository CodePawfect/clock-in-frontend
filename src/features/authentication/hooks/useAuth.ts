import {toast} from "react-toastify";
import {User} from "../types/User"
import {useDispatch, useSelector} from "react-redux";
import {loginFailure, loginStart, loginSuccess, logout as logoutAction} from "../store/authSlice.ts";
import {RootState} from "../../../store/store.ts";
import {authApiClient} from "../api/AuthApiClient.ts";

export const useAuth = () => {
    const dispatch = useDispatch();
    const {user, loading, error} = useSelector((state: RootState) => state.auth);

    const login = async (email: string, password: string) => {
        dispatch(loginStart());
        try {
            const userData: User = await authApiClient.login(email, password);
            dispatch(loginSuccess(userData));
        } catch (err) {
            console.error("Login error:", err);
            dispatch(loginFailure("Login fehlgeschlagen"));
            toast.error("Login failed. Please try again.");
        }
    };

    const logout = async () => {
        await authApiClient.logout();
        dispatch(logoutAction());
        toast.success("Logged out successfully");
    };


    return {user, login, logout, loading, error};
};
