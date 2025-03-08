import {useState} from "react";

export const useLoginForm = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    return {
        user: user,
        setUser: setUser,
        password,
        setPassword,
    };
};
