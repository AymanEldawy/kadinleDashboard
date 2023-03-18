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

function getForm(form) {
  return formsApi[form];
}
function getColumns(table) {
  return table?.map((col) => col.name);
}

const List = () => {
  const steps = true;
  const params = useParams();
  const { name } = params;
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(name || "");

  // Get data
  let singleList = useMemo(() => getForm(name), [name]);
  let columns = useMemo(() => getColumns(form), [name]);
  let data = [];

  // Handel Submit
  const onSubmit = async (values) => {
    let body = {
      dat: values,
      columns: Object.keys(values),
      table: "account",
    };
    console.log(body, "body");
    let result = await fetch(`http://localhost:3001/create`, {
      method: "POST",
      body,
    });
    console.log(result);
  };

  useEffect(() => {
    return () => {
      form = []; // clean up form
    };
  });
  const changeTab = (tabName) => {
    setTab(tabName);
  };
  console.log(form);
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex items-center mb-8 text-left">
          {steps ? (
            <button
              className={` bg-blue-100 dark:bg-bgmaindark !text-blue-500 text-left border-l-4 text-lg border-blue-500 p-2 flex-1 font-medium capitalize`}
            >
              {name}
            </button>
          ) : (
            <button
              className={` bg-gray-100 p-2 flex-1 font-medium text-base text-gray-500 capitalize ${
                tab === "landcontract"
                  ? "!text-blue-500 border-t-2 border-blue-500 !bg-transparent"
                  : ""
              }`}
              onClick={() => changeTab("landcontract")}
            >
              landcontract
            </button>
          )}
        </div>
        <SuperForm initialFields={form} onSubmit={onSubmit} />
      </Modal>
      <BlockPaper title={name}>
        <TableBar onAddClick={() => setOpen(true)} />
        <SuperTable columns={columns} data={data} />
      </BlockPaper>
    </>
  );
};

export default List;
