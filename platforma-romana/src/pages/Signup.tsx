import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, apiCall } from "../functions/useApi.tsx";

const Signup = () => {
  const navigate = useNavigate();
    const [error, setError] = useState("");
    
  useEffect(() => {
    if (getCookie("token")) {
      navigate("/");
    }
  }, [navigate])
 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
    
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !password || !email) {
      setError("All fields are required!");
      return;
    }
    setError("");
    
    const data = {
      name: name,
      email: email,
      password: password
    };

    
    try {
        const response = await apiCall('http://localhost:8000/public/signup', 'POST', data);
        
        setIsPending(true);

        if (response.error) {
          setError(error);
        }
        
        if (response.token) {
            setIsPending(false);
            setError("");
            navigate("/login");
        } else {
            setIsPending(false);
            setError("Emailul a fost deja folosit")
            navigate("/signup");
        }
    } catch (error) {
        setError("Nu a putut fi stabilita o conexiune cu baza de date.")
        setIsPending(false);
        navigate("/signup");
    }
  }
  
  return (
    <div className="create">
      <h2> Sign up </h2>
      {error && <p> {error} </p>}
      <form onSubmit={handleSubmit}>
        <label> Nume: </label>
        <input
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label> Email: </label>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label> Parola: </label>
        <input
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        { !isPending && <button> Sign up </button> }
        { isPending && <button disabled> Signing up... </button> }
      </form>
    </div>
  );
}

export default Signup;
