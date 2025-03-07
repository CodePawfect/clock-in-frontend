import {useState} from "react";

export const useLoginForm = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    return {
        user: user,
        setUser: setUser,
        password,
        setPassword,
        rememberMe,
        setRememberMe,
    };
};
