import React, { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CheckboxField from "../../../Components/CustomForm/CheckboxField";
import InputField from "../../../Components/CustomForm/InputField";
import RadioField from "../../../Components/CustomForm/RadioField";
import SelectField from "../../../Components/CustomForm/SelectField";
import UploadFile from "../../../Components/CustomForm/UploadFile";
import { Button } from "../../../Components/Global/Button";

const AddProductForm = ({
  onSubmit,
  initialFields,
  layout,
  getCachedList,
  values,
  setValues,
  allMultiple,
  getImagesValueOnChange,
  errors,
  setErrors,
}) => {
  const [touched, setTouched] = useState({});
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
    }
    setValues((prev) => {
      return {
        ...prev,
        [name]: !!allMultiple
          ? Array.from(e.target.files)?.length
          : e.target.files[0],
      };
    });
    if (!!allMultiple && !!getImagesValueOnChange) {
      getImagesValueOnChange(e.target.files);
    }
  };

  // const submit = (e) => {
  //   e.preventDefault();
  //   if (!errors.length) {
  //     onSubmit(values);
  //   }
  // };
  return (
    <form className="mb-8">
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
                        option[field?.refId || "id"],
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
                    multiple={allMultiple}
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
      {/* <div className="flex justify-between gap-4 items-center">
        <Button
          type="submit"
          title={layout === "update" ? "Update" : "Submit"}
        />
      </div> */}
    </form>
  );
};

export default AddProductForm;
