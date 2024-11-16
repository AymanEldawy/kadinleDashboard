import React, { useState } from "react";
import { StepsBar } from "../../Components/Global/StepsBar";
import { XML_IMPORT_STEPS } from "../../Helpers/Scripts/constants";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { useFetch } from "../../hooks/useFetch";
import { XmlStageWrapper } from "../../Components/Xml/XmlStageWrapper";
import { XmlMapFields } from "../../Components/Xml/XmlMapFields";
import { XmlCreateTemplate } from "../../Components/Xml/XmlCreateTemplate";
import { XmlSecondMapFields } from "../../Components/Xml/XmlSecondMapFields";
import { XmlReport } from "../../Components/Xml/XmlReport";
import { XMLCreateTemplate } from "../../Api/xml";
import { toast } from "react-toastify";

//test url: "https://convert.stockmount.com/xml/publish/28094/xmloutlet"

const XMLImport = () => {
  // states
  const { getData } = useFetch();
  const [loading, setLoading] = useState(false);
  const [fileId, setFileId] = useState(null);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(1);
  console.log("🚀 ~ XMLImport ~ activeIndex:", activeIndex)
  const STAGES = XML_IMPORT_STEPS.map((step) => step.name);
  const [fileFields, setFileFields] = useState({});

  const goNext = async () => {
    if (activeIndex === 0 && !url) {
      toast.error(`Url is required`);
      return;
    } else {
      await handleSubmitCreateXml();
    }
    setActiveIndex((p) => (p += 1));
  };
  const goBack = () => {
    if (activeIndex === 0) return;
    setActiveIndex((p) => (p -= 1));
  };

  const handleSubmitCreateXml = async () => {
    setLoading(true);
    setError(null);
    const response = await XMLCreateTemplate(url);
    console.log("🚀 ~ handleSubmitCreateXml ~ response:", response)
    if (response.status === 201) {
      
    } else {
      setError(error.toString());
      setLoading(false);
    }
  };

  return (
    <>
      <BlockPaper title="XML import">
        <StepsBar items={XML_IMPORT_STEPS} activeIndex={activeIndex} />
        <div className="mt-10">
          {activeIndex === 0 ? (
            <XmlStageWrapper
              title="create template"
              children={
                <XmlCreateTemplate
                  goBack={goBack}
                  goNext={goNext}
                  url={url}
                  setUrl={setUrl}
                  handleSubmitCreateXml={handleSubmitCreateXml}
                />
              }
            />
          ) : null}

          {activeIndex === 1 ? (
            <XmlStageWrapper
              title="Mapping Schema"
              children={<XmlMapFields goBack={goBack} goNext={goNext} />}
            />
          ) : null}

          {activeIndex === 2 ? (
            <XmlStageWrapper
              title="Second Mapping Schema"
              children={<XmlSecondMapFields goBack={goBack} goNext={goNext} />}
            />
          ) : null}
          {activeIndex === 3 ? (
            <XmlStageWrapper
              title="Report"
              children={<XmlReport goBack={goBack} goNext={goNext} />}
            />
          ) : null}
          {activeIndex === 4 ? (
            <XmlStageWrapper
              title="Done"
              children={<XmlMapFields goBack={goBack} goNext={goNext} />}
            />
          ) : null}
        </div>
        <div className="flex items-center justify-between mt-4">
          <button
            disabled={activeIndex === 0}
            onClick={goBack}
            className="disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-60 bg-blue-500 active:bg-blue-700 px-2 py-1 rounded-md text-white"
          >
            Back
          </button>
          <button
            onClick={goNext}
            disabled={activeIndex === 4}
            className="disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-60 bg-blue-500 active:bg-blue-700 px-2 py-1 rounded-md text-white"
          >
            Next
          </button>
        </div>
      </BlockPaper>
    </>
  );
};

export default XMLImport;
