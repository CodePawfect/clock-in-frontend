import './App.css'
import LoginForm from "./features/authentication/components/LoginForm.tsx";
import {Routes, Route, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "./store/store.ts";
import {ToastContainer} from "react-toastify";
import Sidebar from "./features/shared/components/Sidebar.tsx";
import Dashboard from "./features/dashboard/components/Dashboard.tsx";
import Stundentafel from "./features/stundentafel/components/Stundentafel.tsx";
import Planer from "./features/planer/components/Planer.tsx";
import Antraege from "./features/antraege/components/Antraege.tsx";

// Layout component that includes the Sidebar
const DashboardLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <Sidebar/>
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
};

// Protected route component
const ProtectedRoute = ({children}: { children: React.ReactNode }) => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) {
        return <Navigate to="/login"/>;
    }

    return <DashboardLayout>{children}</DashboardLayout>;
};

function App() {
    const user = useSelector((state: RootState) => state.auth.user);

    const getHomeRedirect = () => {
        if (user) {
            return user.role === "admin" ? "/admin" : "/dashboard";
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
                        user && user.role === "admin" ? <h1>Admin Page</h1> : <Navigate to="/login"/>
                    }
                />

                {/* Protected routes with Sidebar */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard/>
                    </ProtectedRoute>
                }/>

                <Route path="/stundentafel" element={
                    <ProtectedRoute>
                        <Stundentafel/>
                    </ProtectedRoute>
                }/>

                <Route path="/planer" element={
                    <ProtectedRoute>
                        <Planer/>
                    </ProtectedRoute>
                }/>

                <Route path="/antraege" element={
                    <ProtectedRoute>
                        <Antraege/>
                    </ProtectedRoute>
                }/>

                {/* Redirects */}
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
