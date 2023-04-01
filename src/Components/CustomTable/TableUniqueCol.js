import React, { memo, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { ListsGuidsContext } from "../../Context/ListsGuidsContext";
const TableUniqueCol = ({ col, val, row, scope, reffedTables, classes }) => {
  const { guidListCached, getGuidName } = useContext(ListsGuidsContext);
  let v = useMemo(() => {
    return guidListCached[col] || getGuidName(reffedTables?.[col], val);
  }, [val]);
  return (
    <td scope={scope ? scope : 1} className={`px-4 py-2 ${classes}`}>
      <Link
        className="text-blue-500"
        to={`/update/${reffedTables?.[col]}/${val}`}
        state={{ row, table: reffedTables?.[col] }}
      >
        {v}
      </Link>
    </td>
  );
};

export default TableUniqueCol //memo();
