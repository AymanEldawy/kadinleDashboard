import React, { useState } from "react";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { QueryClient, useQuery } from "@tanstack/react-query";
import {
  getCategoryChildren,
  getCategorySearch,
  getOnlyParentCategory,
} from "../../Api/data";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { CategoryFilter } from "./CategoryFilter";

export const CategoryMultiFilter = ({
  filterCategory,
  setFilterCategory,
  outerChange,
  name,
}) => {
  return (
    <CategoryFilter
      filterCategory={filterCategory}
      setFilterCategory={setFilterCategory}
      outerChange={outerChange}
      name={name}
    />
  );
  const [key, setKey] = useState(1);
  const { defaultLanguage } = useGlobalOptions();
  const queryClient = new QueryClient();

  // const { data: loadOptions } = useQuery({
  //   queryKey: ["category", "search", defaultLanguage?.id, name],
  //   keepPreviousData: true,
  //   queryFn: async () => {
  //     if (!defaultLanguage?.id) return;
  //     const category = await getCategorySearch(defaultLanguage?.id, key);
  //     return category?.data;
  //   },
  // });

  const loadOptions = async (value, callback) => {
    try {
      const res = await queryClient.fetchQuery({
        queryKey: ["category", "search", defaultLanguage?.id, key, value],
        queryFn: async () => {
          if (!defaultLanguage?.id) return;
          const category = await getCategorySearch(
            defaultLanguage?.id,
            key,
            value
          );
          return category?.data;
        },
      });
      return res;
    } catch (error) {
      return [];
    }
  };

  return (
    <div className="flex overflow-hidden border">
      {/* <Select
        menuPlacement="auto"
        menuPortalTarget={document?.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        label="selected filter"
        options={[
          { label: "sku", value: 1 },
          { label: "title", value: 2 },
        ]}
      /> */}
      <button
        className={`p-2 bg-gray-100 ${
          key === 1 ? "!bg-orange-500 text-white" : ""
        }`}
        onClick={() => setKey(1)}
      >
        Sku
      </button>
      <button
        className={`p-2 bg-gray-100 ${
          key === 2 ? "!bg-orange-500 text-white" : ""
        }`}
        onClick={() => setKey(2)}
      >
        Title
      </button>
      <AsyncSelect
        className="w-full min-w-[180px]"
        menuPlacement="auto"
        menuPortalTarget={document?.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        cacheOptions
        loadOptions={loadOptions}
        // getOptionLabel={({ title }) => title}
        // getOptionValue={({ category_id }) => category_id}
        getOptionLabel={(option) => {
          return option?.category_content?.at(0)?.title;
        }}
        getOptionValue={(option) => {
          return option?.id;
        }}
        onChange={(value) => {
          setFilterCategory(value?.id);
        }}
      />
    </div>
  );
};
