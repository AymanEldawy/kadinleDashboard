import React, { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "../Global/Button";
import CheckboxField from "./CheckboxField";
import Field from "./Field";
import InputField from "./InputField";
import RadioField from "./RadioField";
import SelectField from "./SelectField";

const SuperForm = ({
  onSubmit,
  initialFields,
  goBack,
  goNext,
  allowSteps,
  oldValues,
  getCachedList,
}) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  // Clean up component
  const location = useLocation();
  useEffect(() => {
    setErrors({});
    setTouched({});
    if (oldValues) {
      setValues(oldValues);
    } else {
      setValues({});
    }
  }, [location?.pathname, oldValues]);
  // useEffect(() => {
  //   if (oldValues) {
  //     setValues(oldValues);
  //   }
  // }, [oldValues]);

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
      if (goNext) {
        goNext();
      }
    }
  };
  return (
    <form onSubmit={submit} className="mb-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {!!initialFields
          ? initialFields?.map((field, i) => {
              if (field?.key === "input") {
                return (
                  <InputField
                    value={values?.[field?.name]}
                    key={`${field?.name}`}
                    type={field?.type}
                    name={field?.name}
                    label={field?.label}
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
              } else if (field?.key === "unique") {
                return (
                  <Field
                    value={values?.[field?.name]}
                    table={field?.table}
                    key={`${field?.name}`}
                    list={!!getCachedList ? getCachedList(field?.table) : []}
                    type={field?.type}
                    label={field?.label}
                    name={field?.name}
                    onFocus={() => onTouched(field?.name)}
                    required={field?.required}
                    getSelectedValue={handelChangeField}
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
                    label={field?.label}
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
              } else {
                return (
                  <InputField
                    value={values?.[field?.name]}
                    key={`${field?.name}`}
                    name={field?.name}
                    type={field?.type}
                    label={field?.label}
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
        {allowSteps ? (
          <Button title="Back" onClick={goBack} type="button" />
        ) : null}
        {!!goNext && allowSteps ? (
          <Button type="button" title="Next" onClick={submit} />
        ) : (
          <Button type="submit" title="Submit" />
        )}
      </div>
    </form>
  );
};

export default memo(SuperForm);
