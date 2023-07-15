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

export const FormProductIncreasable = ({
  initialFields,
  onSubmit,
  increasableTitle,
  onChangeValues,
  resetForm,
  getCachedList,
  values,
  setValues,
  maxCount,
}) => {
  const { CACHE_LANGUAGES } = useGlobalOptions();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [listCount, setListCount] = useState([uuidv4()]);
  const [selectedTab, setSelectedTab] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

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

  const submit = (e) => {
    e.preventDefault();
    if (!values) {
      toast.error("Please Fill the required Fields");
      return;
    }
    if (!errors.length) {
      onSubmit(values);
    }
  };

  return (
    <div className="">
      <div className="flex flex-wrap gap-2 items-start">
        <IncreasableBar
          title={increasableTitle}
          TitleValue={values}
          list={listCount}
          setList={setListCount}
          // maxCount={maxCount || 3}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
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
      {/* <TabsContent activeTabName={activeTab || listCount[0]}>
        
      </TabsContent> */}

      <div className="flex justify-between gap-4 items-center">
        <Button type="submit" title="Submit" onClick={submit} />
      </div>
    </div>
  );
};

//
