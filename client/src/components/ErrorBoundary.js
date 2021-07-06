import React from "react";
import { Link } from "react-router-dom";
import { MESSAGES } from "../constants/messages";
import "./css/ErrorBoundary.css"
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      error: false
    };
  }
  static getDerivedStateFromError() {
    return {
      error: true
    };
  }

  componentDidCatch(error, info) {
    //No enviamos el error a ningun externo
    console.log(error, info);
  }

  onClick() {
    this.setState({ error: false });
  }

  render() {
    if (this.state.error === true) {
      return (
        <section className="error-generico">
          <h1>{this.props.message}</h1>
          <Link to="/notes" onClick ={this.onClick}>{MESSAGES.volver}</Link>
        </section>
      );
    }

    // Si no hay errores mostramos el resto
    return this.props.children;
  }
}

export default ErrorBoundary;
