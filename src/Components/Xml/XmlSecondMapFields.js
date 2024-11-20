import { QueryClient, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { XMLGetValuesToMap } from "../../Api/xml";
import { XmlSectionWrapper } from "./XmlSectionWrapper";
import { CategoryMultiFilter } from "../TableBar/CategoryMultiFilter";
import { MultiSizeFilter } from "../TableBar/MultiSizeFilter";
import AsyncSelect from "react-select/async";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { useFetch } from "../../hooks/useFetch";
import { getCategoriesMap, getColorsMap, getSizesMap } from "../../Api/data";
import Loading from "../Loading/Loading";
import { LoadingProcess } from "../Global/LoadingProcess";

const FUNCTIONS_MAP = {
  category: getCategoriesMap,
  color: getColorsMap,
  size: getSizesMap,
};

export const XmlSecondMapFields = ({ fileId }) => {
  const { defaultLanguage, defaultRegion } = useGlobalOptions();
  const { getData } = useFetch();
  const queryClient = new QueryClient();
  const [xmlValuesPayload, setXmlValuesPayload] = useState({
    category: [],
    size: [],
    color: [],
  });

  const { data, isLoading } = useQuery({
    queryKey: [fileId],
    keepPreviousData: true,
    queryFn: async () => {
      if (!fileId) return [];
      const response = await XMLGetValuesToMap(fileId);
      console.log("🚀 ~ queryFn: ~ response:", response);
      return response?.data;
    },
  });

  const loadOptions = async (key, value, callback) => {
    try {
      const res = await queryClient.fetchQuery({
        queryKey: ["map", key, defaultLanguage?.id, value],
        queryFn: async () => {
          const fn = FUNCTIONS_MAP?.[key];
          const response = await fn(
            value,
            defaultLanguage?.id,
            defaultRegion?.id
          );
          return response?.data;
        },
      });
      return res;
    } catch (error) {
      return [];
    }
  };
  console.log(isLoading, "--sd");

  return (
    <>
      {isLoading ? <LoadingProcess withBackdrop /> : null}
      <div className="flex flex-col gap-4">
        {data?.category && (
          <XmlSectionWrapper title="Categories">
            {data?.category?.map((cate) => (
              <div className="flex gap-12 items-center" key={cate}>
                <p>{cate}</p>
                <AsyncSelect
                  placeholder={"Categories"}
                  required
                  className="flex-1 min-w-[180px]"
                  cacheOptions
                  onChange={(e) => {
                    const newCategoryItem = {
                      foreign: cate,
                      local: e.value,
                    };

                    setXmlValuesPayload((prevState) => ({
                      ...prevState,
                      category: [...prevState.size, newCategoryItem],
                    }));
                  }}
                  getOptionLabel={(option) =>{
                    console.log(option,'option');
                    
                    return option?.category_content?.at(0)?.title
                  }}
                  getOptionValue={(option) => option?.id}
                  loadOptions={(inputValue) => {
                    loadOptions("category", inputValue);
                  }}
                />{" "}
              </div>
            ))}
          </XmlSectionWrapper>
        )}
        {data?.color && (
          <XmlSectionWrapper title="Colors">
            {data?.color?.map((color) => (
              <div className="flex gap-12 items-center" key={color}>
                <p>{color}</p>
                <AsyncSelect
                  placeholder={"Colors"}
                  required
                  className="flex-1 min-w-[180px]"
                  cacheOptions
                  onChange={(e) => {
                    const newCategoryItem = {
                      foreign: color,
                      local: e.value,
                    };

                    setXmlValuesPayload((prevState) => ({
                      ...prevState,
                      color: [...prevState.size, newCategoryItem],
                    }));
                  }}
                  getOptionLabel={(option) =>
                    option?.color_content?.at(0)?.name
                  }
                  getOptionValue={(option) => option?.id}
                  loadOptions={(inputValue) => {
                    loadOptions("color", inputValue);
                  }}
                />
              </div>
            ))}
          </XmlSectionWrapper>
        )}
        {data?.size && (
          <XmlSectionWrapper title="Sizes">
            {data?.size?.map((size) => (
              <div className="flex gap-12 items-center" key={size}>
                <p>{size}</p>
                <AsyncSelect
                  placeholder={"size"}
                  required
                  className="flex-1 min-w-[180px]"
                  cacheOptions
                  onChange={(e) => {
                    const newCategoryItem = {
                      foreign: size,
                      local: e.value,
                    };

                    setXmlValuesPayload((prevState) => ({
                      ...prevState,
                      size: [...prevState.size, newCategoryItem],
                    }));
                  }}
                  getOptionLabel={(option) => option?.size_content?.at(0)?.name}
                  getOptionValue={(option) => option?.id}
                  loadOptions={(inputValue) => {
                    loadOptions("size", inputValue);
                  }}
                />{" "}
              </div>
            ))}
          </XmlSectionWrapper>
        )}
      </div>
    </>
  );
};
