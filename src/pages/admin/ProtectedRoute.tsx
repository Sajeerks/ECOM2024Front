import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";


interface ProtectedRouterProps{
    isAuthenticated :boolean;
    children?:ReactElement;
    adminRoute?:boolean;
    isAdmin?:boolean;
    redirect?:string;

}





const ProtectedRoute = ({

    isAuthenticated,
children,
adminRoute,
isAdmin,
redirect ="/",
 }:ProtectedRouterProps) => {

    if(!isAuthenticated){
        return <Navigate to={redirect } />
    }
    if(adminRoute && !isAdmin){
        // console.log({isAdmin});
        return <Navigate to={redirect } />
    }
    // console.log("children in protected route" ,children);
    // console.log("Outlet in protected route" ,Outlet);

  return   children ? children : <Outlet/> 

}

export default ProtectedRoute