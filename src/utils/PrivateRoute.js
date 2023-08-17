import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";




const PrivateRoutes = () => {
    // console.log('heyt', AuthContext);
    let {user} = useContext(AuthContext)
    console.log(user, 'user');

    return user ?  <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes