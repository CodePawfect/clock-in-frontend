import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {User} from "../types/User.ts";
import {toast} from "react-toastify";

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const checkSession = createAsyncThunk("auth/checkSession", async () => {
    const response = await fetch(`${API_BASE_URL}/session`, {
        credentials: "include",
    });
    if (!response.ok) throw new Error("Not authenticated");
    return (await response.json()) as User;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.user = action.payload;
            state.loading = false;
        },
        loginFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload);
        },
        logout(state) {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkSession.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(checkSession.rejected, (state) => {
                state.user = null;
            });
    },
});

export const {loginStart, loginSuccess, loginFailure, logout} = authSlice.actions;
export default authSlice.reducer;
