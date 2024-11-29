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
  
  return (
    <>
      {isLoading ? <LoadingProcess withBackdrop /> : null}
      <div className="flex flex-col gap-4">
        {data?.category && (
          <XmlSectionWrapper title={`Categories (${data?.category?.length})`}>
            {data?.category?.map((cate) => (
              <div
                className="flex gap-12 items-center border-b p-2 hover:bg-white duration-300 hover:shadow justify-between"
                key={cate}
              >
                <p>{cate}</p>
                <AsyncSelect
                  placeholder={"Categories"}
                  required
                  className="flex-1 max-w-[250px]"
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
                  getOptionLabel={(option) => {

                    return option?.category_content?.at(0)?.title;
                  }}
                  getOptionValue={(option) => option?.id}
                  loadOptions={(inputValue) => {
                    return loadOptions("category", inputValue);
                  }}
                />{" "}
              </div>
            ))}
          </XmlSectionWrapper>
        )}
        {data?.color && (
          <XmlSectionWrapper title={`Colors (${data?.color?.length})`}>
            {data?.color?.map((color) => (
              <div
                className="flex gap-12 items-center border-b p-2 hover:bg-white duration-300 hover:shadow"
                key={color}
              >
                <p>{color}</p>
                <AsyncSelect
                  placeholder={"Colors"}
                  required
                  className="flex-1 max-w-[250px]"
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
                    return loadOptions("color", inputValue);
                  }}
                />
              </div>
            ))}
          </XmlSectionWrapper>
        )}
        {data?.size && (
          <XmlSectionWrapper title={`Sizes (${data?.size?.length})`}>
            {data?.size?.map((size) => (
              <div
                className="flex gap-12 items-center border-b p-2 hover:bg-white duration-300 hover:shadow"
                key={size}
              >
                <p>{size}</p>
                <AsyncSelect
                  placeholder={"size"}
                  required
                  className="flex-1 max-w-[250px]"
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
                    return loadOptions("size", inputValue);
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
