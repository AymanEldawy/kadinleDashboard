import React from "react";

const FormHeadingTitleSteps = ({ steps, name, changeTab, activeStage }) => {
  return (
    <>
      <div className="flex items-center text-left bg-gray-100 dark:bg-bgmaindark border-t border-gray-100 overflow-auto">
        {steps?.length ? (
          <>
            {steps?.map((step, index) => (
              <button
                onClick={() => changeTab(step)}
                key={step}
                className={`${
                  activeStage === step
                    ? "!text-black !font-medium dark:bg-borderdark dark:text-white bg-white rounded-t"
                    : ""
                } p-2 px-4 text-sm text-gray-500 font-normal flex-1 capitalize whitespace-nowrap`}
              >
                {step}
              </button>
            ))}
          </>
        ) : (
          <button
            className={` p-2 flex-1 font-medium capitalize border-l-4 dark:bg-borderdark text-left text-lg !text-blue-500 bg-blue-50 border-blue-500 `}
          >
            {name}
          </button>
        )}
      </div>
    </>
  );
};

export default FormHeadingTitleSteps;
