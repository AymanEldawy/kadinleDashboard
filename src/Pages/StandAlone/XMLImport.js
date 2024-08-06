import React, { useEffect, useState } from "react";
import TabsContent from "../../Components/Tabs/TabsContent";
import { StepsBar } from "../../Components/Global/StepsBar";
import { XML_IMPORT_STEPS } from "../../Helpers/Scripts/constants";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import InputField from "../../Components/CustomForm/InputField";
import SelectField from "../../Components/CustomForm/SelectField";
import SuccessIcon from "../../Components/icons/SuccessIcon";
import FailedIcon from "../../Components/icons/FailedIcon";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LongArrow from "../../Components/icons/LongArrow";

//test url: "https://convert.stockmount.com/xml/publish/28094/xmloutlet"

const XMLImport = () => {
  // static data
  const response = "success";
  const fields = [
    { id: 1, name: "product" },
    { id: 2, name: "product_sku" },
    { id: 3, name: "price" },
    { id: 1, name: "tax_percent" },
    { id: 2, name: "barcode" },
    { id: 3, name: "name" },
    { id: 1, name: "description" },
    { id: 2, name: "image" },
    { id: 3, name: "stock" },
    { id: 1, name: "category" },
    { id: 2, name: "color" },
    { id: 3, name: "size" },
  ];
  const data = [
    { id: 1, header: "product_sku", sample: "test", type: "number" },
    { id: 2, header: "category_name", sample: "test", type: "text" },
    { id: 3, header: "price", sample: "test", type: "number" },
  ];
  // states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const STAGES = XML_IMPORT_STEPS.map((step) => step.name);
  const [activeStage, setActiveStage] = useState(STAGES[0]);
  const [nextStep, setNextStep] = useState(false);
  const [fieldsData, setFieldsData] = useState(null);
  const [fileData, setFileData] = useState({
    language_id: "",
    supplier_id: "",
    url: "",
    template_name: "",
  });

  // API URLs
  const createXmlFileUrl =
    process.env.REACT_APP_KADINLE_API + "xml-mapping/xml";
  const getXmlFieldsUrl = process.env.REACT_APP_KADINLE_API + "xml-mapping/xml/9/fields"
    
  // fetch data
  // 1.handle first step (create xml file)
  const handleSubmitCreateXml = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      url: fileData.url,
      template_name: fileData.template_name,
    };

    try {
      const response = await fetch(createXmlFileUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log("response from server", response.status);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (response.status === 201) {
        toast.success(`XML file created Successfully.`);
        let index = STAGES?.indexOf(activeStage);
        setActiveStage(STAGES?.[index + 1]);
        setActiveIndex(index + 1);
      } else {
        toast.error("Error creating XML file.");
      }
    } catch (error) {
      setError(error.toString());
      toast.error("Error creating XML file.");
    } finally {
      setLoading(false);
    }
  };

  // 2.handle first step (get xml fields)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(getXmlFieldsUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFieldsData(data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };
     fetchData();
  },[getXmlFieldsUrl])
  console.log("fieldsData", fieldsData);
  // functions
  const checkFileData = (data) => {
    const isValid = Object.values(data).every((value) => value !== "");
    setNextStep(isValid);
  };

  useEffect(() => {
    checkFileData(fileData);
  }, [fileData]);

  return (
    <>
      <BlockPaper title="XML import">
        {/* STEPS */}
        <StepsBar items={XML_IMPORT_STEPS} activeIndex={activeIndex} />
        <div className={`w-full flex justify-center items-center gap-20`}>
          <div className="left flex flex-col gap-5">
            {fields.map((field) => (
              <div key={field.id} className="flex items-center justify-center gap-4">
                <span className="w-20">{field.name}</span>
                <div className="h-1 w-48 bg-[#5D9FF2] mt-2" />
              </div>
            ))}
          </div>
          <div className="center flex flex-col gap-5">
            {/* {fields.map((field) => (
              <div key={field.id} className="h-3 w-10 bg-[#5D9FF2]" />
            ))} */}
          </div>
          <div className="right"></div>
        </div>
        {/* BODY */}
        <div className="mt-10">
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
              <div className="w-full flex justify-center">
                <button
                  disabled={!nextStep}
                  className="p-2 my-8 rounded px-8 bg-primary-blue text-white disabled:bg-gray-200 disabled:text-gray-500"
                  onClick={handleSubmitCreateXml}
                >
                  {loading ? "loading..." : "Submit"}
                </button>
              </div>
            </>
          ) : null}

          {activeStage === STAGES[1] ? (
            <div className={`w-full`}>
              <div className="left">
                {fields.map((field) => (
                  <div key={field.id}>{field.name}</div>
                ))}
              </div>
              <div className="center"></div>
              <div className="right"></div>
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
      </BlockPaper>
      <div className="flex mt-12 gap-5 items-center justify-between">
        {/* <button onClick={handleSubmit}>test api</button> */}
        {/* {activeStage === STAGES?.[3] ? null : (
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
        )} */}
      </div>
    </>
  );
};

export default XMLImport;
