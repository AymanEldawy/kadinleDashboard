import React, { useContext } from "react";
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
import axios from "axios";
import { AlertContext } from "../../Context/AlertContext";

function getForm(form) {
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
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { alertMessage, dispatchAlert } = useContext(AlertContext);
  const [selectedList, setSelectedList] = useState({});
  // Get data
  let singleList = useMemo(() => getForm(name), [name]);
  const forms = singleList?.forms;
  const steps = singleList?.steps;
  // storage data
  // check if form is more then step
  const check = () => {
    if (steps?.length) {
      setActiveStage(steps?.[0]);
      setFields(forms[steps?.[0]]);
      setColumns(getAllColumns(forms));
    } else {
      setColumns(getColumns(singleList));
      setFields(singleList);
    }
  };
  const getData = async () => {
    setLoading(true);
    await axios
      .post(`/list`, {
        table: name,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setData(res?.data?.recordset);
      });
    setLoading(false);
  };
  useEffect(() => {
    check();
    getData();
  }, [name]);

  // Handel Submit
  const onSubmit = async (values) => {
    let body = {
      dat: values,
      columns: Object.keys(values),
      table: name,
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
      // setTimeout(() => )
      setOpen(false);
    } else {
    }
  };

  const deleteItem = async () => {
    console.log(selectedList);
    setLoading(true);
    // for (const item of Object.keys(selectedList)) {
      await axios
        .post(`/delete`, {
          table: name,
          Guid: +item,
        })
        .then((res) => {
          console.log(res);
          setLoading(false);
        });
    // }
    setLoading(false);
  };
  const changeTab = (tabName) => {
    setTab(tabName);
    setFields(forms[tabName]);
    setActiveStage(tabName);
  };
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
              className={` p-2 flex-1 font-medium capitalize border-l-4 dark:bg-borderdark text-left text-lg !text-blue-500 bg-blue-50 border-blue-500 `}
            >
              {name}
            </button>
          )}
        </div>
        <SuperForm initialFields={fields} onSubmit={onSubmit} />
      </Modal>
      <BlockPaper title={name}>
        <TableBar
          onDeleteClick={deleteItem}
          onAddClick={() => setOpen(true)}
          onSearchChange={setSearchValue}
          searchValue={searchValue}
        />
        {!!columns && !loading ? (
          <SuperTable
            deleteItem={deleteItem}
            columns={columns}
            data={data}
            allowSelect
            searchValue={searchValue}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        ) : null}
      </BlockPaper>
    </>
  );
};

export default List;
