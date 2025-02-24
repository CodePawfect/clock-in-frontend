import './App.css'
import LoginForm from "./features/authentication/components/LoginForm.tsx";
import {Routes, Route, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "./store/store.ts";
import {ToastContainer} from "react-toastify";

function App() {
    const user = useSelector((state: RootState) => state.auth.user);

    const getHomeRedirect = () => {
        if (user) {
            return user.role === "admin" ? "/admin" : "/";
        }
        return "/login";
    };

    return (
        <>
            <Routes>
                <Route path="/login" element={user ? <Navigate to={getHomeRedirect()}/> : <LoginForm/>}/>
                <Route path="/" element={user ? <h1>Home Page</h1> : <Navigate to="/login"/>}/>
                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to={user ? "/" : "/login"}/>}/>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default App
