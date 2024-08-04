import React from "react";
import TableRow from "./TableRow";
import TableCol from "./TableCol";

export const TableSkeleton = ({ columns }) => {
  let len = columns?.length ? columns : Array(8).fill(0);
  return (
    <>
      {len?.map((r, index) => (
        <TableRow key={index}>
          {Array(8)
            .fill(0)
            ?.map((item, i) => (
              <TableCol key={i}>
                <div className="w-full h-4 rounded-md bg-gray-100 dark:bg-[#ffffff20] animate-pulse " />{" "}
              </TableCol>
            ))}
        </TableRow>
      ))}
    </>
  );
};
