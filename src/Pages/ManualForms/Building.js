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

const Building = () => {
  const params = useParams();
  const { name } = params;
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(name || "");
  const [activeStage, setActiveStage] = useState("");
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const { alertMessage, dispatchAlert } = useContext(AlertContext);

  // Get data
  let singleList = useMemo(() => formsApi["building"], [name]);
  const forms = singleList?.forms;
  const steps = singleList?.steps;
  console.log(steps)
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
      setOpen(false);
    } else {
    }
  };

  const changeTab = (tabName) => {
    setTab(tabName);
    setFields(forms[tabName]);
    setActiveStage(tabName);
  };
  return (
    <BlockPaper title={name}>
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
    </BlockPaper>
  );
};

export default Building;
