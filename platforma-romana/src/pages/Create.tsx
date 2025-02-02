import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser, getCookie } from "../functions/useApi";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("Subiect 1");
  const navigate = useNavigate();

  useEffect(() => {  
    async function getUser() {
      const user = await fetchUser(getCookie("user"), getCookie("token"));
      if (user.admin == 0) {
        navigate("/not-allowed");
      }
    }
    if (getCookie("token")) {
      getUser();
    } else {
      navigate("/not-allowed");
    }
  }, [])
  
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
      navigate("/");
    });
  }
  
  return (
    <div className="create">
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
  );
}

export default Create;
