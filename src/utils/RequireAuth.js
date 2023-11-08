import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "services/userService";

function RequireAuth({children, isAdmin = false}) {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    if(!token) {
        navigate("/login");
    }
    useEffect(() => {
        const checkRole = async () => {
            const roleid = (await userService.checkAuthentication(token)).result.roleid;
            if(roleid != 3) navigate("/error") // 3 is admin roleid
        }
        if(isAdmin) {
            checkRole();
        }
    }, [])
    
    return children;
}

export default RequireAuth;