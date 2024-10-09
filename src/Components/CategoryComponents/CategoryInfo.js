import React from "react";

export const CategoryInfo = ({ name, categories }) => {
  return (
    <div className="py-2 border-b my-4 flex items-center justify-between">
      <h3 className="border-l-4 px-2 font-medium capitalize">{name}</h3>
      <p>
        Selected Categories:{" "}
        <span className="text-orange-500 bg-orange-100 rounded-md p-1">
          {categories?.length || 0}
        </span>
      </p>
    </div>
  );
};
