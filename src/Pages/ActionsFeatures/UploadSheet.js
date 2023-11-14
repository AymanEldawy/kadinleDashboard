import React, { useState } from "react";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import UploadFile from "../../Components/CustomForm/UploadFile";
import { UploadProductScript } from "../../Helpers/Scripts/UploadProductScript";
import { UploadCategoryScript } from "./../../Helpers/Scripts/UploadCategoryScript";
import { UploadColorsScript } from "../../Helpers/Scripts/UploadColorsScript";
import { UploadSizesScript } from "../../Helpers/Scripts/UploadSizesScript";
import { UploadSizesChartScript } from "../../Helpers/Scripts/UploadSizeChartScript";

import CATEGORY_IMG_EXAMPLE from "../../Assets/Images/category.jpeg";
import COLOR_IMG_EXAMPLE from "../../Assets/Images/color.jpeg";
import CHART_IMG_EXAMPLE from "../../Assets/Images/chart.jpeg";
import SIZE_IMG_EXAMPLE from "../../Assets/Images/size.jpeg";
import Modal from "../../Components/Modal/Modal";

const UploadSheet = () => {
  const [completedProcess, setCompletedProcess] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const [logs, setLogs] = useState([]);
  const [exampleImage, setExampleImage] = useState("");

  const handleReadAndUploadFile = async (e, type) => {
    setIsProcess(true);
    switch (type) {
      case "products":
        await UploadProductScript(e.target.files?.[0], setLogs);
        break;
      case "categories":
        await UploadCategoryScript(e.target.files?.[0], setLogs);
        break;
      case "size_chart":
        await UploadSizesChartScript(e.target.files?.[0], setLogs);
        break;
      case "colors":
        await UploadColorsScript(e.target.files?.[0], setLogs);
        break;
      case "sizes":
        await UploadSizesScript(e.target.files?.[0], setLogs);
        break;
      default:
        return null;
    }
    setCompletedProcess(true);
  };

  return (
    <BlockPaper title="Upload Sheet XLS">
      <Modal open={exampleImage} onClose={() => setExampleImage("")}>
        <img src={exampleImage} />
      </Modal>
      {/* {!completedProcess ? (
        <button className="text-primary-blue absolute ltr:right-8 top-4">
          Back
        </button>
      ) : null} */}
      {!isProcess ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UploadFile
            onChange={(e) => handleReadAndUploadFile(e, "products")}
            label="Upload Products Sheet"
            boxContainerClassName="w-full !p-4 rounded-md cursor-pointer hover:bg-primary-red hover:text-white"
            className="!bg-transparent"
          />
          <UploadFile
            onChange={(e) => handleReadAndUploadFile(e, "categories")}
            label="Upload Categories Sheet"
            boxContainerClassName="w-full !p-4 rounded-md cursor-pointer hover:bg-primary-red hover:text-white"
            className="!bg-transparent"
            onShowExample={() => setExampleImage(CATEGORY_IMG_EXAMPLE)}
          />
          <UploadFile
            onChange={(e) => handleReadAndUploadFile(e, "colors")}
            name="color"
            label="Upload Colors Sheet"
            boxContainerClassName="w-full !p-4 rounded-md cursor-pointer hover:bg-primary-red hover:text-white"
            className="!bg-transparent"
            onShowExample={() => setExampleImage(COLOR_IMG_EXAMPLE)}
          />
          <UploadFile
            onChange={(e) => handleReadAndUploadFile(e, "sizes")}
            label="Upload Sizes Sheet"
            boxContainerClassName="w-full !p-4 rounded-md cursor-pointer hover:bg-primary-red hover:text-white"
            className="!bg-transparent"
            onShowExample={() => setExampleImage(SIZE_IMG_EXAMPLE)}
          />

          <UploadFile
            onChange={(e) => handleReadAndUploadFile(e, "size_chart")}
            label="Upload Size Chart Sheet"
            boxContainerClassName="w-full !p-4 rounded-md cursor-pointer hover:bg-primary-red hover:text-white"
            className="!bg-transparent"
            onShowExample={() => setExampleImage(CHART_IMG_EXAMPLE)}
          />
        </div>
      ) : (
        <div className="">
          <div className="max-h-screen overflow-auto">
            {logs?.map((log) => (
              <p
                className={`text-gray-400 text my-2 border-b pb-1 ${
                  log?.status === "loading"
                    ? "text-primary-blue"
                    : log?.status === "error"
                    ? "text-red-500"
                    : "text-primary-green"
                }`}
              >
                <span
                  className={`font-medium mr-4 inline-block capitalize px-4 py-[2px] text-sm w-[80px] text-center rounded-md ${
                    log?.status === "loading"
                      ? "bg-primary-blue text-white "
                      : log?.status === "error"
                      ? "bg-primary-red text-white "
                      : "bg-primary-green text-white "
                  }`}
                >
                  {log?.status}
                </span>
                {log?.msg}
              </p>
            ))}
          </div>
        </div>
      )}
    </BlockPaper>
  );
};

export default UploadSheet;
