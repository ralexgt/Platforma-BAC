
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteCookie, fetchTest, fetchTestQuestions, fetchUpdateExperience, fetchUpdateGold, fetchUser, getCookie, setCookie } from "../functions/useApi.tsx";
import { Question } from "../props/Props.tsx";


const TestDetailed = () => {
  const { id } = useParams();
  
  const [loggedIn, setLoggedIn] = useState(getCookie("token") ? "true" : "")
  const [userALevel, setUserALevel] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [userGold, setUserGold] = useState<number>();
  const navigate = useNavigate();

  const [testTitle, setTestTitle] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>();
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const [corrects, setCorrects] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  const handleDelete = () => {
    fetch(`http://127.0.0.1:8000/public/delete/test/${id}`, {
      "method": "DELETE"
    });
    navigate("/");
  }
  
   const handleFiftyFifty = () => {
     // TODO
  };
  
   const handleShowHint = () => {
     if (userGold) {
       if (userGold < 30) {
         triggerPopup();
         return;
       }
     }
     setShowHint(true);
     fetchUpdateGold(userEmail, -20);
  };
   const handleShowAnswer = () => {
     if (userGold) {
       if (userGold < 30) {
         triggerPopup();
         return;
       }
     }
     setShowAnswer(true);
     fetchUpdateGold(userEmail, -30);
  };

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
    setShowAnswer(false);
    setShowHint(false);
    setCookie(`started-${id}`, String(nextQuestionNumber))
  }

  const handleFinish = async () => {
    if (questions![Number(getCookie(`started-${id}`))].Correct === selectedAnswer) {
      if (corrects + 1 >= 0.7 * questions!.length) {
        setCookie(`passed-${id}`, `${corrects + 1}`, 60);
        await fetchUpdateExperience(userEmail, (corrects+1) * 50);
        await fetchUpdateGold(userEmail, (corrects+1) * 20);
      } else {
        setCookie(`failed-${id}`, `${corrects + 1}`, 60);
      }
    } else {
      if (corrects >= 0.7 * questions!.length) {
        setCookie(`passed-${id}`, `${corrects}`, 60);
      } else {
        setCookie(`failed-${id}`, `${corrects}`, 60);
      }
    }
    deleteCookie(`started-${id}`);
    setTimeout(() => navigate(0), 300);
  }

  const handleQuitTest = () => {
    deleteCookie(`passed-${id}`);
    deleteCookie(`failed-${id}`);
    navigate("/");
  }

  const triggerPopup = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 1400);
  };
  
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
      setUserEmail(user.email);
      setUserGold(user.gold);
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
        !getCookie(`started-${id}`) && !getCookie(`failed-${id}`) && !getCookie(`passed-${id}`) && 
        <article>
          <h2> {testTitle} </h2>
          <p> {testDescription} </p>
          <button className="check-button" onClick={startTest}> Începe testul </button>
          { userALevel > 0 && <button className="next-question-button" onClick={handleDelete}> Șterge testul </button> }
        </article>
      }
      {
        getCookie(`started-${id}`) && questions &&
        <div className="test-box">
          <h2>
            Întrebarea {Number(getCookie(`started-${id}`)) + 1} / {questions.length}
          </h2>
          <div className="quik-quizz">
          <h3>
            {Number(getCookie(`started-${id}`)) + 1}. {questions[Number(getCookie(`started-${id}`))].Question}
          </h3>
          <div className="answers">
            <label className={`answer ${(showAnswer && questions[Number(getCookie(`started-${id}`))].Answer1 === questions[Number(getCookie(`started-${id}`))].Correct)? "correct-answer" : ""}`}>
              <input 
                type="radio" 
                name="ans" 
                checked={selectedAnswer === questions[Number(getCookie(`started-${id}`))].Answer1}
                onChange={() => setSelectedAnswer(questions[Number(getCookie(`started-${id}`))].Answer1)}
                value={`${questions[Number(getCookie(`started-${id}`))].Answer1}`} 
              />
                1. {`${questions[Number(getCookie(`started-${id}`))].Answer1}`} 
            </label>
            <label className={`answer ${(showAnswer && questions[Number(getCookie(`started-${id}`))].Answer2 === questions[Number(getCookie(`started-${id}`))].Correct)? "correct-answer" : ""}`}>
              <input 
                type="radio" 
                name="ans" 
                checked={selectedAnswer === questions[Number(getCookie(`started-${id}`))].Answer2}
                onChange={() => setSelectedAnswer(questions[Number(getCookie(`started-${id}`))].Answer2)}
                value={`${questions[Number(getCookie(`started-${id}`))].Answer2}`} 
              />
                2. {`${questions[Number(getCookie(`started-${id}`))].Answer2}`} 
            </label>
            <label className={`answer ${(showAnswer && questions[Number(getCookie(`started-${id}`))].Answer3 === questions[Number(getCookie(`started-${id}`))].Correct)? "correct-answer" : ""}`}>
              <input 
                type="radio" 
                name="ans" 
                checked={selectedAnswer === questions[Number(getCookie(`started-${id}`))].Answer3}
                onChange={() => setSelectedAnswer(questions[Number(getCookie(`started-${id}`))].Answer3)}
                value={`${questions[Number(getCookie(`started-${id}`))].Answer3}`} 
              />
                3. {`${questions[Number(getCookie(`started-${id}`))].Answer3}`} 
            </label>
            <label className={`answer ${(showAnswer && questions[Number(getCookie(`started-${id}`))].Answer4 === questions[Number(getCookie(`started-${id}`))].Correct)? "correct-answer" : ""}`}>
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
            className="next-question-test-button"
          > Următoarea întrebare
          </button>
          }
          {
          (Number(getCookie(`started-${id}`)) + 1) === questions.length &&
          <button
            onClick={handleFinish}
            className="next-question-test-button"
          > Finalizează testul
          </button>
          }
          </div>
        </div>
      {showHint && <p className="quiz-hint">Hint: {questions[Number(getCookie(`started-${id}`))].Hint}</p>}
       <div className="quiz-buttons">
         {showPopup && <div className="popup">Not enough gold</div>}
        <div className="badge-container">
          <button onClick={handleFiftyFifty} className="quiz-button fifty-fifty">50/50</button>
          <span className="badge-description">10 gold</span>
        </div>
        <div className="badge-container">
          <button onClick={handleShowHint} disabled={showHint} className="quiz-button hint">Get a Hint</button>
          <span className="badge-description">20 gold</span>
        </div>
        <div className="badge-container">
          <button onClick={handleShowAnswer} disabled={showAnswer} className="quiz-button reveal">Reveal Answer</button>
          <span className="badge-description">30 gold</span>
        </div>
      </div>
      </div>
      }
      {
       getCookie(`passed-${id}`) &&
       <article>
          <h2> Finalul testului - {testTitle} </h2>
          <p> Felicitări, ai trecut testul. </p>
          <p> {Number(getCookie(`passed-${id}`))} / {questions?.length} răspunsuri corecte.</p>
          <p> Ai câștigat {Number(getCookie(`passed-${id}`)) * 50} experiență și {Number(getCookie(`passed-${id}`)) * 20} gold </p>
          <button className="finish-test-button" onClick={handleQuitTest}> Înapoi la pagina principală </button>
        </article>
      }
      {
      getCookie(`failed-${id}`) &&
      <article>
        <h2> Finalul testului - {testTitle} </h2>
        <p> Din păcate ai picat testul. Întoarce-te la lecții pentru a solidifica materia. </p>
        <p> {Number(getCookie(`failed-${id}`))} / {questions?.length} răspunsuri corecte.</p>
          <button className="finish-test-button" onClick={handleQuitTest}> Înapoi la pagina principală </button>
      </article>
      }
    </div>
  );
}

export default TestDetailed
