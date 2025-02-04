import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; 
import { fetchUser, getCookie } from "../functions/useApi.tsx";
import { useNavigate } from "react-router-dom"; 
import profilePic from "../assets/profile_avatar.jpg";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(getCookie("token") ? "true" : "")
  const [username, setUsername] = useState("");
  const [userALevel, setUserALevel] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    setLoggedIn(getCookie("token") ? "true" : "");
    async function getUser() {
      const user = await fetchUser(getCookie("user"));
      setUsername(user.name);
      setUserALevel(user.admin);
    }
    if (getCookie("user") && getCookie("token")) {
      getUser();
    }
    if (!loggedIn) {
      setUsername("");
      setUserALevel(0);
    }
  }, [navigate, username, loggedIn]);
  
  return (
    <nav className="navbar">
      <Link to={`/profile/${username}`} id="to-profile">
          <img id="profile-pic" src={profilePic} alt="default_profile_picture" />
      </Link>
      <Link to={`/profile/${username}`} id="username-link"> {username ? username : "Guest"} </Link>
      <Link to="/"> <h1> Platforma BAC Romana </h1> </Link>
      <div className="links">
        <Link to="/"> Home </Link>
        <Link to="/leaderboard"> Leaderboard </Link>
        {(userALevel >= 1) && <Link to="/create"> Create </Link>}
        {loggedIn && <Link to="/logout"> Log out </Link>}
        {!loggedIn && <Link to="/login"> Log in </Link>}
      </div>
    </nav>    
  );
}

export default Navbar;
