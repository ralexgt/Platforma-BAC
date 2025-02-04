import { useEffect, useState } from "react";
import { QuickQuestion, QuickQuestionProps } from "../props/Props";
import { fetchUpdateExperience, fetchUpdateGold } from "../functions/useApi";

const QuizBox: React.FC<QuickQuestionProps> = ({quizQuestions, user}) => {
  const [currentQuestion, setCurrentQuestion] = useState<QuickQuestion>();
  const [currentAnswers, setCurrentAnswers] = useState<string[]>();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>();
  const [isCorrect, setIsCorrect] = useState<boolean>();
  const [showPopup, setShowPopup] = useState(false);
    
  const handleCheckAnswer = () => {
    if (selectedAnswer !== undefined) {
      if (currentAnswers && currentQuestion) {
        if (selectedAnswer){
          setIsCorrect(selectedAnswer == currentQuestion.Correct);
        }
        if (selectedAnswer == currentQuestion.Correct) {
          fetchUpdateGold(user, 5);
          fetchUpdateExperience(user, 50);
          triggerPopup();
        }
      }
    }
  };

  const handleNextQuestion = () => {
    const oldQuestion = currentQuestion;
    let newQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    if (newQuestion == oldQuestion) {
      newQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    }
    setCurrentQuestion(newQuestion);
    setIsCorrect(undefined);
    setSelectedAnswer(undefined);
  }

  const triggerPopup = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 1900);
  };
  
  useEffect(() => {
    if (currentQuestion) {
      setCurrentAnswers([
        currentQuestion.Answer1,
        currentQuestion.Answer2,
        currentQuestion.Answer3,
        currentQuestion.Answer4
      ]);
    }
  }, [currentQuestion])

  useEffect(() => {
    handleNextQuestion();
  }, [quizQuestions]);
  
  return (
    <div className="quizz-box">
      <h2> Întrebări rapide referitoare la lecție </h2>
     {showPopup && <div className="popup-green"> Ai primit 5 gold și 50 exp.</div>}
      { currentQuestion && currentAnswers &&
        <div className={`quik-quizz ${(isCorrect === undefined || !selectedAnswer) ? "" : isCorrect ? "correct" : "incorrect"}`}>
        <h3>{currentQuestion.Question}</h3>
        <div className="answers">
          {currentAnswers.map((answer, index) => (
            <label 
              key={index} 
              className={`answer ${(selectedAnswer && isCorrect !== undefined && answer === currentQuestion.Correct) ? "highlight" : ""}`}
            >
              <input 
                type="radio" 
                name="quiz" 
                value={index} 
                checked={selectedAnswer === answer}
                onChange={() => setSelectedAnswer(answer)} 
                disabled={isCorrect !== undefined} 
              />
              {" "}{answer}
            </label>
          ))}
        </div>
        <button 
          onClick={handleCheckAnswer} 
          className="check-button" 
          disabled={isCorrect !== undefined}
        >
          Trimite răspuns
        </button>
        <button 
          onClick={handleNextQuestion} 
          className="next-question-button"
          disabled={isCorrect === undefined}
        >
          Următoarea întrebare
        </button>
      </div>
      }
    </div>
  );
}

export default QuizBox
