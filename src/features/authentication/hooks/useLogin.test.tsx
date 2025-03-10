import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {renderHook} from "@testing-library/react";
import {useLogin} from "./useLogin.ts";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../store/authSlice.ts";
import * as React from "react";
import {ReactElement} from "react";

// Create a wrapper with the Redux Provider
const createWrapper = () => {
    // Create a test store with auth reducer
    const store = configureStore({
        reducer: {
            auth: authReducer
        }
    });

    // Return a wrapper function that provides the store
    return function Wrapper({children}: { children: React.ReactNode }): ReactElement {
        return (
            <Provider store={store}>{children}</Provider>
        );
    };
};

//TODO: Verify that the hook dispatches the correct Redux actions
describe("useLogin", () => {
    const mockFetch = vi.fn();

    beforeEach(() => {
        global.fetch = mockFetch;
        // Mock environment variable
        vi.stubEnv("VITE_API_BASE_URL", "http://localhost:3000");
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllEnvs();
    });

    it("should login a user successfully", async () => {
        const mockUser = {
            username: "testuser",
            roles: ["user"]
        };

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockUser,
        });

        const {result} = renderHook(() => useLogin(), {
            wrapper: createWrapper()
        });

        await result.current.login("testuser", "password123");

        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(
            "http://localhost:3000/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: "testuser",
                    password: "password123"
                }),
                credentials: "include",
            }
        );
    });

    it("should handle login failure", async () => {
        const errorResponse = {
            ok: false,
            json: async () => ({
                error: "Invalid credentials"
            })
        };

        mockFetch.mockResolvedValueOnce(errorResponse);

        const {result} = renderHook(() => useLogin(), {
            wrapper: createWrapper()
        });

        await result.current.login("testuser", "wrongpassword");

        expect(mockFetch).toHaveBeenCalledTimes(1);
    });
});
