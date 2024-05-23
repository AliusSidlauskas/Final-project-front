import React from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

type ModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const Modal = ({ message, onConfirm, onCancel }: ModalProps) => {
  return (
    <>
      <div className={styles.main}>
        <h4>{message}</h4>
        <div className={styles.buttons}>
          <Button isLoading={false} title="No, cancel" onClick={onCancel} />
          <Button
            isLoading={false}
            title="Yes, delete"
            onClick={onConfirm}
            type="WARNING"
          />
        </div>
      </div>
      <div className={styles.background}></div>
    </>
  );
};

export default Modal;