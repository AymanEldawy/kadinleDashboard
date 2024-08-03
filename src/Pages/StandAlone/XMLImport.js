import React, { useState } from "react";
import TabsContent from "../../Components/Tabs/TabsContent";
import { StepsBar } from "../../Components/Global/StepsBar";
import { XML_IMPORT_STEPS } from "../../Helpers/Scripts/constants";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import InputField from "../../Components/CustomForm/InputField";
import SelectField from "../../Components/CustomForm/SelectField";
import { useFetch } from "../../hooks/useFetch";

const XMLImport = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const STAGES = XML_IMPORT_STEPS.map((step) => step.name);
  const [activeStage, setActiveStage] = useState(STAGES[0]);

  let CACHED_TABLE = {};
  const { getData } = useFetch();
  const getCachedList = (tableName) => {
    return CACHED_TABLE?.[tableName];
  };
  const onSubmit = () => {
    // setActiveIndex(3);
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
                  // onChange={(e) =>
                  //   handelChangeField(
                  //     field?.name,
                  //     e.target.value,
                  //     field?.required,
                  //     item
                  //   )
                  // }
                />
                {/* <InputField label="language_id" containerClassName="w-full" /> */}
                <InputField
                  label="supplier_id"
                  containerClassName="w-full"
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row w-full gap-5">
                <InputField label="url" containerClassName="w-full" required />
                <InputField
                  label="template_name"
                  containerClassName="w-full"
                  required
                />
              </div>
            </>
          ) : null}
          {/* {activeStage === STAGES[1] ? (
            <AddProductVariants
              getCachedList={getCachedList}
              fields_variant={fields_variant}
              fields_stock={stock_fields}
              productId={productId}
              productSku={productValues?.product_sku}
              CACHED_TABLES_SKU={CACHED_TABLES_SKU}
              allValues={productVariantValues}
              setAllValues={setProductVariantValues}
              variantErrors={variantErrors}
              setVariantErrors={setVariantErrors}
              activeTabVariant={activeTabVariant}
              setActiveTabVariant={setActiveTabVariant}
              activeTabSizes={activeTabSizes}
              setActiveTabSizes={setActiveTabSizes}
              activeTabStocks={activeTabStocks}
              setActiveTabStocks={setActiveTabStocks}
              dropzoneRef={dropzoneRef}
              listCountGlobalVariant={listCountGlobalVariant}
              setListCountGlobalVariant={setListCountGlobalVariant}
              layout={layout}
            />
          ) : null} */}
        </div>
        {/* <InputField label="language_id" /> */}

        {/* STEPS */}
        {/* BODY */}
      </BlockPaper>
      <div className="flex mt-12 gap-5 items-center justify-between">
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
        {activeStage === STAGES?.[3] ? (
          <button
            className="p-2 rounded px-8 bg-primary-blue text-white disabled:bg-gray-200 disabled:text-gray-500"
            onClick={onSubmit}
          >
            Submit
          </button>
        ) : (
          <button
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
