import React, { useState } from "react";
import Select from "react-select";

const CurrencyDropdown = ({ data, selectedCurrency, setSelectedCurrency }) => {
  const handleSelect = (value) => {
    setSelectedCurrency(value);
    localStorage.setItem("selectedCurrency", JSON.stringify(value));
  };
  

  return (
    <div>
      <Select
        menuPlacement="auto"
        menuPortalTarget={document?.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        placeholder="Select Currency"
        className=""
        options={data}
        getOptionLabel={({ name }) => name}
        getOptionValue={({ id }) => id}
        value={selectedCurrency}
        onChange={(value) => {
          console.log("🚀 ~ CurrencyDropdown ~ value:", value)
          handleSelect(value);
        }}
      />
    </div>
  );
};

export default CurrencyDropdown;
