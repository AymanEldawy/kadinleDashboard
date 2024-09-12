import React from "react";

export const Button = ({ title, onClick, classes, loading, ...props }) => {
  return (
    <button
      disabled={loading}
      onClick={!!onClick ? onClick : undefined}
      className={`rounded-md px-4 py-2 w-28 disabled:bg-gray-200 disabled:text-gray-500 bg-blue-500 gap-3 text-sm flex items-center justify-center hover:shadow active:shadow-md active:bg-blue-300 font-medium text-white ${classes}`}
      {...props}
    >
      {loading ? (
        <span className="animate-pulse flex items-center gap-2">
          Loading...
        </span>
      ) : (
        title
      )}
    </button>
  );
};
