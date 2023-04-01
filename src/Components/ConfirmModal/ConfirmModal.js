import React from "react";
import { Button } from "../Global/Button";
import Modal from "../Modal/Modal";

const ConfirmModal = ({ open, setOpen, onConfirm }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <h3 className="text-red-500 text-lg mb-2 font-semibold">Warning:</h3>
      <p className="mb-6 mx-auto max-w-[90%]">
        Are you sure you want to delete?
      </p>
      <div className="flex gap justify-end gap-2">
        <Button
          title="Cancel"
          classes="!bg-transparent !text-gray-500 border"
          onClick={() => setOpen(false)}
        />
        <Button title="yes" classes="!bg-red-500" onClick={onConfirm} />
      </div>
    </Modal>
  );
};

export default ConfirmModal;
