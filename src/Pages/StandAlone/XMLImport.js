import React, { useEffect, useState } from "react";
import TabsContent from "../../Components/Tabs/TabsContent";
import { StepsBar } from "../../Components/Global/StepsBar";
import { XML_IMPORT_STEPS } from "../../Helpers/Scripts/constants";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import InputField from "../../Components/CustomForm/InputField";
import SelectField from "../../Components/CustomForm/SelectField";
import { useFetch } from "../../hooks/useFetch";
import SuccessIcon from "../../Components/icons/SuccessIcon";
import FailedIcon from "../../Components/icons/FailedIcon";
import { Link } from "react-router-dom";

const XMLImport = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const STAGES = XML_IMPORT_STEPS.map((step) => step.name);
  const [activeStage, setActiveStage] = useState(STAGES[0]);
  const [nextStep, setNextStep] = useState(false);
  const [fileData, setFileData] = useState({
    language_id: "",
    supplier_id: "",
    url: "",
    template_name: "",
  });
  const checkFileData = (data) => {
    const isValid = Object.values(data).every((value) => value !== "");
    setNextStep(isValid);
  };

  useEffect(() => {
    checkFileData(fileData);
  }, [fileData]);
  const response = "success";
  const tableHeaders = [
    { id: 1, header: "Header" },
    { id: 2, header: "Sample Row" },
    { id: 3, header: "Map To" },
  ];

  const data = [
    { id: 1, header: "product_sku", sample: "test", type: "number" },
    { id: 2, header: "category_name", sample: "test", type: "text" },
    { id: 3, header: "price", sample: "test", type: "number" },
  ];

  const onSubmit = () => {
    let index = STAGES?.indexOf(activeStage);
    setActiveStage(STAGES?.[index + 1]);
    setActiveIndex(index + 1);
  };
  return (
    <>
      <BlockPaper title="XML import">
        <StepsBar items={XML_IMPORT_STEPS} activeIndex={activeIndex} />
        <div className="my-10">
          {activeStage === STAGES[0] ? (
            <>
              <div className="flex flex-col md:flex-row w-full gap-5 mb-5">
                <SelectField
                  list={[
                    { name: "English" },
                    { name: "Turkish" },
                    { name: "Arabic" },
                  ]}
                  label="language_id"
                  containerClassName="w-full"
                  required
                  onChange={(e) => {
                    setFileData({
                      ...fileData,
                      language_id: e.target.value,
                    });
                  }}
                />
                {/* <InputField label="language_id" containerClassName="w-full" /> */}
                <InputField
                  label="supplier_id"
                  containerClassName="w-full"
                  required
                  onChange={(e) => {
                    setFileData({
                      ...fileData,
                      supplier_id: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col md:flex-row w-full gap-5">
                <InputField
                  label="url"
                  containerClassName="w-full"
                  required
                  onChange={(e) => {
                    setFileData({
                      ...fileData,
                      url: e.target.value,
                    });
                  }}
                />
                <InputField
                  label="template_name"
                  containerClassName="w-full"
                  required
                  onChange={(e) => {
                    setFileData({
                      ...fileData,
                      template_name: e.target.value,
                    });
                  }}
                />
              </div>
            </>
          ) : null}

          {activeStage === STAGES[1] ? (
            <div className={`relative overflow-x-auto w-full`}>
              <table className={`w-full`}>
                <thead className={`bg-gray-100  text-sm`}>
                  <tr>
                    {tableHeaders.map((header) => (
                      <th
                        key={header.id}
                        className={`text-gray-700 whitespace-nowrap  font-medium capitalize relative  group border-b border-gray-200  px-4 py-2 cursor-move`}
                      >
                        {header.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={``}>
                  <>
                    {data?.length ? (
                      data.map((row) => {
                        return (
                          <tr
                            key={row.id}
                            className={`text-center border-b last:border-none even:bg-gray-100 border-gray-100 `}
                          >
                            <td className={`px-4 py-2`}>{row.header}</td>
                            <td className={`px-4 py-2`}>{row.sample}</td>
                            <td className={`px-4 py-2`}>{row.type}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="text-red-500 h-28 bg-[#f1f1f1e8] p-1 rounded-sm text-center mt-2">
                        <td className="ltr:text-left rtl:text-right relative">
                          <span className="sticky left-1/2 -translate-x-1/2">
                            empty result
                          </span>
                        </td>
                      </tr>
                    )}
                  </>
                </tbody>
              </table>
            </div>
          ) : null}
          {activeStage === STAGES[2] ? (
            <div className="text-center">
              {response === "success" ? (
                <div className="flex flex-col justify-center items-center space-y-3">
                  <span>product inserted successfully</span>
                  <span>
                    <SuccessIcon />
                  </span>
                </div>
              ) : response === "error" ? (
                <div className="flex flex-col justify-center items-center space-y-3">
                  <span>failed to insert product ...</span>
                  <span>
                    <FailedIcon />
                  </span>
                </div>
              ) : (
                <span>row no 2 under the processing. </span>
              )}
            </div>
          ) : null}
          {activeStage === STAGES[3] ? (
            <div className="flex flex-col space-y-5 justify-center items-center">
              <h2 className="font-semibold text-[20px] text-green-900">Done</h2>
              <p>file name (...)</p>
              <p>inserted products count (...)</p>
              <p>failed products count (...)</p>
              <button
                className="p-2 rounded px-8 bg-primary-blue text-white disabled:bg-gray-200 disabled:text-gray-500"
                type="button"
              >
                download report
              </button>
              <Link to="" className="block cursor-pointer text-blue-300">
                Go To Home Page
              </Link>
            </div>
          ) : null}
        </div>

        {/* STEPS */}
        {/* BODY */}
      </BlockPaper>
      <div className="flex mt-12 gap-5 items-center justify-between">
        {activeStage === STAGES?.[3] ? null : (
          <button
            disabled={activeStage === STAGES[0]}
            className="p-2 rounded px-8 bg-primary-blue text-white disabled:bg-gray-200 disabled:text-gray-500"
            type="button"
            onClick={() => {
              let index = STAGES?.indexOf(activeStage);
              setActiveStage(STAGES?.[index - 1]);
              setActiveIndex(index - 1);
            }}
          >
            Back
          </button>
        )}

        {activeStage === STAGES?.[2] ? (
          <button
            className="p-2 rounded px-8 bg-primary-blue text-white disabled:bg-gray-200 disabled:text-gray-500"
            onClick={onSubmit}
          >
            Submit
          </button>
        ) : activeStage === STAGES?.[3] ? null : (
          <button
            disabled={!nextStep}
            className="p-2 rounded px-8 bg-primary-blue text-white disabled:bg-gray-200 disabled:text-gray-500"
            type="button"
            onClick={() => {
              let index = STAGES?.indexOf(activeStage);
              setActiveStage(STAGES?.[index + 1]);
              setActiveIndex(index + 1);
            }}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default XMLImport;
