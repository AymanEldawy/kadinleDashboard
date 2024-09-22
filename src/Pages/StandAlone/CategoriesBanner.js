import React, { useState } from "react";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import SelectField from "../../Components/CustomForm/SelectField";
import { CategoryMultiFilter } from "../../Components/TableBar/CategoryMultiFilter";
import InputField from "../../Components/CustomForm/InputField";
import { Button } from "../../Components/Global/Button";
import { useFetch } from "../../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import { useDelete } from "../../hooks/useDelete";
import { useAdd } from "../../hooks/useAdd";
import { toast } from "react-toastify";
import { getCategoriesBanner } from "../../Api/data";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { FullImage } from "../../Components/Global/FullImage/FullImage";
import { Link } from "react-router-dom";
import { TrashIcon } from "../../Helpers/Icons";
import { LoadingProcess } from "../../Components/Global/LoadingProcess";

const CategoriesBanner = () => {
  const { addItem } = useAdd();
  const { getData } = useFetch();
  const { deleteItem } = useDelete();
  const { defaultLanguage } = useGlobalOptions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [sku, setSku] = useState(null);
  const [selectedList, setSelectedList] = useState({});

  const {
    data: categories,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["Categories", "banners", defaultLanguage?.id],
    queryFn: async () => {
      const response = await getCategoriesBanner(defaultLanguage?.id);
      return response?.data;
    },
  });

  const onSelectAll = (e) => {
    if (e.target.checked) {
      let hash = {};
      for (const category of categories) {
        hash[category?.id] = true;
      }
      setSelectedList(hash);
    } else {
      setSelectedList({});
    }
  };

  const addNewBanner = async (e) => {
    e.preventDefault();

    if (!sku || !categoryId) {
      toast.error(`${sku ? "category" : "sku"} is Required`);
      return;
    }
    setIsSubmitting(true);

    const response = await addItem("categories_banner", {
      sku,
      category_id: categoryId,
    });
    let loading = toast.loading("Please wait...");

    if (!response?.error) {
      toast.update(loading, {
        render: "Successfully added new Category",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      refetch();
    } else {
      toast.update(loading, {
        render: "Oops! failed to add new Category",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
    setIsSubmitting(false);
  };

  const handleDeleteBanner = async (id) => {
    const response = await deleteItem("categories_banner", [id]);
    if (!response?.error) {
      refetch();
    }
  };

  const onDeleteAll = async () => {
    const response = await deleteItem(
      "categories_banner",
      Object.keys(selectedList)
    );
    if (!response?.error) {
      refetch();
      setSelectedList({});
    }
  };

  return (
    <BlockPaper title="categories banner">
      <form
        className="flex items-center gap-4 flex-wrap"
        onSubmit={addNewBanner}
      >
        <CategoryMultiFilter
          name="Category"
          filterCategory={categoryId}
          setFilterCategory={setCategoryId}
        />
        <InputField
          value={sku}
          onChange={(e) => {
            setSku(e.target.value);
          }}
          placeholder="Sku"
          name="sku"
          className="h-[38px]"
        />
        <Button
          loading={isSubmitting}
          title="Submit"
          disabled={!categoryId || !sku}
        />
      </form>

      <div className="h-[1px] border-t my-6" />
      <div className="flex items-center justify-between gap-4 my-4">
        <p className="font-medium text-lg text-gray-700">
          All Results: {categories?.length}
        </p>
        <p className="ml-auto font-medium text-lg text-gray-700">
          Selected Categories: {Object.keys(selectedList)?.length}{" "}
        </p>
        <button
          type="button"
          title="Delete"
          className="bg-red-500 text-sm text-white rounded p-2 font-normal capitalize hover:shadow-md hover:rounded-lg duration-300 disabled:bg-red-200"
          onClick={onDeleteAll}
          disabled={!Object.keys(selectedList)?.length}
        >
          <TrashIcon />
        </button>
      </div>
      <div className="border-y flex items-center bg-gray-200 dark:text-white dark:bg-[#2d2d2d] dark:border-[#343333]">
        <div className="p-2 w-[50px]">
          <input type="checkbox" className="h-5 w-5" onChange={onSelectAll} />
        </div>
        <div className="p-2 flex-1">Category</div>
        <div className="p-2 flex-1">Sku</div>
        <div className="p-2 flex-1">Action</div>
      </div>

      {isLoading ? (
        <LoadingProcess />
      ) : (
        <>
          {categories?.length && !isLoading ? (
            <>
              {categories?.map((cate) => {
                let isSelected = selectedList?.[cate?.id];
                return (
                  <div
                    className={`border-y flex items-center dark:border-[#343333]  dark:text-white ${
                      isSelected ? "bg-gray-100" : ""
                    }`}
                  >
                    <div className="p-2 w-[50px]">
                      <input
                        type="checkbox"
                        className="h-5 w-5"
                        onChange={onSelectAll}
                      />
                    </div>
                    <Link
                      target="_blank"
                      to={`https://kadinle.com/categories/${cate?.category?.id}`}
                      className="p-2 flex-1 text-primary-red font-medium flex items-center hover:shadow-md border border-transparent hover:bg-blue-50"
                    >
                      <FullImage
                        src={cate?.category?.image}
                        alt={cate?.category?.category_content?.at(0)?.title}
                      />
                      {cate?.category?.category_content?.at(0)?.title}
                    </Link>
                    <div className="p-2 flex-1">{cate?.sku}</div>
                    <div className="p-2 flex-1">
                      <button
                        type="button"
                        title="Delete"
                        className="bg-red-500 text-sm text-white rounded p-2 font-normal capitalize hover:shadow-md hover:rounded-lg duration-300 disabled:bg-red-200"
                        onClick={() => handleDeleteBanner(cate?.id)}
                      >
                        <TrashIcon />{" "}
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="text-red-500 bg-red-100 py-2 flex items-center justify-center">
              There are no results!{" "}
            </div>
          )}
        </>
      )}
    </BlockPaper>
  );
};

export default CategoriesBanner;
