import React, { useEffect, useState } from "react";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import {
  OFFER_FIELDS,
  OFFER_TYPES,
  TABLES_NAMES,
} from "../../Helpers/Scripts/constants";
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
import { useQuery } from "@tanstack/react-query";
import { useFetch } from "../../hooks/useFetch";
import { handleUploadOfferIcon } from "../../Api/DynamicUploadHandler";
import { toast } from "react-toastify";
import { Button } from "../../Components/Global/Button";
import { useUpdate } from "../../hooks/useUpdate";
import { useDelete } from "../../hooks/useDelete";
import { getOfferData, getOfferProducts } from "../../Api/data";
import { LoadingProcess } from "../../Components/Global/LoadingProcess";

function OffersForm() {
  const params = useParams();
  const { languages } = useGlobalOptions();
  const { addItem } = useAdd();
  const { deleteItem } = useDelete();
  const { getData } = useFetch();
  const { upsertItem, updateItem } = useUpdate();
  const [offer, setOffer] = useState({});
  const [offerContent, setOfferContent] = useState({});
  const [offerData, setOfferData] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [toggleStage, setToggleStage] = useState(true);
  const [isProgress, setIsProgress] = useState(false);

  console.log("🚀 ~ OffersForm ~ offer:", offer);
  // console.log("🚀 ~ OffersForm ~ offerContent:", offerContent);
  // console.log("🚀 ~ OffersForm ~ offerData:", offerData);

  const { data: oldOfferData } = useQuery({
    queryKey: ["offer", params?.id],
    queryFn: async () => {
      if (!params?.id) return;

      const response = await getData("offer", params?.id);
      const content = await getData("offer", params?.id, "content");
      const offer = response?.at(0);
      setOffer(offer);
      setOffer(response?.at(0));
      if (content) {
        let hash = {};
        for (const item of content) {
          hash[item?.language_id] = item;
        }
        setOfferContent(hash);
        setRefresh((p) => !p);
      }
      const tableName = TABLES_NAMES?.[offer?.offer_type];
      const offerDataResponse = await getOfferData(tableName, params?.id);
      if (!offerDataResponse?.error) {
        let hash = {};
        for (const item of offerDataResponse?.data) {
          hash[item?.id] = item;
        }
        setOfferData(hash);
        return hash;
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

  useEffect(() => {
    setOfferData({});
  }, [offer?.offer_type]);

  const handleChangeRow = (name, value, index) => {
    setOfferData((prev) => {
      return {
        ...prev,
        [index]: {
          ...prev?.[index],
          [name]: value,
        },
      };
    });
  };

  const handelChangeField = (name, value) => {
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
    // let loading = toast.loading("Please wait...");
    setIsProgress(true);
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

      setIsProgress(false);

      toast.success(
        `Great! successfully ${params?.id ? "Updated" : "added"} offer`
      );
      await insertIntoOfferData(offer_id || params?.id);
      await insertOfferProduct(offer_id || params?.id);
    } else {
      toast.error(`Oops! failed to ${params?.id ? "Updated" : "added"} offer`);
    }
  };

  const insertIntoOfferData = async (offer_id) => {
    const list = Object.values(offerData);
    const inserted = [];
    const updated = [];

    for (const item of list) {
      if (item?.id) updated.push(item);
      else
        inserted.push({
          offer_id,
          ...item,
        });
    }

    const tableName = TABLES_NAMES?.[offer?.offer_type];

    if (inserted?.length) await addItem(tableName, inserted);
    if (updated?.length) await upsertItem(tableName, updated);
  };

  const insertOfferProduct = async (offer_id) => {
    if (!rowSelection) return;
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
            containerClassName="!flex-row !gap-2 w-full"
            placeholder="Select offer type"
            list={OFFER_TYPES}
            required
            keyLabel="label"
            keyValue="offer_type"
            value={offer?.offer_type}
            onChange={(option) => {
              setOffer({
                offer_type: option?.offer_type,
                discount_type: option?.type,
              });
              // setRefresh((p) => !p);
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
      <div
        className={`relative ${
          offer?.offer_type ? "" : "pointer-events-none opacity-50"
        }`}
      >
        {isProgress ? <LoadingProcess /> : null}

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
            <div className="flex gap-12 items-start">
              <div
                className={`${
                  // offer?.offer_type === "FREE_SHIPPING" ||
                  // offer?.offer_type === "FAST_SHIPPING" ||
                  // !offer?.offer_type
                  //   ? "grid grid-cols-3 w-full gap-2 items-center"
                  //   : "flex flex-col w-1/3"
                  "flex flex-col w-1/3"
                } gap-2 mb-4 3 p-4 rounded-md bg-gray-100 border`}
              >
                {OFFER_FIELDS?.map((field) => {
                  if (field?.key === "image") {
                    return (
                      <UploadFile
                        boxContainerClassName="bg-white"
                        src={offer?.[field?.name]}
                        name={field?.name}
                        key={offer?.offer_type + field?.name}
                        label={field?.label}
                        required
                        onChange={(e) => handelFieldUpload(field?.name, e)}
                        onFocus={() => onTouched(field?.name)}
                        error={
                          touched?.[field?.name] && errors?.[field?.name]
                            ? errors?.[field?.name]
                            : null
                        }
                      />
                    );
                  } else {
                    return (
                      <InputField
                        containerClassName="flex-1 !flex-row gap-2"
                        labelClassName="whitespace-nowrap min-w-[100px]"
                        className={"flex-1"}
                        value={offer?.[field?.name]}
                        name={field?.name}
                        key={offer?.offer_type + field?.name}
                        type={field?.type}
                        label={field?.label}
                        onChange={(e) =>
                          handelChangeField(field?.name, e.target.value)
                        }
                        onFocus={() => onTouched(field?.name)}
                        error={
                          touched?.[field?.name] && errors?.[field?.name]
                            ? errors?.[field?.name]
                            : null
                        }
                        required
                      />
                    );
                  }
                })}
                <InputField
                  containerClassName="flex-1 !flex-row gap-2"
                  labelClassName="whitespace-nowrap order-1"
                  value={offer?.display}
                  name="display"
                  key={offer?.offer_type + "display"}
                  type="checkbox"
                  label="display"
                  onChange={(e) =>
                    handelChangeField("display", e.target.checked)
                  }
                  onFocus={() => onTouched("display")}
                  error={
                    touched?.display && errors?.display ? errors?.display : null
                  }
                  required
                />
              </div>

              <OfferTemplates
                handelChangeField={handelChangeField}
                offer={offer}
                handleChangeRow={handleChangeRow}
                setData={setOfferData}
                data={offerData}
                key={offer?.offer_type}
              />
            </div>
            <FormIncreasable
              key={offer?.offer_type}
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
      </div>
      <Button title="Submit" onClick={onSubmit} />
    </BlockPaper>
  );
}

export default OffersForm;
