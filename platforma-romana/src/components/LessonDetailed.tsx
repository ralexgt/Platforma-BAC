import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchLessonDetails, fetchUser, getCookie } from "../functions/useApi.tsx";


const LessonDetailed = () => {
  const [loggedIn, setLoggedIn] = useState(getCookie("token") ? "true" : "")
  const [userALevel, setUserALevel] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [lessonSubject, setLessonSubject] = useState("");
  const [lessonParagraphs, setLessonParagraphs] = useState([""]);
  
  // TODO EDIT for new server
  const handleDelete = () => {
    fetch(`http://127.0.0.1:8000/public/delete/${id}`, {
      "method": "DELETE"
    });
    navigate("/");
  }

  useEffect(() => {
    setLoggedIn(getCookie("token") ? "true" : "");
    if (!getCookie("token")) {
      navigate("/not-allowed");
    }
    const getLesson = async (id: string = "") => {
      if (id) {
        const response = await fetchLessonDetails(id)
        setLessonTitle(response.title);
        setLessonContent(response.content);
        // console.log(lessonContent);
        setLessonParagraphs(response.content.split("\n\n"));        
        setLessonSubject(response.subject);
      }
    }
    
    getLesson(id);
    
    async function getUser() {
      const user = await fetchUser(getCookie("user"), getCookie("token"));
      setUserALevel(user.admin);
    }

    if (getCookie("user") && getCookie("token")) {
      getUser();
    }
    if (!loggedIn) {
      setUserALevel(0);
    }
  }, [navigate]);
 
  return (
    <div className="lesson-details" >
      <article>
        <h2> {lessonTitle} </h2>
        <p> {lessonSubject} </p>
        <div className="lesson-content">
          {
            lessonParagraphs.map((paragraph: string) => (
              <p key={Math.floor(Math.random() * 150)}> {paragraph} </p>
            ))
          }
        </div>
        { userALevel > 0 && <button onClick={handleDelete}> Șterge lecția </button> }
      </article>
      
    </div>
  )
}

export default LessonDetailed
