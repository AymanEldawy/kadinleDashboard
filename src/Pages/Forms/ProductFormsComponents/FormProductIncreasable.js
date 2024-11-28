import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import CheckboxField from "../../../Components/CustomForm/CheckboxField";
import InputField from "../../../Components/CustomForm/InputField";
import RadioField from "../../../Components/CustomForm/RadioField";
import SelectField from "../../../Components/CustomForm/SelectField";
import UploadFile from "../../../Components/CustomForm/UploadFile";
import { Button } from "../../../Components/Global/Button";
import { useGlobalOptions } from "../../../Context/GlobalOptions";
import { CloseIcon, PlusIcon } from "../../../Helpers/Icons";
import { IncreasableBar } from "../../../Components/Global/IncreasableBar";
import { useDelete } from "../../../hooks/useDelete";

export const FormProductIncreasable = ({
  initialFields,
  layout,
  maxCount,
  onChangeValues,
  resetForm,
  getCachedList,
  values,
  setValues,
  listCount,
  setListCount,
  activeTab,
  setActiveTab,
  errors,
  setErrors,
}) => {
  const { deleteItem } = useDelete();
  const [touched, setTouched] = useState({});
  const [selectedTab, setSelectedTab] = useState([]);

  useEffect(() => {
    if (resetForm) setValues({});
  }, [resetForm]);
  useEffect(() => {
    if (!!onChangeValues) onChangeValues(values);
  }, [values]);

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
  const handelChangeField = (name, value, required, row) => {
    if (name === "language_id") {
      if (selectedTab.includes(value)) return;
      setSelectedTab((prev) => [...prev, value]);
    }
    if (required) {
      insertIntoErrors(name, value);
    }
    setValues((prev) => {
      return {
        ...prev,
        [row]: {
          ...prev?.[row],
          [name]: value,
        },
      };
    });
  };

  const handelFieldUpload = (name, e, required, row) => {
    if (required) {
      insertIntoErrors(name, e.target.files[0] ? "hav" : "", row);
    }
    setValues((prev) => {
      return {
        ...prev,
        [row]: {
          ...prev?.[row],
          [name]: e.target.files[0],
        },
      };
    });
  };

  const deleteContent = async (item, index) => {
    if (layout !== "update") return;
    await deleteItem("product_content", values?.[item]?.id);
  };
  return (
    <div className="">
      {layout === "update" ? (
        <p className="text-yellow-500 text-xs bg-yellow-100 p-1 rounded-md my-1">
          <strong className="text-yellow-400 font-medium">Warning: </strong>
          by Removing the language will remove the content for this language
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2 items-start">
        <IncreasableBar
          values={values}
          list={listCount}
          setList={setListCount}
          setValues={setValues}
          maxCount={maxCount}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onDecrease={(item, index) => deleteContent(item, index)}
        />
      </div>
      {listCount?.map((item, index) => (
        <form
          className={`mb-8 ${activeTab === item ? "" : "hidden"}`}
          tabName={item}
          key={`${index}-add`}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {!!initialFields
              ? initialFields?.map((field, i) => {
                  if (
                    field?.name === "id" ||
                    field?.hide_in_add_form ||
                    field?.hide_in_add_form_add
                  )
                    return null;
                  if (field?.key === "input") {
                    return (
                      <InputField
                        value={values?.[item]?.[field?.name]}
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
                            field?.required,
                            `${item}--${index}`
                          )
                        }
                      />
                    );
                  } else if (field?.key === "ref") {
                    return (
                      <SelectField
                        index={i}
                        value={values?.[item]?.[field?.name]}
                        label={field?.name}
                        list={
                          !!getCachedList ? getCachedList(field?.tableName) : []
                        }
                        keyLabel={field?.refName || "name"}
                        keyValue={field?.refId || "id"}
                        name={field?.name}
                        required={field?.required}
                        onChange={(option) =>
                          handelChangeField(
                            field?.name,
                            option?.[field?.refId || "id"],
                            field?.required,
                            item
                          )
                        }
                      />
                    );
                  } else if (field?.key === "radio") {
                    return (
                      <RadioField
                        defaultChecked={values?.[item]?.[field?.name]}
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
                            field?.required,
                            item
                          )
                        }
                      />
                    );
                  } else if (field?.key === "checkbox") {
                    return (
                      <CheckboxField
                        defaultChecked={values?.[item]?.[field?.name]}
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
                        onChange={(e) =>
                          handelChangeField(
                            field?.name,
                            e.target.checked,
                            field?.required,
                            item
                          )
                        }
                      />
                    );
                  } else if (field?.key === "image") {
                    return (
                      <UploadFile
                        src={values?.[item]?.[field?.name]}
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
                          handelFieldUpload(
                            field?.name,
                            e,
                            field?.required,
                            item
                          )
                        }
                      />
                    );
                  } else {
                    return (
                      <InputField
                        value={values?.[item]?.[field?.name]}
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
                            field?.required,
                            item
                          )
                        }
                      />
                    );
                  }
                })
              : null}
          </div>
        </form>
      ))}
    </div>
  );
};

//
