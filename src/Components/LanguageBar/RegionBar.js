import React from "react";
import { useState } from "react";

import { useGlobalOptions } from "../../Context/GlobalOptions";

const RegionBar = () => {
  const { regions, setDefaultSettings, defaultRegion } = useGlobalOptions();
  const [open, setOpen] = useState(false);
  console.log("called", regions);
  return (
    <div className="relative">
      {open ? (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black opacity-75"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <button
        className="p-2 rounded-full hover:bg-[#0002] relative"
        onClick={() => setOpen(true)}
      >
        {defaultRegion?.name || "EN"}
      </button>

      {open ? (
        <ul className="absolute bg-white left-0 p-3 px-6 min-w-[200px] dark:bg-bgmaindark shadow rounded-md top-12 z-50 text-gray-500 text-sm flex flex-col gap-3">
          {regions?.map((region) => (
            <li
              key={region?.id}
              onClick={() => {
                setDefaultSettings("region", region);
                setOpen(false);
              }}
              className="flex items-center gap-4 cursor-pointer font-medium hover:text-gray-900 dark:hover:text-gray-200"
            >
              {region?.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default RegionBar;
