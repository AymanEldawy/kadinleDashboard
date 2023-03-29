import React from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import Layout from "../../../Layout";
import BlockPaper from "../../BlockPaper/BlockPaper";
import Field from "../../CustomForm/Field";
import InputField from "../../CustomForm/InputField";
import TestEntryFormTable from "./TestEntryFormTable";

const readOnlyValues = {
  Credit: "",
  Debit: "",
  CurrencyGuid: "",
  CurrencyVal: "",
  Note: "",
  Date: "",
  Difference: "",
  Number: "",
};
let hashIndex = {};
const updateReadonlyValues = (index, name, value, setRefresh) => {
  let newValue = 0;
  let oldValue = 0;
  if (!hashIndex[`${name}-${index}`]) {
    hashIndex[`${name}-${index}`] = value; // story key value
    newValue = value;
  } else {
    oldValue = hashIndex[`${name}-${index}`]; // store old value
    hashIndex[`${name}-${index}`] = value; // reset key value
    newValue = value - oldValue;
  }

  if (!isNaN(parseInt(newValue))) {
    readOnlyValues[name] = +readOnlyValues[name] + parseInt(newValue);
    readOnlyValues["Difference"] =
      readOnlyValues["Debit"] - readOnlyValues["Credit"];
    setRefresh((prev) => !prev);
  }
};

const TestEntry = () => {
  const [refresh, setRefresh] = useState(false);
  const [entries, setEntries] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    console.log("render");
  }, [refresh]);
  const handelChangeField = (name, value) => {
    readOnlyValues[name] = value;
  };
  const handelChangeFieldBlur = (index, name, value) => {
    updateReadonlyValues(index, name, value, setRefresh);
  };

  const handelChangeEntriesField = (index, name, value) => {
    setEntries((prev) => {
      return {
        ...prev,
        [index]: { ...prev?.[index], [name]: value },
      };
    });
  };
  return (
    <BlockPaper title="CREATE NEW DENTRY">
      {/* Form */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-4">
        <InputField
          name="date"
          type="date"
          label="Date"
          onChange={(e) => handelChangeField("date", e.target.value)}
        />
        <Field
          table="Currency"
          name="CurrencyGuid"
          label="Currency Guid"
          list={[]}
          required={true}
          handelChangeField={handelChangeField}
        />
        <InputField
          name="CurrencyVal"
          type="number"
          label="Currency Value"
          onChange={(e) => handelChangeField("CurrencyVal", e.target.value)}
        />
        <InputField
          name="Note"
          type="text"
          label="Note"
          onChange={(e) => handelChangeField("Note", e.target.value)}
        />
      </div>
      <TestEntryFormTable
        handelChangeFieldBlur={handelChangeFieldBlur}
        handelChangeEntriesField={handelChangeEntriesField}
      />
      <div className=" mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-4">
        <InputField
          name="Credit"
          type="Credit"
          label="Credit"
          value={readOnlyValues?.Credit}
          readOnly
        />
        <InputField
          name="Debit"
          type="Debit"
          label="Debit"
          value={readOnlyValues?.Debit}
          readOnly
        />
        <InputField
          name="Difference"
          type="Difference"
          label="Difference"
          value={readOnlyValues?.Difference}
          readOnly
        />
        <InputField
          name="Number"
          type="Number"
          label="Number"
          value={readOnlyValues?.Number}
          readOnly
        />
      </div>
      <button className="mt-4 rounded-md px-4 py-2 bg-blue-500 text-sm font-medium text-white ">
        Submit
      </button>{" "}
    </BlockPaper>
  );
};

export default TestEntry;
