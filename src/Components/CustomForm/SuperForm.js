import React, { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getTableData } from "../../Api/globalActions";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { useFetch } from "../../hooks/useFetch";
import { Button } from "../Global/Button";
import CheckboxField from "./CheckboxField";
import InputField from "./InputField";
import RadioField from "./RadioField";
import SelectField from "./SelectField";
import UploadFile from "./UploadFile";
import { CollectionConnectFields } from "./CollectionConnectFields";

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
  const { defaultLanguage, defaultRegion } = useGlobalOptions();
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  // Clean up component
  const location = useLocation();

  useEffect(() => {
    if (!defaultLanguage?.id) return;
    let loading = toast.loading("Loading ...");

    checkRefTable(initialFields).then((res) => {
      toast.update(loading, {
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    });
  }, [initialFields, defaultLanguage]);

  async function checkRefTable(fields) {
    setLoading(true);
    if (!fields?.length) return;
    for (const field of fields) {
      if (field.key === "ref") {
        const response = await getTableData(field?.tableName, {
          languageId: defaultLanguage?.id,
          regionId: defaultRegion?.id,
        });
        CACHED_TABLE[field?.tableName] = response?.data;
      }
    }
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
                      readonly={field?.readonly}
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
                } else if (field?.key === "collection_connect") {
                  return (
                    <CollectionConnectFields
                      index={i}
                      values={values}
                      handelChangeField={handelChangeField}
                      getCachedList={getCachedList}
                      onTouched={onTouched}
                    />
                  );
                } else if (field?.key === "radio") {
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
                      readonly={field?.readonly}
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
                      readonly={field?.readonly}
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
                      readonly={field?.readonly}
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
                      readonly={field?.readonly}
                      label={field?.label || field?.name}
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
                      readOnly={field?.readonly}
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
