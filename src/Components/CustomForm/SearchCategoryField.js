import React from "react";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { getCategoriesList } from "../../Api/data";
import AsyncSelect from "react-select/async";

const SearchCategoryField = ({ onChange }) => {
  const { defaultLanguage } = useGlobalOptions();
  const queryClient = new QueryClient();
  const loadOptions = async (value, callback) => {
    try {
      const res = await queryClient.fetchQuery({
        queryKey: ["category", defaultLanguage?.id, value],
        queryFn: async () => {
          const response = await getCategoriesList(defaultLanguage?.id, value);
          console.log("🚀 ~ queryFn: ~ response:", response);
          return response;
        },
      });
      return res;
    } catch (error) {
      return [];
    }
  };

  return (
    <AsyncSelect
      className="flex-1 min-w-[150px]"
      cacheOptions
      loadOptions={loadOptions}
      getOptionLabel={({ title }) => title}
      getOptionValue={({ category_id }) => category_id}
      onChange={(value) => {
        console.log("🚀 ~ SearchCategoryField ~ value:", value);
        onChange(value);
      }}
    />
  );
};

export default SearchCategoryField;
