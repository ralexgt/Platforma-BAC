import { useEffect } from "react";
import { deleteAllCookies} from "../functions/useApi.tsx";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    deleteAllCookies();
    navigate("/");
  }, [])
    
  return (
    <div></div>
  );
}

export default Logout
