import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { getTableData } from "../../Api/globalActions";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { useFetch } from "../../hooks/useFetch";
import { IncreasableBar } from "../Global/IncreasableBar";
import CheckboxField from "./CheckboxField";
import InputField from "./InputField";
import RadioField from "./RadioField";
import SelectField from "./SelectField";
import UploadFile from "./UploadFile";

let CACHED_TABLE = {};

export const FormIncreasable = ({
  initialFields,
  increasableTitle,
  onChangeValues,
  maxCount,
  values,
  setValues,
  errors,
  setErrors,
  oldList,
  SUPABASE_TABLE_NAME,
  tableName,
  customGrid
}) => {
  const { getData } = useFetch();
  const location = useLocation();
  const { CACHE_LANGUAGES, languages, defaultLanguage, defaultRegion } =
    useGlobalOptions();
  const [selectedTab, setSelectedTab] = useState([]);
  const [touched, setTouched] = useState({});
  const [listCount, setListCount] = useState([`00${uuidv4()}`]);
  const [activeTab, setActiveTab] = useState(listCount[0]);

  useEffect(() => {
    checkRefTable(initialFields);
  }, [initialFields]);

  useEffect(() => {
    if (!!onChangeValues) onChangeValues(values);
  }, [values]);

  useEffect(() => {
    if (!!values && !!oldList) {
      const list = Object.keys(values)?.length ?  Object.keys(values) : [1];
      setListCount(list);
      setActiveTab(list[0]);
    }
  }, [oldList]);

  async function checkRefTable(fields) {
    if (!fields?.length) return;
    for (const field of fields) {
      if (field.key === "ref") {
        if (field?.name !== "region_id" || field?.name !== "language_id") {
          const response = await getTableData(field?.tableName, {
            languageId: defaultLanguage?.id,
            regionId: defaultRegion?.id,
          });
          CACHED_TABLE[field?.tableName] = response?.data;
        } else {
          const data = await getData(field?.tableName);

          CACHED_TABLE[field?.tableName] = data;
        }
      }
    }
  }
  const getCachedList = (tableName) => {
    return CACHED_TABLE?.[tableName];
  };

  const insertIntoErrors = (name, value, row) => {
    if (value === "") {
      setErrors((prev) => {
        return {
          ...prev,
          [row]: {
            ...prev?.[row],
            [name]: "Field is required",
          },
        };
      });
    } else {
      let newErrors = errors;
      delete newErrors?.[row]?.[name];
      setErrors(newErrors);
    }
  };
  const onTouched = (name, row) => {
    if (touched[name]) return;
    setTouched((prev) => {
      return {
        ...prev,
        [row]: {
          ...prev[row],
          [name]: true,
        },
      };
    });
  };
  const handelChangeField = (name, value, required, row) => {
    if (name === "language_id") {
      if (selectedTab?.includes(value)) return;
      setSelectedTab((prev) => [...prev, value]);
    }
    if (required) {
      insertIntoErrors(name, value, row);
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

  return (
    <div className="">
      <div className="flex flex-wrap gap-2 items-start">
        <IncreasableBar
          list={listCount}
          setList={setListCount}
          values={values}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          maxCount={maxCount}
          title={
            SUPABASE_TABLE_NAME === "size"
              ? "choose region"
              : tableName === "order"
              ? "view variant"
              : increasableTitle
              ? increasableTitle
              : null
          }
        />
      </div>
      {listCount?.map((item, index) => (
        <form
          className={`mb-8 ${activeTab === item ? "" : "hidden"}`}
          tabName={item}
          key={item}
        >
          <div className={customGrid || "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8"}>
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
                        onFocus={() => onTouched(field?.name, item)}
                        required={field?.required}
                        error={
                          touched?.[item]?.[field?.name] &&
                          errors?.[item]?.[field?.name]
                            ? errors?.[item]?.[field?.name]
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
                        onFocus={() => onTouched(field?.name, item)}
                        error={
                          touched?.[item]?.[field?.name] &&
                          errors?.[item]?.[field?.name]
                            ? errors?.[item]?.[field?.name]
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
                        onFocus={() => onTouched(field?.name, item)}
                        error={
                          touched?.[item]?.[field?.name] &&
                          errors?.[item]?.[field?.name]
                            ? errors?.[item]?.[field?.name]
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
                        onFocus={() => onTouched(field?.name, item)}
                        required={field?.required}
                        error={
                          touched?.[item]?.[field?.name] &&
                          errors?.[item]?.[field?.name]
                            ? errors?.[item]?.[field?.name]
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
                        onFocus={() => onTouched(field?.name, item)}
                        required={field?.required}
                        error={
                          touched?.[item]?.[field?.name] &&
                          errors?.[item]?.[field?.name]
                            ? errors?.[item]?.[field?.name]
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
