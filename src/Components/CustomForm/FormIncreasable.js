import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import TabsList from "../../Components/Tabs/TabsList";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { CloseIcon, PlusIcon } from "../../Helpers/Icons";
import { useFetch } from "../../hooks/useFetch";
import { Button } from "../Global/Button";
import TabsContent from "./../../Components/Tabs/TabsContent";
import CheckboxField from "./CheckboxField";
import InputField from "./InputField";
import RadioField from "./RadioField";
import SelectField from "./SelectField";
import UploadFile from "./UploadFile";

let CACHED_TABLE = {};

export const FormIncreasable = ({
  initialFields,
  onSubmit,
  increasableTitle,
  onChangeValues,
  resetForm,
  maxCount,
}) => {
  const { getData } = useFetch();
  const location = useLocation();
  const { CACHE_LANGUAGES } = useGlobalOptions();
  const [selectedTab, setSelectedTab] = useState([]);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [listCount, setListCount] = useState([`00 ${uuidv4()}`]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (resetForm) setValues({});
  }, [resetForm]);
  useEffect(() => {
    checkRefTable(initialFields);
  }, [initialFields]);
  useEffect(() => {
    if (!!onChangeValues) onChangeValues(values);
  }, [values]);

  async function checkRefTable(fields) {
    if (!fields?.length) return;
    for (const field of fields) {
      if (field.key === "ref") {
        const data = await getData(field?.tableName);
        CACHED_TABLE[field?.tableName] = data;
      }
    }
  }
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
  const handelChangeField = (name, value, required, row) => {
    if (name === "language_id") {
      if (selectedTab?.includes(value)) return;
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
          [name]: e.target.files[0], //URL.createObjectURL(),
        },
      };
    });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!errors.length) {
      onSubmit(values);
    }
  };
  const increaseLanguages = () => {
    if (maxCount && listCount?.length < maxCount) return;
    setListCount((prev) => [...prev, uuidv4()]);
  };
  const resetItemData = (item) => {
    let list = values;
    delete list[item];
    setValues(list);
  };
  const decreaseLanguages = (index) => {
    resetItemData(listCount[index]);
    if (index === activeTab) {
      if (index !== 0) {
        setActiveTab((prev, i) => i - 1);
      } else {
        setActiveTab((prev, i) => i + 1);
      }
      // setActiveTab(() =);
    }
    setListCount((prev) => prev?.filter((item, i) => i !== index));
  };
  useEffect(() => {}, [activeTab]);

  return (
    <div className="">
      <div className="flex flex-wrap gap-2 items-start">
        <div className="mb-4 border-b flex flex-wrap w-full">
          {listCount?.map((item, index) => (
            <button
              key={`item-${item}`}
              className={`text-gray-500 pb-2 text-xs border-b-2 -mb-[2px] !gap-1 !px-1 p-2 capitalize flex items-center ${
                index === activeTab
                  ? "border-primary-blue text-primary-blue font-medium"
                  : ""
              }`}
              onClick={() => setActiveTab(index)}
            >
              {increasableTitle
                ? increasableTitle
                : values?.[item]?.language_id
                ? CACHE_LANGUAGES[values?.[item]?.language_id]
                : "choose language"}
              {listCount.length === 1 ? null : (
                <CloseIcon
                  className="!text-red-500 w-4 h-4"
                  onClick={() => decreaseLanguages(index)}
                />
              )}
            </button>
          ))}
          <button
            disabled={listCount?.length === maxCount}
            onClick={() => increaseLanguages()}
            className="bg-primary-blue rounded-full disabled:bg-gray-400 cursor-not-allowed text-white mx-1 w-6 h-6 flex items-center justify-center mt-1 text-xs"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      {listCount?.map((item, index) => (
        <form
          className={`mb-8 ${activeTab === index ? "" : "hidden"}`}
          tabName={item}
          key={item}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {!!initialFields
              ? initialFields?.map((field, i) => {
                  if (field?.name === "id" || field?.hide_in_add_form)
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
