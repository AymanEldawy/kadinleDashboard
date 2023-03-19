import React from "react";
import {
  CheckIcon,
  ExclamationTriangle,
  HandStopIcon,
  InformationIcon,
} from "../../Helpers/Icons";
import Modal from "../Modal/Modal";

const Alert = ({ alertMessage, dispatchAlert }) => {
  // console.log(alertMessage, dispatchAlert);
  // if(!alertMessage) return;
  const alertType = (alert) => {
    switch (alert?.type) {
      case "error":
        return (
          <>
            <HandStopIcon className="w-28 h-28 text-red-500" />
            <p className="text-lg text-red-700">{alert?.msg}</p>
          </>
        );
      case "success":
        return (
          <>
            <CheckIcon className="w-28 h-28  text-green-500" />
            <p className="text-lg text-green-700">{alert?.msg}</p>
          </>
        );
      case "info":
        return (
          <>
            <InformationIcon className="w-28 h-28 text-blue-500" />
            <p className="text-lg text-blue-700">{alert?.msg}</p>
          </>
        );
      case "warning":
        return (
          <>
            <ExclamationTriangle className="w-28 h-28 text-yellow-500" />
            <p className="text-lg text-yellow-700">{alert?.msg}</p>
          </>
        );
    }
  };
  return (
    <>
      <Modal open={alertMessage?.open} onClose={() => dispatchAlert({})}>
        <div className="flex flex-col gap-4 justify-center items-center">
          {alertType(alertMessage)}
        </div>
      </Modal>
    </>
  );
};

export default Alert;
