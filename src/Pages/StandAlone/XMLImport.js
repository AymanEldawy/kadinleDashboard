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
import { Reorder } from "framer-motion";
import Loading from "../../Components/Loading/Loading";

//test url: "https://convert.stockmount.com/xml/publish/28094/xmloutlet"

const XMLImport = () => {
  // static data
  const response = "success";
  const fields = [
    { id: 0, name: "product" },
    { id: 1, name: "product_sku" },
    { id: 2, name: "price" },
    { id: 3, name: "tax_percent" },
    { id: 4, name: "barcode" },
    { id: 5, name: "name" },
    { id: 6, name: "description" },
    { id: 7, name: "image" },
    { id: 8, name: "stock" },
    { id: 9, name: "category" },
    { id: 10, name: "color" },
    { id: 11, name: "size" },
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
    process.env.REACT_APP_KADINLE_API + "/xml-mapping/xml";
  const getXmlFieldsUrl =
    process.env.REACT_APP_KADINLE_API + "/xml-mapping/xml/9/fields";

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
      fetchData();
    }
  };

  // 2.handle first step (get xml fields)

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

  // 3.handle first step (create xml file)
  const handleSubmitXmlFields = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      fields: {
        product: fieldsData[0].key,
        product_sku: fieldsData[1].key, //required text
        price: fieldsData[2].key, //required double
        tax_percent: fieldsData[3].key,
        // "discount": "discount",
        barcode: fieldsData[4].key,
        name: fieldsData[5].key, //requried
        description: fieldsData[6].key,
        // "seo_title": "seo_title",
        // "seo_description": "seo_description",
        // "image_alt": "image_alt",
        image: fieldsData[7].key, //required
        // "weight": "weight",
        // "sku": "sku",
        // "pattern_sku": "pattern_sku",
        stock: fieldsData[8].key, //requried
        category: fieldsData[9].key, //required
        color: fieldsData[10].key, //required
        size: fieldsData[11].key, //required
      },
    };

    try {
      const response = await fetch(getXmlFieldsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log("response from server", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (response.ok === true) {
        toast.success(`Fields uploaded Successfully.`);
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
  // functions
  const checkFileData = (data) => {
    const isValid = Object.values(data).every((value) => value !== "");
    setNextStep(isValid);
  };

  const handleReorder = (newOrder) => {
    const reorderedFields = newOrder.map((key) =>
      fieldsData.find((field) => field.key === key)
    );
    setFieldsData(reorderedFields);
  };

  const handleRemoveField = (key) => {
    setFieldsData(fieldsData.filter((field) => field.key !== key));
  };
  useEffect(() => {
    checkFileData(fileData);
  }, [fileData]);

  return (
    <>
      <BlockPaper title="XML import">
        {/* STEPS */}
        <StepsBar items={XML_IMPORT_STEPS} activeIndex={activeIndex} />

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
                  {loading ? <Loading /> : "Submit"}
                </button>
              </div>
            </>
          ) : null}

          {activeStage === STAGES[1] ? (
            <div className={`w-full`}>
              <h2 className="text-center font-semibold my-5">
                Please arrange the items on the right
              </h2>

              {loading ? (
                <div className="flex justify-center items-center">
                  <Loading />
                </div>
              ) : (
                <div className={`w-full flex justify-center`}>
                  <div className="left flex flex-col gap-3 mt-1">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex items-center justify-center"
                      >
                        <span className="w-20">{field.name}</span>
                        <div className="h-1 w-48 bg-[#E5E7EB] mt-2 ml-3" />
                        <span className="text-[#5D9FF2] text-[22px] mt-1">
                          ➤
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="right">
                    {fieldsData?.length > 0 ? (
                      <Reorder.Group
                        values={fieldsData.map((field) => field.key)}
                        onReorder={handleReorder}
                      >
                        {fieldsData?.map((field, index) => (
                          <Reorder.Item value={field.key} key={field.key}>
                            <div className="relative p-2 my-2 rounded-md bg-gray-600 text-white">
                              {field.value}
                              <span className="absolute right-2 top-0 rounded-full">
                                <button
                                  onClick={() => handleRemoveField(field.key)}
                                  className="delete-button"
                                >
                                  ×
                                </button>
                              </span>
                            </div>
                          </Reorder.Item>
                        ))}
                      </Reorder.Group>
                    ) : null}
                  </div>
                </div>
              )}
              <div className="w-full flex justify-center">
                <button
                  className="p-2 my-8 rounded px-8 bg-primary-blue text-white disabled:bg-gray-200 disabled:text-gray-500"
                  onClick={handleSubmitXmlFields}
                >
                  {loading ? <Loading /> : "Submit"}
                </button>
              </div>
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
