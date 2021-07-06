import { useState,useContext,useEffect} from "react";
import { useHistory } from "react-router";
import { useDispatch,useSelector } from "react-redux";
import { getNotes } from "../selectors/note";
import useModal from "../hooks/useModal";
import Modal from "./Modal";
import User from "../contexts/user";
import * as notesActions from "../actions/notas";
import { MESSAGES } from "../constants/messages";
import "./css/NotesList.css";

const NotesList = () => {
  const history = useHistory();
  const notas = useSelector((state) => getNotes(state));
  const [note, setNote] = useState({id:""});
  const [notes, setNotes] = useState([]);
  const [notasCargadas, setNotasCargadas] = useState(false);
  const user = useContext(User);
  const dispatch = useDispatch();
  const modal = useModal();
  const closeModal = () => modal.close();
  const modalConfirm = useModal();
  const closeModalConfirm = () => modalConfirm.close();


  const fetchNotes = () => { 
    fetch("/api/notes", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-token": user.token
      },
    })
      .then((res) => res.json())
      .then((json) => setNotes(json)).then(()=>setNotasCargadas(true))
      .catch((err) => console.error(err));
  };

  const deleteNote = (id) => { 
    fetch("/api/notes/"+id, {
      method: "DELETE",
      headers: {
        "api-token": user.token
      },
    })
      .then((res) => res.json())
      .then((json) => onSucessDel(json))
      .catch((err) => onError(err));
  };

  const onSucessDel = (res)=>{
    if(res.error && (res.error != null) && (res.error != undefined)){
      onError(res.error);
    }else{
      modal.setMsgModal("");
      dispatch(notesActions.deleteNote(note.i));
    }
  };

  const onError = (err)=>{
    console.log(err);
    modal.setMsgModal(err);
    modal.open();
  };

  const handleClickAceptarDelete = (e)=>{
    e.preventDefault();
    deleteNote(note.id);
    closeModalConfirm();
  };
  const handleClickDelete = (e)=>{
    e.preventDefault();
    setNote({id:e.target.getAttribute("data"),title:e.target.getAttribute("data-title"),i:e.target.getAttribute("data-i")});
    modalConfirm.open();
  };
  const handleClickGet = (e)=>{
    e.preventDefault();
    history.push("/notes/get/"+e.target.getAttribute("data"));
  };

  const handleClickEdit = (e)=>{
    e.preventDefault();
    history.push("/notes/edit/"+e.target.getAttribute("data"));
  };

  const onClick = (e) =>{
      if (document.getElementById("sectionlistnote").classList.value == "noteslist") {
        document.getElementById("sectionlistnote").classList.add("block");
        document.getElementById("buttonToggleView").innerHTML = "&#xe241;";
        e.target.title=MESSAGES.modolista;
      } else {
        document.getElementById("sectionlistnote").classList="noteslist";
        document.getElementById("buttonToggleView").innerHTML = "&#xf1fc;";
        e.target.title=MESSAGES.modopostit
      }
  }

  useEffect(() => {
    if(user.token) {
      fetchNotes();
    }
  },[user.token,notas]);
  return (
    <section id="sectionlistnote" className="noteslist">
      <h3>{MESSAGES.notes} <button id="buttonToggleView" className="icon material-icons" onClick={onClick} title={MESSAGES.modopostit} >&#xf1fc;</button></h3>
      {notasCargadas&&
      <ul>
      {notes.map((note, i) => (
          <li key={i}>
            <div id={note.id} className="note-item">{note.title}</div>
            <button className="material-icons icon show" onClick={handleClickGet} title="Ver Nota" data={note.id}>&#xe8f4;</button>
            <button className="material-icons icon edit" onClick={handleClickEdit} title="Modificar Nota" data={note.id}>&#xe3c9;</button>
            <button className="material-icons icon delete" onClick={handleClickDelete} title="Borrar Nota" data-i={i} data={note.id} data-title={note.title}>&#xe5c9;</button>
          </li>
        ))}
        </ul>}
        <Modal show={modal.isOpen} onClose={closeModal}>
        <h3 className="modal-title error">{MESSAGES.error}</h3>
        <p className="modal-msg">{modal.msg}</p>
        <button  type="button" onClick={closeModal} >{MESSAGES.aceptar}</button>
      </Modal>
        <Modal show={modalConfirm.isOpen} onClose={closeModalConfirm}>
        <h3 className="modal-title">{MESSAGES.eliminarNota}</h3>
        <p className="modal-msg">{MESSAGES.confirmarEliminarNota}<br/><span className="negrita monospace">{note.title}</span>?</p>
        <div className="botonera">
        <button  onClick={handleClickAceptarDelete} className="acept">{MESSAGES.aceptar}</button>
        <button  onClick={closeModalConfirm} className="cancel">{MESSAGES.cancelar}</button>
        </div>
      </Modal>
    </section>
  );
};

export default NotesList;
