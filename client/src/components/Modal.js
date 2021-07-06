import { useEffect, useRef } from "react";
import { createPortal } from "react-dom"; 
import "./css/Modal.css";
import { MESSAGES } from "../constants/messages";

const Modal = ({ children, show, onClose }) => {
  const modalRef = useRef(null);
  const modalGroupRef = useRef(document.getElementById("modals"));

  // Agregamos un nuevo elemento al DOM en mount y lo borramos
  // al quitar el componente
  useEffect(() => {
    const modalEl = document.createElement("div");
    modalEl.classList.add("modal-hidden");
    // lo agregamos al DOM manualmente
    modalGroupRef.current.appendChild(modalEl);
    // Guardamos la referencia
    modalRef.current = modalEl;
    return () => modalGroupRef.current.removeChild(modalRef.current);
  }, [])

  // Reaccionamos ante los cambios en show para mostrar y ocultar el modal
  useEffect(() => {
    if (modalRef.current != null) {
      if (show) {
        modalRef.current.classList.remove("modal-hidden");
      } else {
        modalRef.current.classList.add("modal-hidden");
      }
    }
  }, [show])

  // Renderizamos el componente
  if (show && modalRef.current != null) {
    return createPortal(
      <div role="dialog">
        <div className="modal-background" onClick={onClose}/>
        <div className="modal">
          <button type="button"
            className="modal-close icon material-icons" 
            onClick={onClose} title={MESSAGES.cerrar}>&#xe5c9;</button>
          {children}
        </div>
      </div>,
      modalRef.current
    );
  } else {
    return null;
  }
};

export default Modal;