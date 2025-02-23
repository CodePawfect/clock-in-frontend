import './App.css'
import LoginForm from "./features/authentication/components/LoginForm.tsx";
import { Routes, Route, Navigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "./store/store.ts";

function App() {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <LoginForm />} />
            <Route path="/" element={user ? <h1>Home Page</h1> : <Navigate to="/login" />} />
            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Routes>
    );
}

export default App
