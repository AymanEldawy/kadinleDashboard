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
  console.log("run.. form");
  console.log(initialFields, openForm)
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
      <SuperForm initialFields={initialFields} />
    </Modal>
  );
};

export default PopupForm;
