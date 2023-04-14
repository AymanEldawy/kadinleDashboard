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
// import { checkApartments, generateApartments } from "../../Helpers/functions";

// Cache apartments
const REQUIRED_COLUMNS_TO_CACHE = {
  ApartmentCountOfFloor: { col: "ApartmentCountOfFloor", updated: false },
  FloorCount: { col: "FloorCount", updated: false },
  BHouseFloor: { col: "BHouseFloor", updated: false },
  MBalanceFloor: { col: "MBalanceFloor", updated: false },
  BHouseFlatCount: { col: "BHouseFlatCount", updated: false },
  MBalanceFlatCount: { col: "MBalanceFlatCount", updated: false },
  OfficeCount: { col: "OfficeCount", updated: false },
  OfficeFloor: { col: "OfficeFloor", updated: false },
  ParkingCount: { col: "ParkingCount", updated: false },
  ParkingFloor: { col: "ParkingFloor", updated: false },
  ParkingCountUnder: { col: "ParkingCountUnder", updated: false },
  ParkingFloorUnder: { col: "ParkingFloorUnder", updated: false },
  ShopCount: { col: "ShopCount", updated: false },
  FlatDriverCount: { col: "FlatDriverCount", updated: false },
  FlatServantCount: { col: "FlatServantCount", updated: false },
};
const CACHE_APARTMENTS = {};

const insertIntoCache = (row) => {
  if (!row?.Guid) return;
  for (const key in row) {
    if (REQUIRED_COLUMNS_TO_CACHE[key]) {
      CACHE_APARTMENTS[key] = row[key];
    }
  }
};
const UpdateBuilding = () => {
  const params = useParams();
  const location = useLocation();
  const { name, id } = params;
  const { row } = location?.state;
  //   const [tab, setTab] = useState(name || "");
  const [activeStage, setActiveStage] = useState("");
  const [fields, setFields] = useState([]);
  const { dispatchAlert } = useContext(AlertContext);
  // Get data
  let singleList = formsApi["building"];
  const forms = singleList?.forms;
  const steps = singleList?.steps;
  // check if form is more then step

  useEffect(() => {
    if (steps?.length) {
      setActiveStage(steps?.[0]);
      setFields(forms[steps?.[0]]);
    } else {
      setFields(singleList);
    }
    insertIntoCache(row);
    console.log(CACHE_APARTMENTS);
  }, [row, forms, steps, singleList]);
  // Handel Submit
  const onSubmit = async (values) => {
    if (steps && activeStage !== steps[steps?.length - 1]) return;
    let newValues = {};
    for (const key in values) {
      if (REQUIRED_COLUMNS_TO_CACHE[key]) {
        console.log(CACHE_APARTMENTS[key], values[key]);
        // eslint-disable-next-line eqeqeq
        if (CACHE_APARTMENTS[key] != values[key]) {
          REQUIRED_COLUMNS_TO_CACHE[key].updated = true;
          REQUIRED_COLUMNS_TO_CACHE[key].oldValue = +CACHE_APARTMENTS[key];
          REQUIRED_COLUMNS_TO_CACHE[key].newValue = +values[key];
        } else {
          delete REQUIRED_COLUMNS_TO_CACHE[key];
        }
      }
      if (values[key] !== null) {
        newValues[key] = values[key];
      }
    }
    // checkApartments(REQUIRED_COLUMNS_TO_CACHE, row?.Guid);
    console.log(REQUIRED_COLUMNS_TO_CACHE);
    delete newValues["Number"];
    delete newValues["Guid"];
    let columns = Object.keys(newValues);
    let body = {
      dat: newValues,
      columns,
      table: name,
      num: id,
    };

    // let res = await axios.post(`/update`, {
    //   ...body,
    // });

    // if (res?.statusText === "OK") {
    //   dispatchAlert({
    //     open: true,
    //     type: "success",
    //     msg: "Update Successfully...",
    //   });
    // } else {
    // }
  };
  const changeTab = (tabName) => {
    // setTab(tabName);
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
            steps?.length - 1 === steps?.indexOf(activeStage)
              ? undefined
              : goNext
          }
        />
      ) : null}
    </BlockPaper>
  );
};

export default UpdateBuilding;
