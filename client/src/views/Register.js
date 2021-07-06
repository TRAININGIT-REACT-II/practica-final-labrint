import { Link } from "react-router-dom";
import "./css/Register.css";
import FormRegister from "../components/FormRegister";
import ErrorBoundary from "../components/ErrorBoundary";
import { MESSAGES } from "../constants/messages";

const Register = () => (
<section id ="registro" className="register-section">
  <ErrorBoundary message={MESSAGES.errorInesperado}>
    <FormRegister></FormRegister>
    <div id="registro-ayuda" className="register-ayuda-wrap">
      <span id="registro-ayuda-etiqueta" className="register-ayuda-etiqueta">{MESSAGES.yaRegistrado}</span>
      <Link to="/login">{ MESSAGES.iniciaSesion}</Link>
    </div>
  </ErrorBoundary>
</section>
);

export default Register;
