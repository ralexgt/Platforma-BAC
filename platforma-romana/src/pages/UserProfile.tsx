import { useEffect, useState } from "react";
import { fetchUser, getCookie } from "../functions/useApi";
import profilePic from "../assets/profile_avatar.jpg";
import badgeMoney from "../assets/money.png";
import badgeWizard from "../assets/wand.png";
import badgeModerator from "../assets/shield.png";
import badgeNewUser from "../assets/book.png";
import { useNavigate } from "react-router-dom";



const UserProfile = () => {
  const [loggedIn, setLoggedIn] = useState(getCookie("token") ? "true" : "")
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userALevel, setUserALevel] = useState(0);
  const [userGold, setUserGold] = useState<number>(0);
  const [userExperience, setUserExperience] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(getCookie("token") ? "true" : "");
    async function getUser() {
      const user = await fetchUser(getCookie("user"));
      setUsername(user.name);
      setUserEmail(user.email);
      setUserALevel(user.admin);
      setUserGold(user.gold);
      setUserExperience(user.experience);
    }
    if (getCookie("user") && getCookie("token")) {
      getUser();
    }
    if (!loggedIn) {
      setUsername("");
    }
  }, [navigate, username, loggedIn]);
  

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={profilePic} alt="Profile" className="profile-picture" />
        <h2 className="username">{username}</h2>
        <p className="email">{userEmail}</p>
        <div className="stats">
          <p><strong>Level:</strong> {Math.floor(userExperience/1000) + 1}</p>
          <p><strong>Experience:</strong> {userExperience-1000*Math.floor(userExperience / 1000)}/1000 </p>
          <p><strong>Gold:</strong> {userGold}</p>
        </div>
      </div>

      <div className="achievements-section">
        <h3>Achievements</h3>
        <div className="badge-container">
          {<img src={badgeNewUser} alt="Badge new user" /> }
          <span className="badge-description">Nou venit</span>
        </div>
        <div className="badge-container">
          {userALevel > 0 && <img src={badgeModerator} alt="Badge moderator" /> }
          <span className="badge-description">Moderator</span>
        </div>
        <div className="badge-container">
          {userGold >= 100 && <img src={badgeMoney} alt="Badge gold > 100" /> }
          <span className="badge-description">Spiriduș</span>
        </div>
        <div className="badge-container">
          {userExperience >= 5200 && <img src={badgeWizard} alt="Badge experience > 5200" /> }
          <span className="badge-description">Vrăjitor cultivat</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
