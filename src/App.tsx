import './App.css'
import LoginForm from "./features/authentication/components/LoginForm.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "./store/store.ts";
import {ToastContainer} from "react-toastify";
import Dashboard from "./features/dashboard/components/Dashboard.tsx";
import Stundentafel from "./features/stundentafel/components/Stundentafel.tsx";
import Planer from "./features/planer/components/Planer.tsx";
import Antraege from "./features/antraege/components/Antraege.tsx";
import AuthRoute from "./features/shared/components/AuthRoute.tsx";
import SidebarLayout from "./features/shared/components/SidebarLayout.tsx";

function App() {
    const user = useSelector((state: RootState) => state.auth.user);

    const getHomeRedirect = () => {
        if (user) {
            return user.roles.includes("admin") ? "/admin" : "/dashboard";
        }
        return "/login";
    };

    return (
        <>
            <Routes>
                {/* Login route */}
                <Route path="/login" element={user ? <Navigate to={getHomeRedirect()}/> : <LoginForm/>}/>

                {/* Admin route */}
                <Route
                    path="/admin"
                    element={
                        user && user.roles.includes("admin") ? <h1>Admin Page</h1> : <Navigate to="/login"/>
                    }
                />

                {/* Protected routes with Sidebar */}
                <Route element={<AuthRoute/>}>
                    <Route element={<SidebarLayout/>}>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/stundentafel" element={<Stundentafel/>}/>
                        <Route path="/planer" element={<Planer/>}/>
                        <Route path="/antraege" element={<Antraege/>}/>
                    </Route>
                </Route>

                {/* Redirect other paths */}
                <Route path="/" element={<Navigate to={getHomeRedirect()}/>}/>
                <Route path="*" element={<Navigate to={getHomeRedirect()}/>}/>
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
