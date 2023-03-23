import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CheckboxField from "./CheckboxField";
import Field from "./Field";
import InputField from "./InputField";
import RadioField from "./RadioField";
import SelectField from "./SelectField";

const SuperForm = ({ onSubmit, initialFields, goBack, goNext }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  // Clean up component
  const location = useLocation();
  useEffect(() => {
    setErrors({});
    setTouched({});
    setValues({});
  }, [location?.pathname]);

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
  const handelChangeField = (name, value) => {
    insertIntoErrors(name, value);
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {initialFields?.map((field, i) => {
          if (field?.key === "input") {
            return (
              <InputField
                key={`${field?.name}-${i}`}
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
                onChange={(e) => handelChangeField(field?.name, e.target.value)}
              />
            );
          } else if (field?.key === "unique") {
            return (
              <Field
                table={field?.table}
                key={`${field?.name}-${i}`}
                list={field?.list}
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
                key={`${field?.name}-${i}`}
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
                onChange={(e) => handelChangeField(field?.name, e.target.value)}
              />
            );
          } else if (field?.key === "select") {
            return (
              <SelectField
                key={`${field?.name}-${i}`}
                name={field?.name}
                label={field?.label}
                onFocus={() => onTouched(field?.name)}
                required={field?.required}
                list={field?.list}
                keyLabel={field?.keyLabel ? field?.keyLabel : "name"}
                keyValue={field?.keyValue ? field?.keyValue : "id"}
                error={
                  touched[field?.name] && errors[field?.name]
                    ? errors[field?.name]
                    : null
                }
                onChange={(e) => handelChangeField(field?.name, e.target.value)}
              />
            );
          } else if (field?.key === "checkbox") {
            return (
              <CheckboxField
                key={`${field?.name}-${i}`}
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
                onChange={(e) => handelChangeField(field?.name, e.target.value)}
              />
            );
          } else {
            return (
              <InputField
                key={`${field?.name}-${i}`}
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
                onChange={(e) => handelChangeField(field?.name, e.target.value)}
              />
            );
          }
        })}
      </div>
      {!!goNext ? (
        <div className="flex justify-between gap-4 items-center">
          <button
            type="button"
            className="rounded-md px-4 py-2 bg-blue-500 text-sm font-medium text-white "
            onClick={goBack}
          >
            prev
          </button>
          <button
            type="button"
            className="rounded-md px-4 py-2 bg-blue-500 text-sm font-medium text-white "
            onClick={goNext}
          >
            Next
          </button>
        </div>
      ) : (
        <button className="rounded-md px-4 py-2 bg-blue-500 text-sm font-medium text-white ">
          Submit
        </button>
      )}
    </form>
  );
};

export default SuperForm;
