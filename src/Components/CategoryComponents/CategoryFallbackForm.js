import React, { useEffect, useState } from "react";
import { CategoryMultiFilter } from "../TableBar/CategoryMultiFilter";
import { Button } from "../Global/Button";
import { CategoryInfo } from "./CategoryInfo";
import { LoadingProcess } from "../Global/LoadingProcess";
import { toast } from "react-toastify";

export const CategoryFallbackForm = ({
  onClickCancel,
  CACHE_CATEGORIES,
  oldCategories,
  updateCategory,
  name
}) => {
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=> {
    if(oldCategories?.length)
      setCategories(oldCategories)
  }, [oldCategories])

  const addNewCategory = () => {
    setCategories((prev) => [...prev, categoryId]);
    setCategoryId(null);
  };

  const deleteCategory = (categoryId) => {
    setCategories((prev) => prev?.filter((c) => c !== categoryId));
  };

  const handleUpdateCategory = async () => {
    setIsLoading(true);
    const res = await updateCategory(categories);
    if(res?.error) {
      toast.error('Failed to save data')
    } else {
      toast.success('Successfully save data')
    }
    setIsLoading(false);
  };
console.log(categories,'categories');

  return (
    <div>
      {isLoading ? <LoadingProcess /> : null}
      <CategoryInfo name={name} categories={categories} />
      <p className="mb-2">Selected new category</p>
      <div className="flex gap-2">
        <CategoryMultiFilter
          filterCategory={categoryId}
          setFilterCategory={setCategoryId}
        />
        <Button
          title="Add"
          disabled={!categoryId}
          classes="text-xs capitalize"
          onClick={addNewCategory}
        />
      </div>
      <div className="bg-gray-100 p-4 my-4 border rounded-md flex flex-wrap gap-2">
        {categories?.length ? (
          <>
            {categories?.map((cate) => (
              <button
                className="hover:bg-red-100 hover:text-red-500 hover:line-through rounded-md bg-gray-100 border px-2 py-1 text-sm"
                onClick={() => deleteCategory(cate)}
              >
                {" "}
                {CACHE_CATEGORIES[cate]}
              </button>
            ))}
          </>
        ) : (
          <p className="text-red-500 text-center italic px-2 py-1 flex-1">
            No selected categories
          </p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <button
          disabled={isLoading}
          onClick={onClickCancel}
          className="bg-red-50 text-red-500 text-sm px-4 py-2 rounded-md hover:bg-red-500 hover:text-white duration-300"
        >
          Cancel
        </button>
        <Button
          title="Save Categories"
          classes="text-xs capitalize whitespace-nowrap"
          onClick={handleUpdateCategory}
          disabled={isLoading || !categories?.length}
        />
      </div>
    </div>
  );
};
