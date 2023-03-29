import React from "react";
import { useState } from "react";
import SuperForm from "../../CustomForm/SuperForm";
import BlockPaper from "../../BlockPaper/BlockPaper";
import formsApi from "../../../Helpers/Forms/formsApi";

const initialFields = [
  {
    type: "number",
    required: true,
    label: "Number",
    name: "number",
  },

  {
    key: "select",
    list: [
      { id: 1, name: "Admin " },
      { id: 3, name: "User" },
      { id: 2, name: "yellow" },
    ],
    required: true,
    label: "SecLvl",
    name: "SecLvl",
  },
  {
    type: "text",
    required: true,
    label: "Name",
    name: "name",
  },
  {
    type: "date",
    required: true,
    label: "Creation Date",
    name: "created_at",
  },
  {
    key: "unique",
    list: [
      { id: 1, name: "red" },
      { id: 3, name: "green" },
      { id: 2, name: "yellow" },
    ],
    required: true,
    label: "Unique Name",
    name: "Guid",
  },
  {
    key: "radio",
    list: ["Green", "red", "blue"],
    required: true,
    label: "Color",
    name: "color",
  },
  {
    key: "checkbox",
    list: ["Light", "Dark", "Gradient"],
    required: true,
    label: "Mode",
    name: "mode",
  },
];

const CreateAccount = () => {
  const form = formsApi['account'];
  const submit = (values) => {
  };
  return (
    <BlockPaper title="Create new Account">
      <SuperForm initialFields={initialFields} onSubmit={submit} />
    </BlockPaper>
  );
};

export default CreateAccount;
