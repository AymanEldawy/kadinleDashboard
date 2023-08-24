import JoditEditor from "jodit-react";
import React, { useMemo, useRef, useState } from "react";

const HTMLEditor = ({ mail, setMail }) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      value={mail}
      config={{
        placeholder: "Start Typing...",
      }}
      tabIndex={1}
      onBlur={(newContent) => setMail(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => {}}
    />
  );
};
export default HTMLEditor;
