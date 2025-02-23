import {loginService} from "../services/authService";
import {User} from "../types/User"
import {useDispatch, useSelector} from "react-redux";
import {loginFailure, loginStart, loginSuccess} from "../authSlice.ts";
import {RootState} from "../../../store/store.ts";

export const useAuth = () => {
    const dispatch = useDispatch();
    const {user, loading, error} = useSelector((state: RootState) => state.auth);

    const login = async (email: string, password: string, rememberMe: boolean) => {
        dispatch(loginStart());
        try {
            const userData: User = await loginService(email, password);
            dispatch(loginSuccess(userData));

            if (rememberMe) {
                localStorage.setItem("user", JSON.stringify(userData));
            } else {
                sessionStorage.setItem("user", JSON.stringify(userData));
            }
        } catch (err) {
            console.error("Login error:", err);
            dispatch(loginFailure("Login fehlgeschlagen."));
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
    };

    return {user, login, logout, loading, error};
};
