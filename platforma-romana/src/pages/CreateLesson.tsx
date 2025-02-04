import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllLessons, fetchUser, getCookie } from "../functions/useApi";
import { Lesson } from "../props/Props";

const CreateLesson = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("Subiect 1");

  const [question, setQuestion] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [toLesson, setToLesson] = useState("");
  const [allLessons, setAllLessons] = useState<Lesson[]>();
  
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

   async function fetchLessons() {
     const lessons = await fetchAllLessons();
     setAllLessons(lessons);
   }
   fetchLessons(); 
  }, [navigate])
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const lesson = {title, content, subject};

    fetch("http://127.0.0.1:8000/private/newLesson", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify(lesson)
    }).then(() => {
      navigate(0);
    });
  }

  const handleSubmitQuestion = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const questionToAdd = {lesson_id: toLesson,
                           question: question,
                           answer1: answer1,
                           answer2: answer2,
                           answer3: answer3,
                           answer4: answer4,
                           correct: correctAnswer,
                          };

    fetch("http://127.0.0.1:8000/private/newQuickQuestion", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify(questionToAdd)
    }).then(() => {
      navigate(0);
    });
  }
  
  return (
    <div className="create-test">
      <div className="create-test-form">
      <h2> Adaugă o nouă lecție </h2>
      <form onSubmit={handleSubmit}>
        <label> Titlul lecției: </label>
        <input
          type="text"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <label> Conținutul lecției: </label>
        <textarea
          required
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <label> Autorul lecției: </label>
        <select
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        >
          <option value="Subiect 1"> Subiect 1 </option>
          <option value="Subiect 2"> Subiect 2 </option>
          <option value="Subiect 3"> Subiect 3 </option>
        </select>  
        <button> Adaugă lecția </button>
      </form>
    </div> 
      <div className="create-question-form">
        <h2> Adaugă o nouă întrebare </h2>
        <form onSubmit={handleSubmitQuestion}>
          <label> Întrebarea: </label>
          <input
            type="text"
            required
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />
          <label> Răspunsul 1: </label>
          <input
            type="text"
            required
            value={answer1}
            onChange={(event) => setAnswer1(event.target.value)}
          />
          <label> Răspunsul 2: </label>
          <input
            type="text"
            required
            value={answer2}
            onChange={(event) => setAnswer2(event.target.value)}
          />
          <label> Răspunsul 3: </label>
          <input
            type="text"
            required
            value={answer3}
            onChange={(event) => setAnswer3(event.target.value)}
          />
          <label> Răspunsul 4: </label>
          <input
            type="text"
            required
            value={answer4}
            onChange={(event) => setAnswer4(event.target.value)}
          />
          <label> Răspunsul corect: </label>
          <input
            type="text"
            required
            value={correctAnswer}
            onChange={(event) => setCorrectAnswer(event.target.value)}
          />
          <label> Selectează lecția: </label>
          <select
            value={toLesson}
            onChange={(event) => setToLesson(event.target.value)}
          > 
            <option value="">  </option>
            {
              allLessons?.map((lesson, index) => (
                <option key={index} value={lesson.Id}> {lesson.Id} </option>
              ))
            }
          </select>  
          <button> Adaugă întrebarea </button>
        </form>

      </div>
  </div>
  );
}

export default CreateLesson;
