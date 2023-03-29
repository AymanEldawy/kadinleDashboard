import React, { useContext } from "react";
import { ListsGuidsContext } from "../../Context/ListsGuidsContext";
const TableUniqueCol = ({ val, scope, classes }) => {
  const { guidListCached, getGuidName } = useContext(ListsGuidsContext);
  console.log(getGuidName(val), 'testing');
  return (
    <td scope={scope ? scope : 1} className={`px-4 py-2 ${classes}`}>
      {getGuidName(val) || val}
    </td>
  );
};

export default TableUniqueCol;
