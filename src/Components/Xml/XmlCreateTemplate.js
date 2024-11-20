import React from "react";
import InputField from "../CustomForm/InputField";

export const XmlCreateTemplate = ({ url, setUrl }) => {
  return (
    <div className="mx-auto max-w-md">
      <InputField name="url" label="Xml url" value={url} onChange={e => setUrl(e.target.value)} />
    </div>
  );
};
