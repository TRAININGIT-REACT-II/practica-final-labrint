import { Link } from "react-router-dom";
import "./css/Error.css";
import { MESSAGES } from "../constants/messages";
const NotFound = () => (
  <section className="error-page">
    <div id="notfound-icon" className="icon">:(</div>
    <h3 id="notfound-title">{MESSAGES.error404}</h3>
    <Link to="/">{MESSAGES.returnHome}</Link>
  </section>
);

export default NotFound;
