import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 
import { setCookie, getCookie, apiCall } from "../functions/useApi.tsx";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie("token")) {
      navigate("/");
    }
  }, [])

  const [error, setError] = useState("");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
    
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError("All fields are required!");
      return;
    }
    setError("");
    
    const data = {
      email: email,
      password: password
    };

     try {
        const response = await apiCall('http://localhost:8000/public/login', 'POST', data);

        setIsPending(true);
        
        // Assuming the response includes JWT token
        if (response.token) {
            setIsPending(false);
            setCookie("token", response.token);
            setCookie("user", response.user.Id)
            setError("");
            navigate("/");
        } else {
            setIsPending(false);
            setError("Email sau parola incorecta");
            navigate("/login");
        }
    } catch (error) {
        setIsPending(false);
        setError("Nu s-a putut stabili o conexiune cu baza de date.");
        navigate("/login");
    }
  }
  
  return (
    <div className="create">
      <h2> Log in </h2>
      {error && <p> {error} </p>}
      <form onSubmit={handleSubmit}>
        <label> Email: </label>
        <input
          type="text"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label> Password: </label>
        <input
          type="text"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        { !isPending && <button> Log in </button> }
        { isPending && <button disabled> Logging in... </button> }
      </form>
      <div>
        <p> Nu ai un cont? Inregistreaza-te aici: </p>
        <Link to="/signup"> Sign up </Link>
      </div>  
    </div>
  );
}

export default Login;
