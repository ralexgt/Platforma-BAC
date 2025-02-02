import { useEffect } from "react";
import { deleteCookie } from "../functions/useApi.tsx";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    deleteCookie("token");
    deleteCookie("user");
    navigate("/");
  }, [])
    
  return (
    <div></div>
  );
}

export default Logout
