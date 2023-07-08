import React, { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";
import { Button } from "../Global/Button";
import CheckboxField from "./CheckboxField";
import Field from "./Field";
import InputField from "./InputField";
import RadioField from "./RadioField";
import SelectField from "./SelectField";

let CACHED_TABLE = {};

const SuperForm = ({ onSubmit, initialFields, oldValues, resetForm }) => {
  const { getData } = useFetch();

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  // Clean up component
  const location = useLocation();
  useEffect(() => {
    checkRefTable(initialFields);
  }, [initialFields]);
  async function checkRefTable(fields) {
    console.log(fields);
    if (!fields?.length) return;
    for (const field of fields) {
      if (field.key === "ref") {
        const data = await getData(field?.tableName);
        CACHED_TABLE[field?.tableName] = data;
      }
    }
  }
  console.log(CACHED_TABLE);

  useEffect(() => {
    if (resetForm) {
      setValues({});
      setErrors({});
      setTouched({});
    }
  }, [resetForm]);
  useEffect(() => {
    setErrors({});
    setTouched({});
    if (oldValues) {
      setValues(oldValues);
    } else {
      setValues({});
    }
  }, [location?.pathname, oldValues]);

  const getCachedList = (tableName) => {
    console.log(tableName);
    return CACHED_TABLE?.[tableName];
  };

  const insertIntoErrors = (name, value) => {
    if (value === "") {
      setErrors((prev) => {
        return {
          ...prev,
          [name]: "Field is required",
        };
      });
    } else {
      let newErrors = errors;
      delete newErrors[name];
      setErrors(newErrors);
    }
  };
  const onTouched = (name) => {
    if (touched[name]) return;
    setTouched((prev) => {
      return {
        ...prev,
        [name]: true,
      };
    });
  };
  const handelChangeField = (name, value, required) => {
    if (required) {
      insertIntoErrors(name, value);
    }
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const submit = (e) => {
    e.preventDefault();
    if (!errors.length) {
      onSubmit(values);
    }
  };
  return (
    <form onSubmit={submit} className="mb-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {!!initialFields
          ? initialFields?.map((field, i) => {
              if (field?.name === "id" || field?.hide_in_add_form) return null;
              if (field?.key === "input") {
                return (
                  <InputField
                    value={values?.[field?.name]}
                    key={`${field?.name}`}
                    type={field?.type}
                    name={field?.name}
                    label={field?.name}
                    onFocus={() => onTouched(field?.name)}
                    required={field?.required}
                    error={
                      touched[field?.name] && errors[field?.name]
                        ? errors[field?.name]
                        : null
                    }
                    onChange={(e) =>
                      handelChangeField(
                        field?.name,
                        e.target.value,
                        field?.required
                      )
                    }
                  />
                );
              } else if (field?.key === "ref") {
                return (
                  <SelectField
                    key={`${field?.name}`}
                    value={values?.[field?.name]}
                    label={field?.name}
                    list={
                      !!getCachedList ? getCachedList(field?.tableName) : []
                    }
                    keyLabel={field?.refName || "name"}
                    name={field?.name}
                    required={field?.required}
                  />
                );
              } else if (field?.key === "radio") {
                return (
                  <RadioField
                    defaultChecked={values?.[field?.name]}
                    key={`${field?.name}`}
                    label={field?.label}
                    name={field?.name}
                    required={field?.required}
                    onFocus={() => onTouched(field?.name)}
                    error={
                      touched[field?.name] && errors[field?.name]
                        ? errors[field?.name]
                        : null
                    }
                    list={field?.list}
                    onChange={(e) =>
                      handelChangeField(
                        field?.name,
                        e.target.value,
                        field?.required
                      )
                    }
                  />
                );
              } else if (field?.key === "select") {
                return (
                  <SelectField
                    defaultValue={values?.[field?.name]}
                    key={`${field?.name}`}
                    name={field?.name}
                    label={field?.name}
                    onFocus={() => onTouched(field?.name)}
                    required={field?.required}
                    list={field?.list}
                    error={
                      touched[field?.name] && errors[field?.name]
                        ? errors[field?.name]
                        : null
                    }
                    onChange={(e) =>
                      handelChangeField(
                        field?.name,
                        e.target.value,
                        field?.required
                      )
                    }
                  />
                );
              } else if (field?.key === "checkbox") {
                return (
                  <CheckboxField
                    defaultChecked={values?.[field?.name]}
                    key={`${field?.name}`}
                    label={field?.name}
                    name={field?.name}
                    required={field?.required}
                    onFocus={() => onTouched(field?.name)}
                    error={
                      touched[field?.name] && errors[field?.name]
                        ? errors[field?.name]
                        : null
                    }
                    list={field?.list}
                    onChange={(e) =>
                      handelChangeField(
                        field?.name,
                        e.target.value,
                        field?.required
                      )
                    }
                  />
                );
              } else {
                return (
                  <InputField
                    value={values?.[field?.name]}
                    key={`${field?.name}`}
                    name={field?.name}
                    type={field?.type}
                    label={field?.name}
                    onFocus={() => onTouched(field?.name)}
                    required={field?.required}
                    error={
                      touched[field?.name] && errors[field?.name]
                        ? errors[field?.name]
                        : null
                    }
                    onChange={(e) =>
                      handelChangeField(
                        field?.name,
                        e.target.value,
                        field?.required
                      )
                    }
                  />
                );
              }
            })
          : null}
      </div>
      <div className="flex justify-between gap-4 items-center">
        <Button type="submit" title="Submit" />
      </div>
    </form>
  );
};

export default SuperForm;
