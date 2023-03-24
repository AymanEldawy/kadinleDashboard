import React, { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import Layout from "../../Layout";
import formsApi from "../../Helpers/Forms/formsApi";
import SuperForm from "../../Components/CustomForm/SuperForm";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { AlertContext } from "../../Context/AlertContext";

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
  console.log(row, table);
  let singleList = useMemo(() => getForm(name), [name]);
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
    let body = {
      dat: values,
      columns: Object.keys(values),
      table: name,
      num: id
    };
    let res = await axios.post(`/update`, {
      ...body,
    });
    console.log(res)
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

  const deleteItem = async () => {
    //   console.log(selectedList);
    //   setLoading(true);
    //   // for (const item of Object.keys(selectedList)) {
    //   await axios
    //     .post(`/delete`, {
    //       table: name,
    //       Guid: +item,
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       setLoading(false);
    //     });
    //   // }
    //   setLoading(false);
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
