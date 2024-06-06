import React from "react";
import InputField from "../CustomForm/InputField";
import { CloseIcon } from "../../Helpers/Icons";

export const SectionOrderCard = ({
  section,
  onChangeNumber,
  onSaveChangeNumber,
  changeVisibility,
  deleteSection,
}) => {
  return (
    <div className="flex items-center gap-1 flex-1 bg-white dark:bg-bgmaindark relative group-section  overflow-hidden border-gray-500 shadow">
      <InputField
        type="number"
        className="bg-purple-50 border-purple-50 w-16 text-center text-purple-500 py-2 px-4"
        value={section?.section_order}
        onChange={(e) => onChangeNumber(e, section?.section_name)}
        onBlur={onSaveChangeNumber}
        maxLength="90"
      />
      <h3 className="flex-1 font-medium text-lg capitalize">
        {section?.section_name}
      </h3>
      <input
        onChange={(e) => changeVisibility(e, section?.section_name)}
        id={section?.section_name}
        type="checkbox"
        name="display_home"
        defaultChecked={section?.display_home}
        value={section?.display_home}
        className="w-5 h-5 ml-auto mr-2"
      />
      {section?.deletable ? (
        <button onClick={() => deleteSection(section)} className="border p-[2px] rounded-md bg-red-500 text-white mr-2">
          <CloseIcon className="h-5 w-5" />
        </button>
      ) : null}
    </div>
  );
};
