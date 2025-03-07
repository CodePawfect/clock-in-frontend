import {User} from "../types/User";
import {apiClient} from "../../shared/ApiClient";

export class AuthApiClient {
    async login(username: string, password: string): Promise<User> {
        interface LoginCredentials {
            username: string;
            password: string;
        }

        return apiClient.post<User, LoginCredentials>('/api/auth/login', {username, password});
    }

    async logout(): Promise<void> {
        return apiClient.post<void>('/api/auth/logout');
    }

    async register(username: string, password: string, email: string): Promise<User> {
        interface RegisterCredentials {
            username: string;
            password: string;
            email: string;
        }

        return apiClient.post<User, RegisterCredentials>('/api/auth/register', {username, password, email});
    }

    async getCurrentUser(): Promise<User> {
        return apiClient.get<User>('/api/auth/me');
    }

    async refreshToken(): Promise<void> {
        return apiClient.post<void>('/api/auth/refresh');
    }
}

// Create a singleton instance
export const authApiClient = new AuthApiClient();