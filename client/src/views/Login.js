import { Link } from "react-router-dom";
import"./css/Login.css";
import FormLogin from ".././components/FormLogin";
import ErrorBoundary from "../components/ErrorBoundary";
import { MESSAGES } from "../constants/messages";

const Login = () => {

  return (
    <section id="login" className="login-section">
      <ErrorBoundary message={MESSAGES.errorInesperado}>
      <FormLogin></FormLogin>
      <div id="login-ayuda" className="login-ayuda-wrap">
        <span id="login-ayuda-etiqueta" className="login-ayuda-etiqueta">{MESSAGES.noRegistrado}</span>
        <Link to="/register">{MESSAGES.registrarse}</Link>
      </div>
      </ErrorBoundary>
    </section>
  );
};

export default Login;
