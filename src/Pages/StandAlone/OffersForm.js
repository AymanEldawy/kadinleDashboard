import { v4 as uuidv4 } from "uuid";
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
import {
  getAllProductsId,
  getCacheCategory,
  getGroup2ProductIds,
  getOfferCategory,
  getOfferCountry,
  getOfferData,
  getOfferProducts,
  getProductsByCategoryId,
  getProductsList,
} from "../../Api/data";
import { LoadingProcess } from "../../Components/Global/LoadingProcess";
import { SelectCountries } from "../../Components/OfferTemplates/SelectCountries";
import { CategoryFallbackForm } from "../../Components/CategoryComponents/CategoryFallbackForm";
import { GeneralOfferTemplate } from "../../Components/OfferTemplates/GeneralOfferTemplate";
import {
  getDiscountIcon,
  getFormatPrice,
  processBatch,
} from "../../Helpers/functions";

function OffersForm() {
  const hash_id = uuidv4();
  const navigate = useNavigate();
  const params = useParams();
  const { languages, defaultLanguage } = useGlobalOptions();
  const { addItem } = useAdd();
  const { deleteItem } = useDelete();
  const { getData } = useFetch();
  const { upsertItem, updateItem } = useUpdate();
  const [offer, setOffer] = useState({});
  const [selectedCountries, setSelectedCountries] = useState({});
  const [offerContent, setOfferContent] = useState({});
  const [offerData, setOfferData] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [countries, setCountries] = useState([]);
  const [toggleStage, setToggleStage] = useState(true);
  const [isProgress, setIsProgress] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const { data: oldOfferData } = useQuery({
    queryKey: ["offer", params?.id],
    queryFn: async () => {
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
      // const tableName = TABLES_NAMES?.[offer?.offer_type];
      const offerDataResponse = await getOfferData("offer_tier", params?.id);
      if (!offerDataResponse?.error) {
        let hash = {};
        for (const item of offerDataResponse?.data) {
          hash[item?.id] = item;
        }
        setOfferData(hash);
        return hash;
      }
      if (offer?.offer_type === "FLASH") {
        const category = await getData(
          "category",
          offer?.category_id,
          "content"
        );
        setCategory(
          category?.find((c) => c?.language_id === defaultLanguage?.id)
        );
      }
    },
    enabled: !!params?.id && !!defaultLanguage?.id,
  });

  const { data: currencies } = useQuery({
    queryKey: ["offer", "products", params?.id],
    queryFn: async () => {
      const response = await getData("currency");
      return response;
    },
  });

  const { data: param_ignore_ids } = useQuery({
    queryKey: ["offer", "products", "ignored", params?.id],
    queryFn: async () => {
      const response = await getGroup2ProductIds(params?.id);
      console.log("🚀 ~ queryFn: ~ response:", response)
      return response;
    },
  });

  const { data: oldProducts } = useQuery({
    queryKey: ["offer", "products_list", params?.id],
    queryFn: async () => {
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
    enabled: !!params?.id,
  });

  // const { data: oldCategories } = useQuery({
  //   queryKey: ["offer", "category", params?.id],
  //   queryFn: async () => {
  //     const response = await getOfferCategory(params?.id);
  //     let hashCategory = {};
  //     for (const category of response?.data) {
  //       hashCategory[category?.category_id] = category;
  //     }
  //     setCountries(Object.keys(hashCategory));
  //     setSelectedCategories(Object.keys(hashCategory));
  //     return hashCategory;
  //   },
  //   enabled: !!params?.id,
  // });

  const { data: oldCountries } = useQuery({
    queryKey: ["offer", "country", params?.id],
    queryFn: async () => {
      const response = await getOfferCountry(params?.id);
      let hashCountry = {};
      for (const country of response?.data) {
        hashCountry[country?.country_id] = country;
      }
      setCountries(Object.keys(hashCountry));
      return hashCountry;
    },
    enabled: !!params?.id,
  });

  // const { data: CACHE_CATEGORIES } = useQuery({
  //   queryKey: ["CACHE_CATEGORIES", "category", defaultLanguage?.id],
  //   queryFn: async () => {
  //     return await getCacheCategory(defaultLanguage?.id);
  //   },
  //   enabled: !!defaultLanguage?.id,
  // });

  useEffect(() => {
    setOfferData({
      [uuidv4()]: {},
    });
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

  const handelChangeField = (name, value, required) => {
    if (required) {
      insertIntoErrors(name, value);
    }
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
    setOffer((prev) => {
      return {
        ...prev,
        [name]: e.target.files[0],
      };
    });
  };

  const onSubmit = async () => {
    if (offer?.offer_type !== "GENERAL") {
      if (!offer?.icon || !offer?.hex) {
        toast.error(`Please fill required fields`);
        return;
      }
      if (!Object.values(offerContent)?.at(0)?.name) {
        toast.error(`Offer name is required`);
        return;
      }

      if (Object.values(offerContent)?.length < 3) {
        toast.error(`Offer content must be with all languages`);
        return;
      }
    }

    if (offer?.offer_type === "ITEMS") {
      for (const item of Object.values(offerData)) {
        if (!item?.minimum_order_count || !item?.discount_value) {
          toast.error(`Please fill the required fields in offer data`);
          return;
        }
      }
    }

    if (offer?.select_product_type === 1 && !selectedCategory) {
      toast.error(`Please select category for products`);
      return;
    }

    if (offer?.offer_type === "FLASH") {
      offer.category_id = selectedCategory;
    }

    setIsProgress(true);
    let icon = null;

    if (typeof offer?.icon === "object") {
      icon = offer?.icon;
      delete offer?.icon;
    }
    try {
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

        await insertIntoOfferData(offer_id || params?.id);
        await insertProducts();
        await insertOfferList(
          offer_id || params?.id,
          countries,
          oldCountries,
          "country_id",
          "offer_countries"
        );

        setIsProgress(false);

        toast.success(
          `Great! successfully ${params?.id ? "Updated" : "added"} offer`
        );
        if (!params?.id) navigate("/offers");
      }
    } catch (error) {
      toast.error(`Oops! failed to ${params?.id ? "Updated" : "added"} offer`);
    }
  };

  const insertProducts = async (offer_id) => {
    let list = Object.keys(rowSelection);

    if (offer?.select_product_type === 1 && selectedCategory) {
      const response = await getProductsByCategoryId(selectedCategory);
      list = response?.data;
    }
    if (offer?.select_product_type === 2) {
      const response = await getAllProductsId();
      list = response?.data;
    }
    try {
      await insertOfferList(
        offer_id || params?.id,
        list,
        oldProducts,
        "product_id",
        "offer_product",
        !!offer?.select_product_type,
        true
      );
    } catch (err) {}
  };

  const insertIntoOfferData = async (offer_id) => {
    const list = Object.values(offerData);
    const inserted = [];
    const updated = [];

    for (const item of list) {
      if (item?.discount_type === "amount") {
        if (item?.minimum_order_count)
          item.minimum_order_count = getFormatPrice(
            item?.minimum_order_count,
            selectedCurrency
          );
        if (item?.discount_value)
          item.discount_value = getFormatPrice(
            item?.discount_value,
            selectedCurrency
          );
      }

      if (item?.id) updated.push(item);
      else
        inserted.push({
          offer_id,
          ...item,
        });
    }
    // const tableName = TABLES_NAMES?.[offer?.offer_type];

    try {
      if (inserted?.length) await addItem("offer_tier", inserted);
      if (updated?.length) await upsertItem("offer_tier", updated);
    } catch (error) {
      console.error("Error processing offer list:", error);
      throw error;
    }
  };

  const insertOfferList = async (
    offer_id,
    newList,
    oldList = {},
    item_id,
    tableName,
    isObject,
    isProductsProcess
  ) => {
    if (!newList) return;
    let insertedList = [];
    let updatedList = [];
    let list = oldList;

    for (const key of newList) {
      let item = isObject ? key?.[item_id] : key;
      if (list?.[item]) {
        updatedList.push(list?.[item]);
        delete list[item];
      } else {
        insertedList.push({
          [item_id]: item,
          offer_id,
        });
      }
    }

    try {
      await Promise.all([
        updatedList.length > 0 &&
          processBatch(updatedList, async (batchList) => {
            await upsertItem(tableName, batchList);
          }),

        insertedList.length > 0 &&
          processBatch(insertedList, async (batchList) => {
            await addItem(tableName, batchList);
          }),

        Object.keys(list).length > 0 &&
          processBatch(
            Object.keys(list),
            async (batchList, i, totalBatches) => {
              await deleteItem(tableName, batchList, item_id, false);
              toast.success(`Processing batch ${i + 1} of ${totalBatches}...`);
            }
          ),
      ]);
      console.log("Offer list processing completed.");
    } catch (error) {
      console.error("Error processing offer list:", error);
      throw error;
    }
  };

  return (
    <BlockPaper
      title={"Offer"}
      headerClassName="flex flex-wrap justify-between"
      contentBar={
        <div className="flex max-md:flex-wrap gap-4 items-center min-w-[50%]">
          <InputField
            containerClassName="!flex-row gap-2"
            labelClassName="whitespace-nowrap order-2"
            className="!w-5 !h-5"
            checked={offer?.is_seasonal}
            name="is_seasonal"
            type="checkbox"
            label="is seasonal"
            onChange={(e) => handelChangeField("is_seasonal", e.target.checked)}
            onFocus={() => onTouched("is_seasonal")}
            error={
              touched?.is_seasonal && errors?.is_seasonal
                ? errors?.is_seasonal
                : null
            }
          />
          <SelectField
            containerClassName="!flex-row !gap-2 w-full min-w-[140px]"
            placeholder="Group"
            list={[
              { id: 1, name: "Group 1" },
              { id: 2, name: "Group 2" },
            ]}
            value={offer?.group}
            keyLabel="name"
            keyValue="id"
            readOnly={offer?.offer_type}
            onChange={(option) => {
              setOffer((prev) => ({
                ...prev,
                group: option?.id,
              }));
            }}
          />
          <SelectField
            containerClassName="!flex-row !gap-2 w-full min-w-[140px]"
            placeholder="Select offer"
            list={OFFER_TYPES?.filter((o) => o?.group === offer?.group)}
            required
            keyLabel="label"
            keyValue="offer_type"
            readOnly={offer?.offer_type}
            value={offer?.offer_type}
            onChange={(option) => {
              setOffer((prev) => ({
                group: prev?.group,
                offer_type: option?.offer_type,
              }));
            }}
          />
          {!offer?.currency_id && params?.id ? null : (
            <SelectField
              containerClassName="!flex-row !gap-2 w-full"
              placeholder="Currency"
              list={currencies}
              readOnly={params?.id}
              value={offer?.currency_id}
              keyLabel="code"
              onChange={(option) => {
                setOffer((prev) => ({
                  ...prev,
                  currency_id: option?.id,
                }));
                setSelectedCurrency(option);
              }}
            />
          )}

          <button
            disabled={!offer?.offer_type}
            onClick={() => setToggleStage((p) => !p)}
            className={`${
              toggleStage ? "bg-primary-green" : "bg-primary-red"
            } disabled:bg-gray-100 disabled:text-gray-300 px-4 py-1 rounded-md whitespace-nowrap text-white capitalize`}
          >
            {toggleStage ? "Show Products" : "hide Products"} (
            {Object.keys(rowSelection)?.length})
          </button>
        </div>
      }
    >
      <div className={`relative ${offer?.offer_type ? "" : "hidden"}`}>
        {isProgress ? <LoadingProcess /> : null}

        {toggleStage ? (
          <>
            {offer?.offer_type === "GENERAL" ? (
              <GeneralOfferTemplate
                offer={offer}
                handelChangeField={handelChangeField}
                handleChangeRow={handleChangeRow}
                setData={setOfferData}
                data={offerData}
              />
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div
                    className={`grid grid-cols-2 gap-2 mb-4 3 p-4 items-end rounded-md bg-gray-100 border`}
                  >
                    {OFFER_FIELDS?.map((field) => {
                      if (field?.key === "image") {
                        return (
                          <UploadFile
                            boxContainerClassName="bg-white flex-1"
                            src={offer?.[field?.name]}
                            name={field?.name}
                            // key={offer?.offer_type + field?.name}
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
                            labelClassName="whitespace-nowrap min-w-[100px]"
                            value={offer?.[field?.name]}
                            name={field?.name}
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
                      containerClassName="flex-1 !flex-row gap-2 items-center"
                      labelClassName="whitespace-nowrap order-1"
                      value={offer?.display}
                      name="display"
                      checked={offer?.display}
                      type="checkbox"
                      label="display"
                      onChange={(e) =>
                        handelChangeField("display", e.target.checked)
                      }
                      onFocus={() => onTouched("display")}
                      error={
                        touched?.display && errors?.display
                          ? errors?.display
                          : null
                      }
                      required
                    />
                  </div>
                  <SelectCountries
                    countries={countries}
                    setCountries={setCountries}
                  />
                </div>
                <OfferTemplates
                  offer={offer}
                  handelChangeField={handelChangeField}
                  handleChangeRow={handleChangeRow}
                  setData={setOfferData}
                  data={offerData}
                />
                <FormIncreasable
                  // key={offer?.offer_type}
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
            )}
          </>
        ) : (
          <>
            {/* <CategoryFallbackForm
              setSelectedCategories={setSelectedCategories}
              CACHE_CATEGORIES={CACHE_CATEGORIES}
              oldCategories={oldCategories}
              hideActions
            />{" "} */}
            <SelectedProductTable
              onSaveChanges={onSubmit}
              tableName={"products slider"}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              setSelectedCategory={setSelectedCategory}
              param_ignore_ids={param_ignore_ids}
              categoryTitle={category?.title || ""}
              hideCategoryFilter={offer?.select_product_type === 2}
              extraContent={
                <SelectField
                  name="select_product_type"
                  label="select product type"
                  list={[
                    { id: 0, name: "Custom" },
                    { id: 1, name: "Select all in category" },
                    { id: 2, name: "Select all" },
                  ]}
                  onChange={(option) => {
                    setOffer((prev) => ({
                      ...prev,
                      select_product_type: option?.id,
                    }));
                  }}
                />
              }
            />
          </>
        )}
      </div>
      <Button
        title="Submit"
        onClick={onSubmit}
        disabled={Object.keys(offerContent)?.length < 3}
      />
    </BlockPaper>
  );
}

export default OffersForm;
