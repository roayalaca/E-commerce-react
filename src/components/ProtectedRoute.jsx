import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {

    const token = localStorage.getItem("token")
    //null => no hay token
    //"efjefnejf" => cadena de texto, que es el token

    if(token){
        return <Outlet />
    } else { 
        //token = null
        return <Navigate to='/login' />
    }                     
};                        

export default ProtectedRoutes;