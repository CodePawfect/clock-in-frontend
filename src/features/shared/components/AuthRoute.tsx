import {useSelector} from "react-redux";
import {RootState} from "../../../store/store"; // Adjust path as needed
import {Navigate, Outlet} from "react-router-dom";

const AuthRoute = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) {
        return <Navigate to="/login"/>;
    }

    return <Outlet/>;
};

export default AuthRoute