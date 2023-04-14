import axios from "axios";
import React, { useContext } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import SuperForm from "../../Components/CustomForm/SuperForm";
import SuperTable from "../../Components/CustomTable/SuperTable";
import TableForm from "../../Components/Forms/TableForm/TableForm";
import { Button } from "../../Components/Global/Button";
import FormHeadingTitleSteps from "../../Components/Global/FormHeadingTitleSteps";
import Modal from "../../Components/Modal/Modal";
import { TableBar } from "../../Components/TableBar/TableBar";
import { AlertContext } from "../../Context/AlertContext";
import formsApi from "../../Helpers/Forms/formsApi";
import Layout from "../../Layout";

const LeaseApartment = () => {
  const params = useParams();
  const { name } = params;
  const [tab, setTab] = useState(name || "");
  const [activeStage, setActiveStage] = useState("");
  const [index, setIndex] = useState();
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allValues, setAllValues] = useState({});
  const [childrenValues, setChildrenValues] = useState({});
  const { alertMessage, dispatchAlert } = useContext(AlertContext);
  const [openModalForm, setOpenModalForm] = useState(false);

  // Get data
  let singleList = useMemo(() => formsApi["leaseapartment"], [name]);
  const steps = singleList?.steps;
  const forms = singleList?.forms;
  useEffect(() => {
    setActiveStage(steps[0]);
    setFields(forms?.[steps?.[0]]);
  }, [steps]);

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

  const onPopupFormSubmit = (values) => {
    setChildrenValues((prev) => {
      return {
        ...prev,
        [activeStage]: {
          ...childrenValues?.[activeStage],
          [index]: values,
        },
      };
    });
    setOpenModalForm(false);
  };
  const onFormTableSubmit = (values) => {
    setChildrenValues((prev) => {
      return {
        ...prev,
        [activeStage]: {
          ...values,
        },
      };
    });
  };

  // Handel Submit
  const onSubmit = async (values) => {
    setAllValues((prev) => {
      return {
        ...prev,
        ...values,
      };
    });
    if (activeStage === steps[steps.length - 1]) {
      let body = {
        dat: allValues,
        children: childrenValues,
        columns: Object.keys(allValues),
        table: "LeaseApartment",
      };
      let res = await axios.post(`/create`, {
        ...body,
      });
    }
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
    <BlockPaper title={name}>
      <div className="flex items-center text-left overflow-auto">
        <FormHeadingTitleSteps
          steps={steps}
          changeTab={changeTab}
          activeStage={activeStage}
          name={name}
        />
      </div>
      <div className="h-5" />
      {activeStage === "payments" ||
      activeStage === "Related parking contracts" ||
      activeStage === "Other fees" ||
      activeStage === "Termination fines" ||
      activeStage === "Log file" ? (
        <>
          <Modal open={openModalForm} onClose={() => setOpenModalForm(false)}>
            <SuperForm initialFields={fields} onSubmit={onPopupFormSubmit} />
          </Modal>
          <TableForm
            rowLength={10}
            steps={steps}
            initialFields={fields}
            onOpen={() => setOpenModalForm(true)}
            setIndex={setIndex}
            oldValues={childrenValues?.[activeStage]}
            onSubmit={onFormTableSubmit}
            goBack={goBack}
            goNext={
              steps?.length - 1 == steps?.indexOf(activeStage)
                ? undefined
                : goNext
            }
          />
        </>
      ) : (
        <SuperForm
          oldValues={allValues}
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
      )}
    </BlockPaper>
  );
};

export default LeaseApartment;
