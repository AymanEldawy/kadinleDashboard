import React, { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useFetch } from "../../hooks/useFetch";
import { Button } from "../Global/Button";
import CheckboxField from "./CheckboxField";
import InputField from "./InputField";
import RadioField from "./RadioField";
import SelectField from "./SelectField";
import UploadFile from "./UploadFile";

let CACHED_TABLE = {};

const SuperForm = ({
  initialFields,
  oldValues,
  resetForm,
  layout,
  values,
  setValues,
  errors,
  setErrors,
}) => {
  const { getData } = useFetch();
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  // Clean up component
  const location = useLocation();
  useEffect(() => {
    checkRefTable(initialFields);
  }, [initialFields]);
  async function checkRefTable(fields) {
    let loading = toast.loading("Loading ...");
    setLoading(true);
    if (!fields?.length) return;
    for (const field of fields) {
      if (field.key === "ref") {
        const data = await getData(field?.tableName);
        CACHED_TABLE[field?.tableName] = data;
      }
    }
    toast.update(loading, {
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });
    setLoading(false);
  }

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

  const handelFieldUpload = (name, e, required) => {
    if (required) {
      // insertIntoErrors(name, value);
    }
    setValues((prev) => {
      return {
        ...prev,
        [name]: e.target.files[0],
      };
    });
  };
  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full z-[100] bg-[#0003]" />
      ) : null}
      <form className="mb-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {!!initialFields
            ? initialFields?.map((field, i) => {
                if (field?.name === "id" || field?.hide_in_add_form)
                  return null;
                if (field?.key === "input") {
                  return (
                    <InputField
                      value={values?.[field?.name]}
                      index={i}
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
                          field?.type === "number"
                            ? +e.target.value
                            : e.target.value,
                          field?.required
                        )
                      }
                    />
                  );
                } else if (field?.key === "ref") {
                  return (
                    <SelectField
                      index={i}
                      value={values?.[field?.name]}
                      // defaultValue={values?.[field?.name]}
                      label={field?.name}
                      list={
                        !!getCachedList ? getCachedList(field?.tableName) : []
                      }
                      keyLabel={field?.refName || "name"}
                      keyValue={field?.refId || "id"}
                      name={field?.name}
                      required={field?.required}
                      onChange={(e) =>
                        handelChangeField(
                          field?.name,
                          e.target.value,
                          field?.required
                        )
                      }
                    />
                  );
                } else if (field?.key === "radio") {
                  return (
                    <RadioField
                      defaultChecked={values?.[field?.name]}
                      index={i}
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
                } else if (field?.key === "checkbox") {
                  return (
                    <CheckboxField
                      defaultChecked={values?.[field?.name]}
                      index={i}
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
                      onChange={(e) => {
                        handelChangeField(
                          field?.name,
                          e.target.checked,
                          field?.required
                        );
                      }}
                    />
                  );
                } else if (field?.key === "image") {
                  return (
                    <UploadFile
                      src={values?.[field?.name]}
                      index={i}
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
                        handelFieldUpload(field?.name, e, field?.required)
                      }
                    />
                  );
                } else {
                  return (
                    <InputField
                      value={values?.[field?.name]}
                      index={i}
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
                          field?.type === "number"
                            ? +e.target.value
                            : e.target.value,
                          field?.required
                        )
                      }
                    />
                  );
                }
              })
            : null}
        </div>
      </form>
    </>
  );
};

export default SuperForm;
