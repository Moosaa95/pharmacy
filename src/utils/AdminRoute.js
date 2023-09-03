import { Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";




const AdminRoutes = () => {
    // console.log('heyt', AuthContext);
    const [userType, setUserType] = useState('pharmacy')
    // let {user} = useContext(AuthContext)
    
    // useEffect(() => {
    //     if (user && user.usertype == 'pharmacy'){
    //         setUserType(user.usertype)
    //     }
    // }, [user])

    return userType && userType === 'pharmacy' ?  <Outlet /> : <Navigate to="/login" />
}

export default AdminRoutes