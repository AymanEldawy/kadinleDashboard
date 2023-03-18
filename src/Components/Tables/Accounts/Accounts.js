import React, { useCallback, useMemo, useRef, useState } from "react";
import { FilterIcon } from "../../../Helpers/Icons";
import BlockPaper from "../../BlockPaper/BlockPaper";
import Table from "../../CustomTable/Table";
import { TableBar } from "../../TableBar/TableBar";
import TableBody from "../../CustomTable/TableBody";
import TableCol from "../../CustomTable/TableCol";
import TableHead from "../../CustomTable/TableHead";
import TableRow from "../../CustomTable/TableRow";
import CheckboxField from "../../CustomForm/CheckboxField";
import Modal from "../../Modal/Modal";
import Field from "../../CustomForm/Field";
const list = [
  { id: 1, name: "yellow" },
  { id: 2, name: "red" },
  { id: 3, name: "gray" },
  { id: 4, name: "blue" },
  { id: 5, name: "skyBlue" },
  { id: 6, name: "blueCyan" },
];
const Accounts = () => {
  const refValue = useRef("");
  const [open, setOpen] = useState("");
  const [filterList, setFilterList] = useState(list || []);
  const [selectedList, setSelectedList] = useState({});
  const handelFilter = useCallback((val) => {
    console.log(val);
    let newList = list?.filter(
      (item) => item?.name?.toLowerCase().indexOf(val?.toLowerCase()) !== -1
    );
    setFilterList(newList);
  }, []);

  const handelSelect = useCallback((itemId) => {
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
  }, [selectedList]);
  const handleSelectedAll = useCallback((e) => {
    if (!e?.target?.checked) {
      setSelectedList({});
    } else {
      let newList = {};
      for (const key in list) {
        newList[list?.[key]?.id] = list?.[key]?.id;
      }
      setSelectedList(newList);
    }
    console.log(list);
  }, [selectedList]);
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)} />
      <BlockPaper title="Accounts">
        <TableBar
          onAddClick={() => setOpen(true)}
          onSearchChange={handelFilter}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCol head classes="px-4 py-3">
                <div className="flex">
                  <CheckboxField onChange={handleSelectedAll} />
                  Name
                </div>
              </TableCol>
              <TableCol head classes="px-4 py-3">
                Product name
              </TableCol>
              <TableCol head classes="px-4 py-3">
                Testing
              </TableCol>
              <TableCol head classes="px-4 py-3">
                <div className="flex items-center">
                  Category
                  <a href="#">
                    <FilterIcon />
                  </a>
                </div>
              </TableCol>
              <TableCol head classes="px-4 py-3">
                <div className="flex items-center">
                  Price
                  <a href="#">
                    <FilterIcon />
                  </a>
                </div>
              </TableCol>
              <TableCol head classes="px-4 py-3">
                <span className="sr-only">Edit</span>
              </TableCol>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterList?.map((item) => (
              <TableRow key={item?.id} classes="bg-white  border-b">
                <TableCol
                  head
                  scope="row"
                  classes="px-4 font-medium text-gray-700 whitespace-nowrap"
                >
                  <div className="flex">
                    <CheckboxField
                      checked={!!selectedList[item?.id]}
                      onChange={() => handelSelect(item?.id)}
                    />
                    <Field list={list} getSelectedValue={refValue} onPlusClick={() => setOpen(true)} />
                  </div>
                </TableCol>
                <TableCol>Silver</TableCol>
                <TableCol>Laptop</TableCol>
                <TableCol>$2999</TableCol>
                <TableCol>$2999</TableCol>
                <TableCol classes="px-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </TableCol>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </BlockPaper>
    </>
  );
};

export default Accounts;
