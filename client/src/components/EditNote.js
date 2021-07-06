import { useState,useContext ,useEffect} from "react";
import { useHistory,useParams} from "react-router";
import { useDispatch} from "react-redux";
import useModal from "../hooks/useModal";
import User from "../contexts/user";
import Modal from "./Modal";
import "./css/Form.css"; 
import { MESSAGES } from "../constants/messages";
import * as notesActions from "../actions/notas";

const EditNote = () => {
  const user = useContext(User);
  const params= useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [note, setNote] = useState({})
  const [formState, setFormState] = useState({ title:"", content: "" });
  const modal = useModal();
  const closeModal = () => modal.close();


  // Actualizamos el estado
  const onChange = (key) => (e) => {
    setFormState({
      ...formState,
      [key]: e.target.value,
    });
  };
  const fetchNote = () => {
    fetch("/api/notes/"+params.id, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-token": user.token
      },
    })
      .then((res) => res.json())
      .then((json) =>onSucessShowNote(json))
      .catch((err) => onError (err));
  };

  const onSubmitNote = (e) => {
    e.preventDefault();
    fetch("/api/notes/"+params.id, {
      method: "PUT",
      body: JSON.stringify({
        title: formState.title,
        content: formState.content
      }),
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
      modal.setMsgModal("");
      dispatch(notesActions.addNote(json));
      history.push("/notes/get/"+json.id);
    }
  }

  const onSucessShowNote = (json) =>{
    if(json.error  &&(json.error != null) && (json.error != undefined)){
      onError (json.error)
    }else{
      modal.setMsgModal("");
      setNote({id:json.id,title:json.title,content:json.content});
      setFormState({title:json.title, content: json.content});
    }
  }

  useEffect(() => {
    fetchNote();
  }, [params.id]);

  return (
    <form onSubmit={onSubmitNote} id="addnoteform">
      <div className="wrap-note">
        <h3> {note &&  <input
        id="addtitle"
        type="text"
        value={formState.title}
        onChange={onChange("title")}
        placeholder={MESSAGES.titulo}
      />}</h3>
        <div className="note-text">
        {note &&  
          <textarea id="addcontent" onChange={onChange("content")} defaultValue={formState.content}/>
        }
          </div>
      </div>
      <div className="botonera">
        <button>{MESSAGES.guardar}</button>
        <button type="button" onClick={()=>history.push("/notes")}>{MESSAGES.cancelar}</button>
      </div>
      <Modal show={modal.isOpen} onClose={closeModal}>
      <h3 className="modal-title error">{MESSAGES.error}</h3>
      <p className="modal-msg">{modal.msg}</p>
      <button  type="button" onClick={closeModal} >{MESSAGES.aceptar}</button>
    </Modal>
    </form>
  );
};

export default EditNote;
