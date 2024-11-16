import React from "react";
import cl from "./Modal.module.css";
import { ReactNode } from "react";
interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={cl.modalOverlay}>
      <div className={cl.modalContent}>
        <div>{children}</div>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default Modal;
