import { useState,useContext  } from "react";
import { useHistory } from "react-router";
import useModal from "../hooks/useModal";
import User from "../contexts/user";
import Modal from "./Modal";
import "./css/Form.css";
import "./css/FormThemeDark.css";
import { MESSAGES } from "../constants/messages";
import { validarFormulario } from "../utils/FormUtils";


const FormRegister = () => {
  // Alamcenamos el estado del formulario
  const [formState, setFormState] = useState({ username: "", password: "" });
  const user = useContext(User);
  const history = useHistory();
  const modal = useModal();
  const closeModal = () => modal.close();

  // Actualizamos el estado
  const onChange = (key) => (e) => {
    setFormState({
      ...formState,
      [key]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario(formState.username,formState.password)){
      fetch(API_URL+"/register", {
        method: "POST",
        body: JSON.stringify({username:formState.username,password:formState.password}),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((json) => handleLogon(json))
        .catch((err) => onError(err));
    }else{
      modal.setMsgModal(MESSAGES.errorValidacionFormulario);
      modal.open();
    }
  };
  const handleLogon = (res)=>{
    if((res.error != null) && (res.error != undefined)){
      onError(res.error);
    }else{
      console.log(res);
      modal.setMsgModalError("");
      user.updateUser({username:res.username,token:res.token,id:res.id});
      history.push(`/notes`);
    }
  }
  const onError = (err)=>{
    console.log(err);
    modal.setMsgModal(err);
    modal.open();
    user.updateUser({username:"",token:"",id:""});
  }

  return (
    <form id="registerform" onSubmit={onSubmit}>
      <div className="wrap-form">
        <h3>{MESSAGES.crearCuenta}</h3>
        <div>
          <label htmlFor="username">{MESSAGES.usuario}</label>
          <input
            id="username"
            type="text"
            value={formState.username}
            onChange={onChange("username")}
          />
        </div> 
        <div>
          <label htmlFor="password">{MESSAGES.password}</label>
          <input
            id="password"
            type="password"
            value={formState.password}
            onChange={onChange("password")}
          />
        </div>
      </div>
      <button id="btnsubmitregister">{MESSAGES.registar}</button>
      <Modal show={modal.isOpen} onClose={closeModal}>
        <h3 className="modal-title error">{MESSAGES.error}</h3>
        <p className="modal-msg">{modal.msg}</p>
        <button  type="button" onClick={closeModal} >{MESSAGES.aceptar}</button>
      </Modal>
    </form>
  );
};

export default FormRegister;
