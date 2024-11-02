import React, { useState } from "react";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { OFFER_TYPES } from "../../Helpers/Scripts/constants";
import InputField from "../../Components/CustomForm/InputField";
import UploadFile from "../../Components/CustomForm/UploadFile";
import { OfferTemplates } from "../../Components/OfferTemplates/OfferTemplates";
import SelectField from "../../Components/CustomForm/SelectField";
import { SelectedProductTable } from "../../Components/SelectedProductsComponents/SelectedProductTable";
import DB_API from "../../Helpers/Forms/databaseApi";
import { FormIncreasable } from "../../Components/CustomForm/FormIncreasable";
import { useAdd } from "../../hooks/useAdd";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFetch } from "../../hooks/useFetch";
import { handleUploadOfferIcon } from "../../Api/DynamicUploadHandler";
import { toast } from "react-toastify";
import { Button } from "../../Components/Global/Button";
import { useUpdate } from "../../hooks/useUpdate";
import { useDelete } from "../../hooks/useDelete";
import { getOfferProducts } from "../../Api/data";

function OffersForm({ layout }) {
  const navigate = useNavigate();
  const params = useParams();
  const { CACHE_LANGUAGES, languages } = useGlobalOptions();
  const { addItem } = useAdd();
  const { deleteItem } = useDelete();
  const { getData } = useFetch();
  const { upsertItem, updateItem } = useUpdate();
  const [offer, setOffer] = useState({});
  const [offerContent, setOfferContent] = useState({});
  console.log("🚀 ~ OffersForm ~ offerContent:", offerContent);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [toggleStage, setToggleStage] = useState(true);

  useQuery({
    queryKey: ["offer", params?.id],
    queryFn: async () => {
      if (!params?.id) return;

      const response = await getData("offer", params?.id);
      const content = await getData("offer", params?.id, "content");
      setOffer(response?.at(0));
      if (content) {
        let hash = {};
        for (const item of content) {
          hash[item?.language_id] = item;
        }
        setOfferContent(hash);
        setRefresh((p) => !p);
        return content;
      }
    },
  });

  const { data: oldProducts } = useQuery({
    queryKey: ["offer", "products", params?.id],
    queryFn: async () => {
      if (!params?.id) return;

      const response = await getOfferProducts(params?.id);
      let hashProduct = {};
      let selection = {};
      for (const product of response?.data) {
        hashProduct[product?.product_id] = product;
        selection[product?.product_id] = true;
      }
      setRowSelection(selection);
      return hashProduct;
    },
  });

  const { data: countries } = useQuery({
    queryKey: ["country"],
    queryFn: async () => {
      const response = await getData("country");
      return response;
    },
  });

  const handelChangeField = (name, value, required) => {
    setOffer((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const insertIntoErrors = (name, value) => {
    if (value === "") {
      setErrors((prev) => {
        return {
          ...prev,
          [name]: "Field is required",
        };
      });
    } else {
      let newErrors = errors;
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const onTouched = (name) => {
    if (touched[name]) return;
    setTouched((prev) => {
      return {
        ...prev,
        [name]: true,
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

  const onSubmit = async () => {
    let loading = toast.loading("Please wait...");
    let icon = null;

    if (typeof offer?.icon === "object") {
      icon = offer?.icon;
      delete offer?.icon;
    }
    let response = null;

    if (params?.id) {
      response = await updateItem("offer", offer);
    } else {
      response = await addItem("offer", offer);
    }

    if (!response?.error) {
      const offer_id = params?.id || response?.data?.at(0)?.id;

      for (const content of Object.values(offerContent)) {
        let item = {
          ...content,
          offer_id,
        };
        if (item?.id) {
          await updateItem(`offer_content`, item);
        } else {
          await addItem(`offer_content`, item);
        }
      }

      if (icon) await handleUploadOfferIcon(icon, offer_id);

      await insertOfferProduct(offer_id || params?.id);

      toast.update(loading, {
        render: `Great! successfully ${params?.id ? "Updated" : "added"} offer`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } else {
      toast.update(loading, {
        render: `Oops! failed to ${params?.id ? "Updated" : "added"} offer`,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const insertOfferProduct = async (offer_id) => {
    let insertedList = [];
    let updatedList = [];
    let list = oldProducts;

    for (const product_id of Object.keys(rowSelection)) {
      if (list?.[product_id]) {
        updatedList.push(list?.[product_id]);
        delete list[product_id];
      } else {
        insertedList.push({
          product_id,
          offer_id,
        });
      }
    }

    await updateItem("offer_product", updatedList);
    await addItem("offer_product", insertedList);
    await deleteItem("offer_product", Object.keys(list));
  };

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
            keyLabel="name"
            keyValue="id"
            value={countries?.find((c) => c?.name === offer?.country_id)}
            onChange={(option) => {
              setOffer((prev) => ({
                ...prev,
                country_id: option?.id,
              }));
            }}
          />
          <button
            onClick={() => setToggleStage((p) => !p)}
            className={`${
              toggleStage ? "bg-primary-green" : "bg-primary-red"
            } px-4 py-1 rounded-md whitespace-nowrap text-white capitalize`}
          >
            {toggleStage ? "Show Products" : "hide Products"} (
            {Object.keys(rowSelection)?.length})
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
              onFocus={() => onTouched("sku")}
              error={touched?.sku && errors?.sku ? errors?.sku : null}
              required
            />

            <InputField
              value={offer?.start_date}
              name="start_date"
              key={offer?.offer_type + "start_date"}
              type="date"
              label="start_date"
              onChange={(e) => handelChangeField("start_date", e.target.value)}
              onFocus={() => onTouched("start_date")}
              error={
                touched?.start_date && errors?.start_date
                  ? errors?.start_date
                  : null
              }
              required
            />
            <InputField
              value={offer?.end_date}
              name="end_date"
              key={offer?.offer_type + "end_date"}
              type="date"
              label="end_date"
              onChange={(e) => handelChangeField("end_date", e.target.value)}
              onFocus={() => onTouched("end_date")}
              error={
                touched?.end_date && errors?.end_date ? errors?.end_date : null
              }
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
              onFocus={() => onTouched("icon")}
              error={touched?.icon && errors?.icon ? errors?.icon : null}
            />
            <InputField
              value={offer?.hex}
              name="hex"
              key={offer?.offer_type + "hex"}
              type="color"
              label="hex"
              onChange={(e) => handelChangeField("hex", e.target.value)}
              onFocus={() => onTouched("hex")}
              error={touched?.hex && errors?.hex ? errors?.hex : null}
              required
            />
          </div>
          <OfferTemplates handelChangeField={handelChangeField} offer={offer} />
          <FormIncreasable
            initialFields={DB_API?.offer_content}
            maxCount={languages?.length}
            values={offerContent}
            setValues={setOfferContent}
            errors={errors}
            setErrors={setErrors}
            oldList={refresh}
            SUPABASE_TABLE_NAME={"offer"}
          />
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
      <Button title="Submit" onClick={onSubmit} />
    </BlockPaper>
  );
}

export default OffersForm;
