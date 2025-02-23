import { useState } from "react";

export const useLoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    return {
        email,
        setEmail,
        password,
        setPassword,
        rememberMe,
        setRememberMe,
    };
};
