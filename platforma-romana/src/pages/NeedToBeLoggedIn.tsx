import { Link } from "react-router-dom";

const NeedToBeLoggedIn = () => {
  return (
    <div className="not-found-container">
      <h2 className="not-found-title">
        Nu ai suficiente accese pentru a accesa această pagină
      </h2>
      <Link to="/" className="not-found-link">
        Înapoi la pagina principală
      </Link>
    </div>
  );
};

export default NeedToBeLoggedIn;
