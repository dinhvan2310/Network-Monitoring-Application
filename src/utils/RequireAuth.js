import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "services/userService";

function RequireAuth({children, isAdmin = false}) {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!token) {
            children = null;
            return navigate("/login");
        }
        const checkRole = async () => {
            const roleid = (await userService.checkAuthentication(token)).result.roleid;
            if(roleid != 3)  return navigate("/error") // 3 is admin roleid
        }
        if(isAdmin) {
            checkRole();
        }
    }, [])

    console.log(token);
    
    
    return children;
}

export default RequireAuth;