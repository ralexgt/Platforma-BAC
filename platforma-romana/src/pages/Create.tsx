import { Link } from "react-router-dom"; 
import { fetchUser, getCookie } from "../functions/useApi"; 
import { useNavigate } from "react-router-dom"; 
import { useEffect } from "react";

const Create = () => {
  const navigate = useNavigate();
  useEffect(() => {
    async function getUser() {
      const user = await fetchUser(getCookie("user"));
      if (user.admin == 0) {
        navigate("/not-allowed");
      }
    }
    if (getCookie("token")) {
      getUser();
    } else {
      navigate("/not-allowed");
    }
  })
  return (
    <div className="create-container">
      <h2> Ce urmează să creezi? </h2>
      <div className="link-container">
        <Link to="/createLesson" className="to-create-link">
          Lecție nouă
        </Link>
        <Link to="/createTest" className="to-create-link">
          Test nou
        </Link>
      </div>
    </div>
  )
}

export default Create;
