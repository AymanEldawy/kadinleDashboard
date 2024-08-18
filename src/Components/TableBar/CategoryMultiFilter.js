import React, { useState } from "react";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { useQuery } from "@tanstack/react-query";
import { getCategoryChildren, getOnlyParentCategory } from "../../Api/data";

export const CategoryMultiFilter = ({ filterCategory, setFilterCategory }) => {
  const { defaultLanguage } = useGlobalOptions();
  const [listFilter, setListFilter] = useState({});
  const [listCategories, setListCategories] = useState({});

  const getCategoriesChildren = async (parent_id, level) => {
    const category = await getCategoryChildren(parent_id, defaultLanguage?.id);
    setListCategories((props) => ({
      ...props,
      [level]: category?.data,
    }));
    // if (category?.data?.length) {
    // }
    return category?.data;
  };

  const { data } = useQuery({
    queryKey: ["category", "parent", defaultLanguage?.id],
    keepPreviousData: true,
    queryFn: async () => {
      const category = await getOnlyParentCategory(defaultLanguage?.id);
      setListCategories({
        1: category?.data,
      });
      setListFilter({
        1: "",
      });
      return category?.data;
    },
  });

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {Object.entries(listCategories)?.map(([key, value]) => {
        return (
          <select
            className="border p-2 rounded-md"
            value={listFilter[key]}
            onChange={(e) => {
              let value =
                e.target.value === "" ? listFilter[key - 1] : e.target.value;
              setFilterCategory(value);
              getCategoriesChildren(value, key + 1);
              if (key == 1) {
                setListFilter({
                  1: value,
                });
                setListCategories({
                  1: data,
                });
              } else {
                setListFilter((props) => ({
                  ...props,
                  [key]: e.target.value,
                }));
              }
            }}
          >
            {value?.length ? (
              <>
                <option selected>Select category</option>
                {value?.map((category) => (
                  <option value={category?.id}>
                    {category?.category_content?.at(0)?.title}
                  </option>
                ))}
              </>
            ) : (
              <option disabled selected>
                Empty list
              </option>
            )}
          </select>
        );
      })}
    </div>
  );
};
