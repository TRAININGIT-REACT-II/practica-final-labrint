import { useState,useContext, useEffect } from "react";
import { useHistory,useParams } from "react-router";
import useModal from "../hooks/useModal";
import User from "../contexts/user";
import Modal from "./Modal"
import { MESSAGES } from "../constants/messages";
import "./css/Notes.css";

const ShowNote = () => {
  const user = useContext(User);
  const params= useParams();
  const history = useHistory();
  const [note, setNote] = useState({});
  const modal = useModal();
  const closeModal = () => modal.close();

  const fetchNote = () => {
    fetch("/api/notes/"+params.id, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-token": user.token
      },
    })
      .then((res) => res.json())
      .then((json) =>onSucess(json))
      .catch((err) => onError (err));
  };
  const onError = (err)=>{
    console.log(err);
    modal.setMsgModal(err);
    modal.open();
  }
  const onSucess = (json) =>{
    if(json.error  &&(json.error != null) && (json.error != undefined)){
      onError (json.error)
    }else{
      setNote({id:json.id,title:json.title,content:json.content});
      modal.setMsgModal("");
    }
  }
  const onClickVolver = (e) => {
    e.preventDefault();
    history.push("/notes");
  };

  useEffect(() => {
    fetchNote();
  }, [params.id]);

  return (
    <section id={params.id} className="section-note">
      <div className="wrap-note">
          <h3>{note.title}</h3>
          <div className="note-text">
            {note.content}
          </div>
      </div>
      <button id="btnback" onClick={onClickVolver} type="button" title={MESSAGES.volver}>{MESSAGES.volver}</button>
        <Modal show={modal.isOpen} onClose={closeModal}>
        <h3 className="modal-title error">{MESSAGES.error}</h3>
        <p className="modal-msg">{modal.msg}</p>
        <button  type="button" onClick={closeModal} >{MESSAGES.aceptar}</button>
      </Modal>
    </section>
  );
};

export default ShowNote;
