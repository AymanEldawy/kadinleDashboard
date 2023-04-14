import axios from "axios";
import React, { useContext } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import SuperForm from "../../Components/CustomForm/SuperForm";
import FormHeadingTitleSteps from "../../Components/Global/FormHeadingTitleSteps";
import { AlertContext } from "../../Context/AlertContext";
import formsApi from "../../Helpers/Forms/formsApi";
import { generateApartments } from "../../Helpers/functions";
import Layout from "../../Layout";

function getForm(form) {
  return formsApi[form];
}
const Update = () => {
  const params = useParams();
  const location = useLocation();
  const { name, id } = params;
  const { row, table } = location?.state;
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(name || "");
  const [activeStage, setActiveStage] = useState("");
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const { alertMessage, dispatchAlert } = useContext(AlertContext);
  // Get data
  let singleList = useMemo(() => getForm(name?.toLowerCase()), [name]);
  const forms = singleList?.forms;
  const steps = singleList?.steps;
  // check if form is more then step
  const check = () => {
    if (steps?.length) {
      setActiveStage(steps?.[0]);
      setFields(forms[steps?.[0]]);
    } else {
      setFields(singleList);
    }
  };

  useEffect(() => {
    check();
  }, [name]);

  // Handel Submit
  const onSubmit = async (values) => {
    let newValues = {};
    for (const key in values) {
      if (values[key] !== null) {
        newValues[key] = values[key];
      }
    }
    delete newValues["Number"];
    delete newValues["Guid"];
    let columns = Object.keys(newValues);

    let body = {
      dat: newValues,
      columns,
      table: name,
      num: id,
    };

    let res = await axios.post(`/update`, {
      ...body,
    });
    if (res?.statusText === "OK") {
      dispatchAlert({
        open: true,
        type: "success",
        msg: "Added Successfully...",
      });
      if (name?.toLowerCase() === "building") {
        generateApartments(values, res?.data);
      }
      setOpen(false);
    } else {
    }
  };
  const changeTab = (tabName) => {
    setTab(tabName);
    setFields(forms[tabName]);
    setActiveStage(tabName);
  };

  const goNext = () => {
    let index = steps.indexOf(activeStage);
    if (index !== steps?.length) {
      setActiveStage(steps?.[index + 1]);
      setFields(forms[steps?.[index + 1]]);
    } else return;
  };
  const goBack = () => {
    let index = steps.indexOf(activeStage);
    if (index > 0) {
      setActiveStage(steps?.[index - 1]);
      setFields(forms[steps?.[index - 1]]);
    } else return;
  };
  return (
    <BlockPaper title={name}>
      <FormHeadingTitleSteps
        name={name}
        steps={steps}
        changeTab={changeTab}
        activeStage={activeStage}
      />
      <div className="h-5" />
      {!!row ? (
        <SuperForm
          oldValues={row}
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
      ) : null}
    </BlockPaper>
  );
};

export default Update;
