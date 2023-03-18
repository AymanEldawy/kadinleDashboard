import React from "react";
import Modal from "../Modal/Modal";

const Alert = ({ alertMessage, dispatchAlert }) => {
  // console.log(alertMessage, dispatchAlert);
  // if(!alertMessage) return;
  return (
    <>
      <Modal open={alertMessage?.open} onClose={() => dispatchAlert({})}>
        Alert
      </Modal>
    </>
  );
};

export default Alert;
