import React from "react";

import { ExclamationTriangle } from "../../Helpers/Icons";
import { Button } from "../Global/Button";
import Modal from "../Modal/Modal";

const ConfirmModal = ({ open, setOpen, onConfirm }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <h3 className="text-yellow-700 text-lg mb-4 font-semibold flex items-center gap-2">
        <ExclamationTriangle /> Warning{" "}
      </h3>
      <p className="mb-6 mx-auto max-w-[90%] text-sm text-gray-600 whitespace-nowrap">
        Are you sure you want to delete?
        {/* <span className="text-red-600 font-medium"></span> */}
      </p>
      <div className="flex gap justify-end gap-2">
        <Button
          title="Cancel"
          classes="flex-1 text-xs capitalize !bg-transparent !text-gray-500 border"
          onClick={() => setOpen(false)}
        />
        <Button
          title="yes"
          classes="flex-1 text-xs capitalize !bg-red-500"
          onClick={onConfirm}
        />
      </div>
    </Modal>
  );
};

export default ConfirmModal;
