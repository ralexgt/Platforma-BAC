
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteCookie, fetchTest, fetchTestQuestions, fetchUser, getCookie, setCookie } from "../functions/useApi.tsx";
import { Question } from "../props/Props.tsx";


const TestDetailed = () => {
  const { id } = useParams();
  
  const [loggedIn, setLoggedIn] = useState(getCookie("token") ? "true" : "")
  const [userALevel, setUserALevel] = useState(0);
  const navigate = useNavigate();

  const [testTitle, setTestTitle] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>();
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const [corrects, setCorrects] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  
  const handleDelete = () => {
    fetch(`http://127.0.0.1:8000/public/delete/test/${id}`, {
      "method": "DELETE"
    });
    navigate("/");
  }

  const startTest = () => {
    setCookie(`started-${id}`, "0");
    navigate(0);
  }

  const handleNext = () => {
    if (questions && getCookie(`started-${id}`)) {
      if (questions[Number(getCookie(`started-${id}`))].Correct === selectedAnswer) {
        setCorrects(corrects + 1);       
      } else {
        setMistakes(mistakes + 1);
      }
    }
    const nextQuestionNumber = Number(getCookie(`started-${id}`)) + 1;
    setCookie(`started-${id}`, String(nextQuestionNumber))
  }

  const handleFinish = () => {
    // TODO gamification  
    if (questions) {
      if (questions[Number(getCookie(`started-${id}`))].Correct === selectedAnswer) {
        setCorrects(corrects + 1);       
      } else {
        setMistakes(mistakes + 1);
      }
    }
    deleteCookie(`started-${id}`);
    setCookie(`finished-${id}`, "true", 60);
    // navigate(0);
  }

  const handleQuitTest = () => {
    deleteCookie(`finished-${id}`);
    navigate("/");
  }
  
  useEffect(() => {
    setLoggedIn(getCookie("token") ? "true" : "");
    if (!getCookie("token")) {
      navigate("/not-allowed");
    }
    const getTest = async (id: string = "") => {
      if (id) {
        const response = await fetchTest(id)
        setTestTitle(response.Title);
        setTestDescription(response.Description);        
      }
    }
    getTest(id);
    
    async function getUser() {
      const user = await fetchUser(getCookie("user"));
      setUserALevel(user.admin);
    }

    if (getCookie("user") && getCookie("token")) {
      getUser();
    }
    if (!loggedIn) {
      setUserALevel(0);
    }

    async function getTestQuestions() {
      if (id) {
        const questions = await fetchTestQuestions(id);
        setQuestions(questions);
      }
    };
    getTestQuestions();
  }, [navigate]);
 
  return (
    <div className="lesson-details">
      {
        !getCookie(`started-${id}`) && !getCookie(`finished-${id}`) && 
        <article>
          <h2> {testTitle} </h2>
          <p> {testDescription} </p>
          <button className="check-button" onClick={startTest}> Incepe testul </button>
          { userALevel > 0 && <button className="next-question-button" onClick={handleDelete}> Șterge testul </button> }
        </article>
      }
      {
        getCookie(`started-${id}`) && questions &&
        <div className="test-box">
          <h2>
            Întrebarea {Number(getCookie(`started-${id}`)) + 1} / {questions.length}
          </h2>
          <p className="test-corrects">
            Răspunsuri corecte: {corrects}
          </p>
          <p className="test-mistakes">
            Răspunsuri greșite: {mistakes}
          </p>
          <div className="quik-quizz">
          <h3>
            {Number(getCookie(`started-${id}`)) + 1}. {questions[Number(getCookie(`started-${id}`))].Question}
          </h3>
          <div className="answers">
            <label className={`answer`}>
              <input 
                type="radio" 
                name="ans" 
                checked={selectedAnswer === questions[Number(getCookie(`started-${id}`))].Answer1}
                onChange={() => setSelectedAnswer(questions[Number(getCookie(`started-${id}`))].Answer1)}
                value={`${questions[Number(getCookie(`started-${id}`))].Answer1}`} 
              />
                1. {`${questions[Number(getCookie(`started-${id}`))].Answer1}`} 
            </label>
            <label className={`answer`}>
              <input 
                type="radio" 
                name="ans" 
                checked={selectedAnswer === questions[Number(getCookie(`started-${id}`))].Answer2}
                onChange={() => setSelectedAnswer(questions[Number(getCookie(`started-${id}`))].Answer2)}
                value={`${questions[Number(getCookie(`started-${id}`))].Answer2}`} 
              />
                2. {`${questions[Number(getCookie(`started-${id}`))].Answer2}`} 
            </label>
            <label className={`answer`}>
              <input 
                type="radio" 
                name="ans" 
                checked={selectedAnswer === questions[Number(getCookie(`started-${id}`))].Answer3}
                onChange={() => setSelectedAnswer(questions[Number(getCookie(`started-${id}`))].Answer3)}
                value={`${questions[Number(getCookie(`started-${id}`))].Answer3}`} 
              />
                3. {`${questions[Number(getCookie(`started-${id}`))].Answer3}`} 
            </label>
            <label className={`answer`}>
              <input 
                type="radio" 
                name="ans"
                checked={selectedAnswer === questions[Number(getCookie(`started-${id}`))].Answer4}
                onChange={() => setSelectedAnswer(questions[Number(getCookie(`started-${id}`))].Answer4)}
                value={`${questions[Number(getCookie(`started-${id}`))].Answer4}`} 
              />
                4. {`${questions[Number(getCookie(`started-${id}`))].Answer4}`} 
            </label>
          {
          (Number(getCookie(`started-${id}`)) + 1) !== questions.length &&
          <button
            onClick={handleNext}
            className="check-button"
          > Următoarea întrebare
          </button>
          }
          {
          (Number(getCookie(`started-${id}`)) + 1) === questions.length &&
          <button
            onClick={handleFinish}
            className="check-button"
          > Finalizează testul
          </button>
          }
          </div>
        </div>
        </div>
      }
      {
       getCookie(`finished-${id}`) &&
       <article>
          <h2> Finalul testului - {testTitle} </h2>
          { questions && corrects >= questions.length * 0.7 &&
            <p> Felicitări, ai trecut testul. </p> }
          { questions && corrects < questions.length * 0.7 &&
            <p> Din păcate ai picat testul. Întoarce-te la lecții pentru a solidifica materia. </p> }
          <button className="delete-button" onClick={handleQuitTest}> Înapoi la pagina principală </button>
        </article>
      }
    </div>
  );
}

export default TestDetailed
