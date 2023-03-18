import React from "react";
import { useParams } from "react-router-dom";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import Layout from "../../Layout";
import formsApi from "../../Helpers/Forms/formsApi";
import SuperForm from "../../Components/CustomForm/SuperForm";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Modal from "../../Components/Modal/Modal";
import { TableBar } from "../../Components/TableBar/TableBar";
import SuperTable from "../../Components/CustomTable/SuperTable";
import { useCallback } from "react";

function getForm(form) {
  console.log(formsApi);
  return formsApi[form];
}
function getColumns(table) {
  return table?.map((col) => col.name);
}
function getAllColumns(table) {
  let columns = [];
  for (const key in table) {
    columns.push(...table[key]?.map((col) => col?.name));
  }
  return columns;
}
const List = () => {
  const params = useParams();
  const { name } = params;
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(name || "");
  const [activeStage, setActiveStage] = useState("");
  const [fields, setFields] = useState([]);
  const [columns, setColumns] = useState([]);
  // Get data
  let singleList = useMemo(() => getForm(name), [name]);
  const forms = singleList?.forms;
  const steps = singleList?.steps;
  // storage data
  let data = [];
  // check if form is more then step
  const check = () => {
    if (steps?.length) {
      console.log(".....", forms, steps);
      setActiveStage(steps?.[0]);
      console.log(forms[steps?.[0]]);
      setFields(forms[steps?.[0]]);
      console.log(fields);
      setColumns(getAllColumns(forms));
    } else {
      setColumns(getColumns(singleList));
      setFields(singleList);
    }
  };
  useEffect(() => {
    check();
  }, []);

  // Handel Submit
  const onSubmit = async (values) => {
    let body = {
      dat: values,
      columns: Object.keys(values),
      table: "account",
    };
    let result = await fetch(`http://localhost:3001/create`, {
      method: "POST",
      body,
    });
  };

  const changeTab = (tabName) => {
    setTab(tabName);
    setFields(forms[tabName]);
    setActiveStage(tabName);
  };
  console.log(columns);
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex items-center mb-8 text-left">
          {steps?.length ? (
            <>
              {steps?.map((step, index) => (
                <button
                  onClick={() => changeTab(step)}
                  key={step}
                  className={`${
                    activeStage === step ? "border-blue-500 !text-blue-500" : ""
                  } bg-blue-100 dark:bg-bgmaindark  p-2 flex-1 font-medium capitalize whitespace-nowrap`}
                >
                  {step}
                </button>
              ))}
            </>
          ) : (
            <button
              className={` p-2 flex-1 font-medium capitalize border-l-4  text-left text-lg !text-blue-500 bg-blue-50 border-blue-500 `}
            >
              {name}
            </button>
          )}
        </div>
        <SuperForm initialFields={fields} onSubmit={onSubmit} />
      </Modal>
      <BlockPaper title={name}>
        <TableBar onAddClick={() => setOpen(true)} />
        {!!columns ? <SuperTable columns={columns} data={data} /> : null}
      </BlockPaper>
    </>
  );
};

export default List;
