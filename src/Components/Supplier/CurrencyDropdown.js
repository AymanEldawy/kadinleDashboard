import React, { useState } from "react";

const CurrencyDropdown = ({ data, selectedCurrency, setSelectedCurrency }) => { 
  
console.log("selectedCurrency", selectedCurrency);
  const handleSelect = (event) => {
    const selectedName = event.target.value;
    const selectedObject = data.find(
      (currency) => currency.name === selectedName
    );
    setSelectedCurrency(selectedObject);
  };

  return (
    <div>
     
      <select
        id="currency"
        value={selectedCurrency ? selectedCurrency.name : ""}
        onChange={handleSelect}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
      >
        <option value="" disabled>
          Select a Currency
        </option>
        {data?.map((currency) => (
          <option key={currency?.id} value={currency?.name}>
            {currency?.name}
          </option>
        ))}
      </select>
  
    </div>
  );
};

export default CurrencyDropdown;
