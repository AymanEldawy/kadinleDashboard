import React, { useState } from "react";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { useQuery } from "@tanstack/react-query";
import {
  getsizeChildren,
  getOnlyParentsize,
  getSizesFilter,
} from "../../Api/data";
import Select from "react-select";

const TYPES = [
  { label: "clothes", value: 1 },
  { label: "shoes", value: 2 },
  { label: "rings", value: 3 },
  { label: "accessories", value: 4 },
  { label: "belt", value: 5 },
];

export const MultiSizeFilter = ({
  filterSize,
  setFilterSize,
  outerChange,
  name,
}) => {
  const { defaultLanguage, defaultRegion } = useGlobalOptions();
  const [selectedSizeType, setSelectedSizeType] = useState({});

  const { data } = useQuery({
    queryKey: [
      "size",
      "filter",
      defaultRegion?.id,
      name,
      selectedSizeType?.value,
    ],
    keepPreviousData: true,
    queryFn: async () => {
      if (!defaultRegion?.id) return;
      const size = await getSizesFilter(
        defaultLanguage?.id,
        selectedSizeType?.value
      );
      return size?.data;
    },
  });

  return (
    <>
      <div className="">
        <p>Size Type</p>
        <Select
          menuPlacement="auto"
          menuPortalTarget={document?.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          className="w-full min-w-[180px]"
          value={TYPES?.find((c) => c?.id === selectedSizeType)}
          onChange={(selected) => {
            setSelectedSizeType(selected);
          }}
          options={TYPES}
        />
      </div>
      <div>
        <p>Size Name</p>
        <Select
          menuPlacement="auto"
          menuPortalTarget={document?.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          className="w-full min-w-[180px]"
          value={data?.find((c) => c?.size_id === filterSize)}
          onChange={(selected) => {
            outerChange(selected?.id);
          }}
          getOptionLabel={(option) => {
            return option?.size_content?.at(0)?.name;
          }}
          getOptionValue={(option) => {
            return option?.id;
          }}
          // components={{ Option: ({ innerProps }) => <option></option> }}
          options={data}
        />
      </div>
    </>
  );
};
