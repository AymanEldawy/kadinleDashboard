import React from "react";
import SelectField from "./SelectField";
import InputField from "./InputField";

export const CollectionConnectFields = ({
  values,
  index,
  getCachedList,
  onTouched,
  handelChangeField,
}) => {
  console.log("🚀 ~ values:", values);
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <SelectField
        index={index}
        value={values?.type}
        label={"type"}
        hideText
        list={[
          { id: 0, name: "Nothing" },
          { id: 1, name: "Category" },
          { id: 2, name: "Inner Link" },
          { id: 3, name: "Outer Link" },
        ]}
        name={"type"}
        onChange={(e) => {
          handelChangeField("type", +e.target.value);
          if (+e.target.value === 0) {
            handelChangeField("link", "");
          }
        }}
      />
      {values?.type === 1 ? (
        <SelectField
          index={index}
          value={values?.link}
          label="link"
          list={!!getCachedList ? getCachedList("category_content") : []}
          keyLabel={"title"}
          keyValue={"id"}
          name="link"
          onChange={(e) => handelChangeField("link", e.target.value)}
        />
      ) : values?.type === 2 || values?.type === 3 ? (
        <InputField
          value={values?.link}
          index={index}
          name="link"
          type="text"
          label="link"
          placeholder={
            values?.type === 2 ? "/new-arrivals" : "https://google.com"
          }
          onFocus={() => onTouched("link")}
          onChange={(e) => handelChangeField("link", e.target.value)}
        />
      ) : null}
    </div>
  );
};
