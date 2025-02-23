import {User} from "../types/User"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginService = async (email: string, password: string):Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Error: ${error}`);
    }

    return await response.json();
};

