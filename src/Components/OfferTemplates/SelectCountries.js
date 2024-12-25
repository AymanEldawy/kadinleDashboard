import React, { useEffect, useState } from "react";
import { Button } from "../Global/Button";
import { LoadingProcess } from "../Global/LoadingProcess";
import { toast } from "react-toastify";
import SelectField from "../CustomForm/SelectField";
import { useQuery } from "@tanstack/react-query";
import { useFetch } from "../../hooks/useFetch";

export const SelectCountries = ({
  onClickCancel,
  oldCountries,
  updateCountry,
  hideAction,
  setCountries,
  countries,
  name,
}) => {
  const { getData } = useFetch();
  const [countryId, setCountryId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: CACHE_COUNTRIES } = useQuery({
    queryKey: ["country"],
    queryFn: async () => {
      const response = await getData("country");
      let hash = {};
      for (const country of response) {
        hash[country?.id] = country?.name;
      }
      return {
        hash,
        data: response,
      };
    },
  });

  const addNewCountry = () => {
    setCountries((prev) => [...prev, countryId]);
    setCountryId(null);
  };

  const deleteCountry = (countryId) => {
    setCountries((prev) => prev?.filter((c) => c !== countryId));
  };

  return (
    <div className="w-full">
      {isLoading ? <LoadingProcess /> : null}
      <p className="mb-2">Selected new country</p>
      <div className="flex gap-2">
        <SelectField
          containerClassName="!flex-row !gap-2 w-full"
          placeholder="Select Country"
          list={CACHE_COUNTRIES?.data}
          keyLabel="name"
          keyValue="id"
          // value={countries?.find((c) => c?.name === offer?.country_id)}
          onChange={(option) => {
            setCountryId(option?.id);
          }}
        />
        <Button
          title="Add"
          disabled={!countryId}
          classes="text-xs capitalize"
          onClick={addNewCountry}
        />
      </div>
      <div className="bg-gray-100 p-4 my-4 border rounded-md flex flex-wrap gap-2">
        {countries?.length ? (
          <>
            {countries?.map((country, index) => (
              <button
                key={country || index}
                className="hover:bg-red-100 hover:text-red-500 hover:line-through rounded-md bg-gray-100 border px-2 py-1 text-sm"
                onClick={() => {
                  if (country) deleteCountry(country);
                }}
              >
                {" "}
                {CACHE_COUNTRIES?.hash?.[country]}
              </button>
            ))}
          </>
        ) : (
          <p className="text-red-500 text-center italic px-2 py-1 flex-1">
            No selected countries
          </p>
        )}
      </div>
    </div>
  );
};
