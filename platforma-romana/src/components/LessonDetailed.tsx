import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchLessonDetails, fetchQuickQuestions, fetchUser, getCookie } from "../functions/useApi.tsx";
import QuizBox from "./QuizBox.tsx";
import { QuickQuestion } from "../props/Props.tsx";


const LessonDetailed = () => {
  const { id } = useParams();
  
  const [loggedIn, setLoggedIn] = useState(getCookie("token") ? "true" : "")
  const [userALevel, setUserALevel] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonSubject, setLessonSubject] = useState("");
  const [lessonParagraphs, setLessonParagraphs] = useState([""]);
  const [quizQuestions, setQuizQuestions] = useState<QuickQuestion[]>([])
  
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
        setLessonParagraphs(response.content.split("\n\n"));        
        setLessonSubject(response.subject);
      }
    }
    
    getLesson(id);
    
    async function getUser() {
      const user = await fetchUser(getCookie("user"));
      setUserALevel(user.admin);
      setUserEmail(user.email);
    }

    if (getCookie("user") && getCookie("token")) {
      getUser();
    }
    if (!loggedIn) {
      setUserALevel(0);
    }

    async function getLessonQuiz() {
      if (id) {
        const questions = await fetchQuickQuestions(id);
        setQuizQuestions(questions);
      }
    };
    getLessonQuiz();
  }, [navigate]);
 
  return (
    <div className="lesson-details" >
      <article>
        <h2> {lessonTitle} </h2>
        <p> {lessonSubject} </p>
        <div className="lesson-content">
          {
            lessonParagraphs.map((paragraph: string) => (
              <p key={Math.floor(Math.random() * 3000) + 100}> {paragraph} </p>
            ))
          }
        </div>
        { userALevel > 0 && <button className="delete-button" onClick={handleDelete}> Șterge lecția </button> }
      </article>
      {quizQuestions && <QuizBox quizQuestions={quizQuestions} user={userEmail}/> }
    </div>
  );
}

export default LessonDetailed
