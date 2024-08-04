import React from "react";
import Modal from "../Modal/Modal";
import SuperForm from "./SuperForm";
import { FormIncreasable } from "./FormIncreasable";

export const PopupFormOne = ({
  setInitialFields,
  setOldValues,
  open,
  setOpen,
  oldValues,
  table,
  layout,
  setLayout,
  initialFields,
  onSubmit,
  resetForm,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => {
        setInitialFields([]);
        setOldValues({});
        setOpen(false);
        setLayout("");
      }}
    >
      <h4 className="border-b border-gray-200 pb-2 text-primary-blue font-medium mb-4">
        {layout === "update"
          ? `Update ${table} / ${oldValues?.name}`
          : `Add ${table}`}
      </h4>
      {layout === "update" ? (
        <SuperForm
          onSubmit={onSubmit}
          initialFields={initialFields}
          oldValues={oldValues}
          resetForm={resetForm}
          layout={layout}
        />
      ) : (
        <FormIncreasable
          onSubmit={onSubmit}
          initialFields={initialFields}
          oldValues={oldValues}
          resetForm={resetForm}
          layout={layout}
        />
      )}
    </Modal>
  );
};
