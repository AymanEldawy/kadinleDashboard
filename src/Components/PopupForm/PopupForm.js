import axios from "axios";
import React from "react";
import { useMemo } from "react";
import { useContext } from "react";
import { AlertContext } from "../../Context/AlertContext";
import { PopupFormContext } from "../../Context/PopupFormContext";
import formsApi from "../../Helpers/Forms/formsApi";
import SuperForm from "../CustomForm/SuperForm";
import Modal from "../Modal/Modal";

const PopupForm = () => {
  const { openForm, dispatchForm } = useContext(PopupFormContext);
  const { dispatchAlert } = useContext(AlertContext);
  const { table, open } = openForm;
  let initialFields = useMemo(() => formsApi[table], [table]);
  // Handel Submit
  const onSubmit = async (values) => {
    let body = {
      dat: values,
      columns: Object.keys(values),
      table,
    };
    let res = await axios.post(`/create`, {
      ...body,
    });
    if (res?.statusText === "OK") {
      dispatchAlert({
        open: true,
        type: "success",
        msg: "Added Successfully...",
      });
      // close form
    }
  };

  return (
    <Modal open={open} onClose={() => dispatchForm({})}>
      <div className="flex items-center mb-8 text-left">
        <button
          className={` p-2 flex-1 font-medium capitalize border-l-4 dark:bg-borderdark text-left text-lg !text-blue-500 bg-blue-50 border-blue-500 `}
        >
          Create new {table}
        </button>
      </div>
      <SuperForm initialFields={initialFields} onSubmit={onSubmit} />
    </Modal>
  );
};

export default PopupForm;
