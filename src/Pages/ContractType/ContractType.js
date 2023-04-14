import axios from "axios";
import React, { useContext } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
import SuperForm from "../../Components/CustomForm/SuperForm";
import FormHeadingTitle from "../../Components/Global/FormHeadingTitle";
import Modal from "../../Components/Modal/Modal";
import { AlertContext } from "../../Context/AlertContext";
import { ListsGuidsContext } from "../../Context/ListsGuidsContext";
import formsApi from "../../Helpers/Forms/formsApi";

const CACHE_LIST = {};
const getCachedList = (tableName) => {
  return CACHE_LIST[tableName];
};
const ContractType = () => {
  const [index, setIndex] = useState();
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allValues, setAllValues] = useState({});
  const [childrenValues, setChildrenValues] = useState({});
  const { alertMessage, dispatchAlert } = useContext(AlertContext);
  const [openModalForm, setOpenModalForm] = useState(false);

  // Get data
  let singleList = useMemo(() => formsApi["contracttype"], []);
  useEffect(() => {
    setFields(singleList);
  }, []);

  // Handel Submit
  const onSubmit = async (values) => {
    setAllValues((prev) => {
      return {
        ...prev,
        ...values,
      };
    });
    let body = {
      dat: allValues,
      children: childrenValues,
      columns: Object.keys(allValues),
      table: "LeaseApartment",
    };
    let res = await axios.post(`/create`, {
      ...body,
    });
    // if (res?.statusText === "OK") {
    //   dispatchAlert({
    //     open: true,
    //     type: "success",
    //     msg: "Added Successfully...",
    //   });
    // } else {
    // }
  };

  return (
    <BlockPaper title={"ContractType"}>
      <SuperForm
        oldValues={allValues}
        initialFields={fields}
        onSubmit={onSubmit}
      />
    </BlockPaper>
  );
};

export default ContractType;
