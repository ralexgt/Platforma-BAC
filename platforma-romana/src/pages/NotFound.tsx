import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h2 className="not-found-title">Ne pare rău, această pagină nu a putut fi găsită.</h2>
      <Link to="/" className="not-found-link">
        Înapoi la pagina principală
      </Link>
    </div>
  );
};

export default NotFound;
