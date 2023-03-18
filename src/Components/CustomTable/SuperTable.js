import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import CheckboxField from "../CustomForm/CheckboxField";
import Table from "./Table";
import TableBody from "./TableBody";
import TableCol from "./TableCol";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

const SuperTable = ({ columns, data, allowSelect }) => {
  const [filterList, setFilterList] = useState(data || []);
  const [selectedList, setSelectedList] = useState({});
  const handelFilter = useCallback((val) => {
    let newList = data?.filter(
      (item) => item?.name?.toLowerCase().indexOf(val?.toLowerCase()) !== -1
    );
    setFilterList(newList);
  }, []);

  const handelSelect = useCallback(
    (itemId) => {
      if (selectedList[itemId]) {
        let newSelectedList = selectedList;
        delete newSelectedList[itemId];
        selectedList(newSelectedList);
      } else {
        setSelectedList((prev) => {
          return {
            ...prev,
            [itemId]: itemId,
          };
        });
      }
    },
    [selectedList]
  );

  const handleSelectedAll = useCallback(
    (e) => {
      if (!e?.target?.checked) {
        setSelectedList({});
      } else {
        let newList = {};
        for (const key in data) {
          newList[data?.[key]?.id] = data?.[key]?.id;
        }
        setSelectedList(newList);
      }
    },
    [selectedList]
  );

  return (
    <Table>
      <TableHead>
        {allowSelect ? <CheckboxField onChange={handleSelectedAll} /> : null}
        {columns?.map((col) => (
          <TableCol head>{col}</TableCol>
        ))}
      </TableHead>
      <TableBody>
        {filterList?.map((row) => (
          <TableRow>
            {allowSelect ? (
              <CheckboxField
                checked={!!selectedList[row?.id]}
                onChange={() => handelSelect(row?.id)}
              />
            ) : null}
            {columns?.map((col) => (
              <TableCol>{row[col]}</TableCol>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SuperTable;
