class ApiClient {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    }

    async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return this.handleResponse<T>(response);
    }

    async post<T, D = Record<string, unknown>>(endpoint: string, data?: D): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data as Record<string, unknown>) : undefined,
        });
        return this.handleResponse<T>(response);
    }

    async put<T, D = Record<string, unknown>>(endpoint: string, data?: D): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data as Record<string, unknown>) : undefined,
        });
        return this.handleResponse<T>(response);
    }

    async delete<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return this.handleResponse<T>(response);
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Error: ${response.status}`);
        }

        if (response.status === 204) {
            return {} as T;
        }

        return await response.json();
    }
}

export const apiClient = new ApiClient();
export default ApiClient;
