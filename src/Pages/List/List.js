import axios from "axios";
import React, { useContext } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
import SuperForm from "../../Components/CustomForm/SuperForm";
import SuperTable from "../../Components/CustomTable/SuperTable";
import FormHeadingTitleSteps from "../../Components/Global/FormHeadingTitleSteps";
import Modal from "../../Components/Modal/Modal";
import { TableBar } from "../../Components/TableBar/TableBar";
import { AlertContext } from "../../Context/AlertContext";
import { ListsGuidsContext } from "../../Context/ListsGuidsContext";
import formsApi from "../../Helpers/Forms/formsApi";
import { generateApartments } from "../../Helpers/functions";

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
const CACHE_LIST = {};
const getCachedList = (tableName) => {
  return CACHE_LIST[tableName];
};
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
  const { dispatchAlert } = useContext(AlertContext);
  const [reffedTables, setReffedTables] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  // const {} = useContext()
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [searchKey, setSearchKey] = useState("Name");
  const [selectedList, setSelectedList] = useState({});

  // Get data
  let singleList = useMemo(() => getForm(name?.toLowerCase()), [name]);
  const forms = singleList?.forms;
  const steps = singleList?.steps;

  // check if form is more then step
  const check = useCallback(() => {
    if (steps?.length) {
      setActiveStage(steps?.[0]);
      setFields(forms[steps?.[0]]);
      setColumns(getAllColumns(forms));
    } else {
      setColumns(getColumns(singleList));
      setFields(singleList);
    }
    setSearchKey(columns.includes("Name") ? "Name" : columns[0]);
  }, [name]);
  //
  const getLists = async (tableName) => {
    await axios
      .post(`/list`, {
        table: tableName,
      })
      .then((res) => {
        CACHE_LIST[tableName] = res?.data?.recordset;
      });
  };
  const getRefData = async () => {
    await axios
      .post(`/checkref`, {
        table: name,
      })
      .then((res) => {
        let data = res?.data?.recordset;
        if (data) {
          let collect = {};
          for (const item of data) {
            if (item?.reffedTables !== name) {
              getLists(item?.Referenced_Table);
            } else {
              CACHE_LIST[name] = data;
            }
            collect[item?.Column] = item?.Referenced_Table;
          }
          setReffedTables(collect);
        }
      });
  };

  const getData = async () => {
    setLoading(true);
    await axios
      .post(`/list`, {
        table: name,
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        setData(res?.data?.recordset);
      });
    setLoading(false);
  };

  useEffect(() => {
    check();
    getData();
    getRefData();
  }, [name]);

  // Handel Submit
  const onSubmit = async (values) => {
    if (steps && activeStage !== steps[steps?.length - 1]) return;
    setOpen(false);
    dispatchAlert({
      open: true,
      type: "loading",
      msg: "Loading ...",
    });
    let body = {
      dat: values,
      columns: Object.keys(values),
      table: name,
    };
    let res = await axios.post(`/create`, {
      ...body,
    });
    console.log(res);
    if (res?.statusText === "OK") {
      dispatchAlert({
        open: true,
        type: "success",
        msg: "Added Successfully...",
      });
      getData();
    } else {
    }
  };

  const deleteItem = async () => {
    await axios
      .post(`/delete`, {
        table: name,
        guids: Object.keys(selectedList),
      })
      .then((res) => {
        getData();
      });
    setOpenConfirmation(false);
  };

  // handel Tabs
  const changeTab = useCallback(
    (tabName) => {
      setTab(tabName);
      setFields(forms[tabName]);
      setActiveStage(tabName);
    },
    [activeStage, fields, tab]
  );

  const goNext = useCallback(() => {
    let index = steps.indexOf(activeStage);
    if (index !== steps?.length) {
      setActiveStage(steps?.[index + 1]);
      setFields(forms[steps?.[index + 1]]);
    } else return;
  }, [fields, activeStage]);

  const goBack = useCallback(() => {
    let index = steps.indexOf(activeStage);
    if (index > 0) {
      setActiveStage(steps?.[index - 1]);
      setFields(forms[steps?.[index - 1]]);
    } else return;
  }, [fields, activeStage]);

  return (
    <>
      <ConfirmModal
        onConfirm={deleteItem}
        open={openConfirmation}
        setOpen={setOpenConfirmation}
      />
      <Modal open={open} onClose={() => setOpen(false)}>
        <FormHeadingTitleSteps
          name={name}
          steps={steps}
          changeTab={changeTab}
          activeStage={activeStage}
        />
        <div className="h-5" />
        <SuperForm
          getCachedList={!!getCachedList ? getCachedList : undefined}
          allowSteps={steps?.length}
          initialFields={fields}
          onSubmit={onSubmit}
          goBack={goBack}
          goNext={
            steps?.length - 1 == steps?.indexOf(activeStage)
              ? undefined
              : goNext
          }
        />
      </Modal>
      <BlockPaper title={name}>
        <TableBar
          onDeleteClick={() => setOpenConfirmation(true)}
          onAddClick={() => setOpen(true)}
          onSearchChange={setSearchValue}
          searchValue={searchValue}
          onSelectChange={setItemsPerPage}
          itemsPerPage={itemsPerPage}
          selectedList={selectedList}
          // columns={columns}
          // searchKey={searchKey}
          // setSearchKey={setSearchKey}
        />
        {!!columns && !loading ? (
          <SuperTable
            reffedTables={reffedTables}
            table={name}
            itemsPerPage={itemsPerPage}
            deleteItem={deleteItem}
            columns={columns}
            data={data}
            allowSelect
            searchKey={searchKey}
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
