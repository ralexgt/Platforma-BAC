
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllTests, fetchUser, getCookie } from "../functions/useApi";
import { Test } from "../props/Props";

const CreateTest = () => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [allTests, setAllTests] = useState<Test[]>();
  const [toTest, setToTest] = useState("");
  const [hint, setHint] = useState("");
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

   async function fetchTests() {
     const tests = await fetchAllTests();
     setAllTests(tests);
   }
   fetchTests(); 
    
  }, [navigate])
  
  const handleSubmitTest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const test = {title, description};

    fetch("http://127.0.0.1:8000/private/newTest", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify(test)
    }).then(() => {
      console.log(`Added test ${test.title}`);
      navigate(0);
    });
  }

  const handleSubmitQuestion = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const questionToAdd = {test_id: toTest,
                           question: question,
                           answer1: answer1,
                           answer2: answer2,
                           answer3: answer3,
                           answer4: answer4,
                           correct: correctAnswer,
                           hint: hint, 
                          };

    fetch("http://127.0.0.1:8000/private/newQuestion", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify(questionToAdd)
    }).then(() => {
      console.log(`Added test ${questionToAdd.question}`);
      navigate(0);
    });
  }
  
  return (
    <div className="create-test">
      <div className="create-test-form">
        <h2> Adaugă un nou test </h2>
        <form onSubmit={handleSubmitTest}>
          <label> Titlul testului: </label>
          <input
            type="text"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <label> Descrierea testului: </label>
          <textarea
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <button> Adaugă testul </button>
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
          <label> Hint: </label>
          <input
            type="text"
            required
            value={hint}
            onChange={(event) => setHint(event.target.value)}
          />
          <label> Selectează testul: </label>
          <select
            value={toTest}
            onChange={(event) => setToTest(event.target.value)}
          > 
            <option value="">  </option>
            {
              allTests?.map((test, index) => (
                <option key={index} value={test.Id}> {test.Id} </option>
              ))
            }
          </select>  
          <button> Adaugă întrebarea </button>
        </form>

      </div>
    </div>
  );
}

export default CreateTest;
