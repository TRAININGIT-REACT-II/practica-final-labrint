import { useState ,useContext } from "react";
import useModal from "../hooks/useModal";
import ThemeToggle from "./ThemeToggle";
import Modal from "./Modal";
import User from "../contexts/user";
import { MESSAGES } from "../constants/messages";
import "./css/Header.css";
import "./css/HeaderThemeDark.css";

const Header = () => {
  const user = useContext(User);
  const modal = useModal();
  const closeModal = () => modal.close();

  const handleClickLogout = ()=>{
      closeModal();
      user.updateUser({username:"",token:"",id:""});
  }
  return <div className="header" >
      {user.username}
      {user.token &&
        <button title={MESSAGES.cerrarSesion} className="material-icons icon" onClick={modal.open}>&#xe9ba;</button>}
    <ThemeToggle></ThemeToggle>
    <Modal show={modal.isOpen} onClose={closeModal}>
      <h3 className="modal-title">{MESSAGES.cerrarSesion}</h3>
      <p className="modal-msg">{MESSAGES.confirmarCierreSesion}</p>
      <div className="botonera">
      <button  onClick={handleClickLogout} className="acept">{MESSAGES.aceptar}</button>
      <button  onClick={closeModal} className="cancel">{MESSAGES.cancelar}</button>
      </div>
    </Modal>
    </div>;
};
export default Header;
