import React, { useEffect, useState } from "react";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { OFFER_TYPES } from "../../Helpers/Scripts/constants";
import Select from "react-select";
import InputField from "../../Components/CustomForm/InputField";
import UploadFile from "../../Components/CustomForm/UploadFile";
import { CategoryMultiFilter } from "../../Components/TableBar/CategoryMultiFilter";
import { OfferTemplates } from "../../Components/OfferTemplates/OfferTemplates";
import SelectField from "../../Components/CustomForm/SelectField";
import { SelectedProductTable } from "../../Components/SelectedProductsComponents/SelectedProductTable";
import DB_API from "../../Helpers/Forms/databaseApi";
import { FormIncreasable } from "../../Components/CustomForm/FormIncreasable";

function OffersForm() {
  const [offer, setOffer] = useState({});
  const [countries, setCountries] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [toggleStage, setToggleStage] = useState(true);

  const handelChangeField = (name, value, required) => {
    setOffer((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handelFieldUpload = (name, e, required) => {
    if (required) {
      // insertIntoErrors(name, value);
    }
    setOffer((prev) => {
      return {
        ...prev,
        [name]: e.target.files[0],
      };
    });
  };

  console.log(offer, rowSelection);

  const onSubmit = async () => {};

  return (
    <BlockPaper
      title={"Offer"}
      headerClassName="flex justify-between"
      contentBar={
        <div className="flex gap-4 items-center min-w-[50%]">
          <SelectField
            key={offer?.offer_type}
            containerClassName="!flex-row !gap-2 w-full"
            placeholder="Select offer type"
            list={OFFER_TYPES}
            required
            keyLabel="label"
            keyValue="value"
            value={offer?.offer_type}
            onChange={(option) => {
              setOffer({
                offer_type: option?.value,
              });
              setRefresh((p) => !p);
            }}
          />
          <SelectField
            key={offer?.offer_type + "Select"}
            // label="Select Country"
            containerClassName="!flex-row !gap-2 w-full"
            placeholder="Select Country"
            list={countries}
            value={offer?.country_id}
            onChange={(option) => {
              setOffer((prev) => ({
                ...prev,
                country_id: option?.value,
              }));
            }}
          />
          <button
            onClick={() => setToggleStage((p) => !p)}
            className={`${
              toggleStage ? "bg-primary-green" : "bg-primary-red"
            } px-4 py-1 rounded-md whitespace-nowrap text-white capitalize`}
          >
            {toggleStage ? "Show Products" : "hide Products"}
          </button>
        </div>
      }
    >
      {/* <div className="flex gap-4 items-center">
     
        <CategoryMultiFilter
          containerClassName="min-w-[20%]"
          name="offer_category"
          label="select category"
          required

          filterCategory={offer?.category_id}
          setFilterCategory={(category_id) => {
            setOffer((prev) => ({
              ...prev,
              category_id,
            }));
          }}
        />
      </div> */}
      {toggleStage ? (
        <>
          <div className="grid mb-4 grid-cols-5 gap-2 p-4 rounded-md bg-gray-100 border">
            <InputField
              value={offer?.sku}
              name="sku"
              key={offer?.offer_type + "sku"}
              type="number"
              label="Sku"
              onChange={(e) => handelChangeField("sku", e.target.value)}
              required
            />

            <InputField
              value={offer?.start_date}
              name="start_date"
              key={offer?.offer_type + "start_date"}
              type="date"
              label="start_date"
              onChange={(e) => handelChangeField("start_date", e.target.value)}
              required
            />
            <InputField
              value={offer?.end_date}
              name="end_date"
              key={offer?.offer_type + "end_date"}
              type="date"
              label="end_date"
              onChange={(e) => handelChangeField("end_date", e.target.value)}
              required
            />
            <UploadFile
              boxContainerClassName="bg-white"
              src={offer?.icon}
              name="icon"
              key={offer?.offer_type + "Icon"}
              label="Icon"
              required
              onChange={(e) => handelFieldUpload("icon", e)}
            />
            <InputField
              value={offer?.hex}
              name="hex"
              key={offer?.offer_type + "hex"}
              type="color"
              label="hex"
              onChange={(e) => handelChangeField("hex", e.target.value)}
              required
            />
          </div>
          <OfferTemplates handelChangeField={handelChangeField} offer={offer} />
        </>
      ) : (
        <SelectedProductTable
          onSaveChanges={onSubmit}
          tableName={"products slider"}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          layout="slider"
        />
      )}
    </BlockPaper>
  );
}

export default OffersForm;
