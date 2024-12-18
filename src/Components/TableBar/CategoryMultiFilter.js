import React, { useState } from "react";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { useQuery } from "@tanstack/react-query";
import { getCategoryChildren, getOnlyParentCategory } from "../../Api/data";
import Select from "react-select";

export const CategoryMultiFilter = ({
  filterCategory,
  setFilterCategory,
  outerChange,
  name,
  label,
  categoryTitle,
  containerClassName
}) => {
  const { defaultLanguage } = useGlobalOptions();
  const [category, setCategory] = useState(null);
  const [listFilter, setListFilter] = useState({});
  const [listCategories, setListCategories] = useState({});

  const getCategoriesChildren = async (parent_id, level) => {
    if (parent_id === "Select category") return;
    const category = await getCategoryChildren(parent_id, defaultLanguage?.id);
    setListCategories((props) => ({
      ...props,
      [level]: category?.data,
    }));
    return category?.data;
  };

  const { data } = useQuery({
    queryKey: ["category", "parent", defaultLanguage?.id, name],
    keepPreviousData: true,
    queryFn: async () => {
      if (!defaultLanguage?.id) return;
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
    <div className={`flex flex-col gap-1 ${containerClassName}`}>
      {label ? (
        <label
          className={`overflow-hidden text-ellipsis flex gap-4 items-center text-sm font-normal capitalize`}
        >
          {label}{" "}
          {category || categoryTitle ? (
            <span className="text-xs text-blue-500">
              ({categoryTitle || category?.category_content?.at(0)?.title})
            </span>
          ) : null}
        </label>
      ) : null}
      <div className="flex items-center gap-4 overflow-hidden w-full">
        {Object.entries(listCategories)?.map(([key, value]) => {
          return (
            <Select
              menuPlacement="auto"
              menuPortalTarget={document?.body}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
              className="w-full min-w-[180px]"
              value={value?.find((c) => c?.category_id === listFilter[key])}
              onChange={(selected) => {
                let value =
                  selected?.id === "" ? listFilter[key - 1] : selected?.id;
                setCategory(selected);
                setFilterCategory(value);
                outerChange && outerChange(selected);
                getCategoriesChildren(value, key + 1);
                if (+key === 1) {
                  setListFilter({
                    1: value,
                  });
                  setListCategories({
                    1: data,
                  });
                } else {
                  setListFilter((props) => ({
                    ...props,
                    [key]: value,
                  }));
                }
              }}
              getOptionLabel={(option) => {
                return option?.category_content?.at(0)?.title;
              }}
              getOptionValue={(option) => {
                return option?.id;
              }}
              // components={{ Option: ({ innerProps }) => <option></option> }}
              options={value?.sort((a, b) =>
                a?.category_content
                  ?.at(0)
                  ?.title.localeCompare(b?.category_content?.at(0)?.title)
              )}
            />
          );
        })}
      </div>
    </div>
  );
};
