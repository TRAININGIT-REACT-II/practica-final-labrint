import { useState} from "react";

const useModal = (initialValue = false) => {
  const [showModal, setShowModal] = useState(initialValue);
  const [msg, setMsg] = useState("");
  const setMsgModal = (texto) => {
    setMsg(texto);
  };

  const open = () => {
    setShowModal(true);
  };
  const close = () => {
    setShowModal(false);
    setMsg("");
  };

  return {
    msg: msg,
    isOpen: showModal,
    open,
    close,
    setMsgModal
  }
}

export default useModal;