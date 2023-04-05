import React from "react";
import { memo } from "react";
import Table from "../../CustomTable/Table";
import TableCol from "../../CustomTable/TableCol";
import TableHead from "../../CustomTable/TableHead";
import { testentry } from "../../../Helpers/Forms/formsApi";
import TableBody from "../../CustomTable/TableBody";
import TableRow from "../../CustomTable/TableRow";
import SuperForm from "../../CustomForm/SuperForm";
import Field from "../../CustomForm/Field";
import InputField from "../../CustomForm/InputField";
import TableHeadCol from "../../CustomTable/TableHeadCol";
import { useEffect } from "react";
import { useContext } from "react";
import { ListsGuidsContext } from "../../../Context/ListsGuidsContext";
import axios from "axios";
const CACHE_LIST = {};
const TestEntryFormTable = ({
  handelChangeEntriesField,
  handelChangeFieldBlur,
  entries,
  allowSelect,
}) => {
  const { addTableList, lists, getGuidName } = useContext(ListsGuidsContext);
  useEffect(() => {
    async function fetch(table) {
      if (lists[table]) return;
      return await axios
        .post(`/list`, {
          table: table,
        })
        .then((res) => {
          let data = res.data.recordset;
          CACHE_LIST[table] = data;
          addTableList(table || "unknown", data || []);
        });
    }
    fetch("account");
    fetch("Currency");
    fetch("cost");
  }, []);

  return (
    <Table className="pb-8 overflow-auto max-h-[420px] dark:border-borderdark">
      <TableHead classes="dark:bg-[#555] dark:text-gray-200">
        <TableHeadCol classes="border border-gray-300 dark:border-borderdark !py-3">
          #
        </TableHeadCol>
        <TableHeadCol classes="border border-gray-300 dark:border-borderdark !py-3">
          AcGuid
        </TableHeadCol>
        <TableHeadCol classes="border border-gray-300 dark:border-borderdark !py-3">
          Debit
        </TableHeadCol>
        <TableHeadCol classes="border border-gray-300 dark:border-borderdark !py-3">
          Credit
        </TableHeadCol>
        <TableHeadCol classes="border border-gray-300 dark:border-borderdark !py-3">
          CurrencyGuid
        </TableHeadCol>
        <TableHeadCol classes="border border-gray-300 dark:border-borderdark !py-3">
          CurrencyVal
        </TableHeadCol>
        <TableHeadCol classes="border border-gray-300 dark:border-borderdark !py-3">
          Note
        </TableHeadCol>
        <TableHeadCol classes="border border-gray-300 dark:border-borderdark !py-3">
          CostGuid
        </TableHeadCol>
        <TableHeadCol classes="border border-gray-300 dark:border-borderdark !py-3">
          ObverseAcGuid
        </TableHeadCol>
      </TableHead>
      <TableBody>
        {Array(20)
          .fill(0)
          .map((r, index) => (
            <TableRow key={`${r}-${index}`}>
              <TableCol classes="!p-0 border dark:border-borderdark text-center">
                {index + 1}
              </TableCol>
              <TableCol classes="!p-0 border dark:border-borderdark">
                <Field
                  allowSelect={allowSelect}
                  tableForHashed="account"
                  className="min-w-[170px] border-0 !rounded-none !h-full"
                  list={CACHE_LIST["account"]}
                  value={entries?.[index]?.["AcGuid"] || ""}
                  // label="AcGuid"
                  name="AcGuid"
                  getSelectedValueWithIndex={handelChangeEntriesField}
                  index={index}
                />
              </TableCol>
              <TableCol classes="!p-0 border dark:border-borderdark">
                <InputField
                  type="number"
                  className="border-0 !rounded-none !h-full"
                  // label="Debit"
                  value={entries?.[index]?.["Debit"] || ""}
                  name="Debit"
                  onChange={(e) =>
                    handelChangeEntriesField(index, "Debit", +e.target.value)
                  }
                  onBlur={(e) =>
                    handelChangeFieldBlur(index, "Debit", e.target.value)
                  }
                />
              </TableCol>
              <TableCol classes="!p-0 border dark:border-borderdark">
                <InputField
                  type="number"
                  // label="credit"
                  value={entries?.[index]?.["Credit"] || ""}
                  name="Credit"
                  className="border-0 !rounded-none !h-full"
                  onChange={(e) =>
                    handelChangeEntriesField(index, "Credit", +e.target.value)
                  }
                  onBlur={(e) =>
                    handelChangeFieldBlur(index, "Credit", e.target.value)
                  }
                />
              </TableCol>
              <TableCol classes="!p-0 border dark:border-borderdark">
                <Field
                  tableForHashed="Currency"
                  className="min-w-[170px] border-0 !rounded-none !h-full"
                  list={CACHE_LIST["Currency"]}
                  value={entries?.[index]?.["CurrencyGuid"] || ""}
                  // label="CurrencyGuid"
                  name="CurrencyGuid"
                  getSelectedValueWithIndex={handelChangeEntriesField}
                  index={index}
                />
              </TableCol>
              <TableCol classes="!p-0 border dark:border-borderdark">
                <InputField
                  type="number"
                  // label="CurrencyVal"
                  value={entries?.[index]?.["CurrencyVal"] || ""}
                  className="border-0 !rounded-none !h-full"
                  name="CurrencyVal"
                  onChange={(e) =>
                    handelChangeEntriesField(
                      index,
                      "CurrencyVal",
                      +e.target.value
                    )
                  }
                />
              </TableCol>
              <TableCol classes="!p-0 border dark:border-borderdark">
                <InputField
                  type="text"
                  // label="Note"
                  value={entries?.[index]?.["Note"] || ""}
                  className="border-0 !rounded-none !h-full"
                  name="Note"
                  onChange={(e) =>
                    handelChangeEntriesField(index, "Note", e.target.value)
                  }
                />
              </TableCol>
              <TableCol classes="!p-0 border dark:border-borderdark">
                <Field
                  tableForHashed="cost"
                  className="min-w-[170px] border-0 !rounded-none !h-full"
                  list={CACHE_LIST["cost"]}
                  // label="CostGuid"
                  value={entries?.[index]?.["CostGuid"] || ""}
                  name="CostGuid"
                  getSelectedValueWithIndex={handelChangeEntriesField}
                  index={index}
                />
              </TableCol>
              <TableCol classes="!p-0 border dark:border-borderdark">
                <Field
                  tableForHashed="account"
                  className="min-w-[170px] border-0 !rounded-none !h-full"
                  list={CACHE_LIST["account"]}
                  value={entries?.[index]?.["ObverseAcGuid"] || ""}
                  name="ObverseAcGuid"
                  getSelectedValueWithIndex={handelChangeEntriesField}
                  index={index}
                />
              </TableCol>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default memo(TestEntryFormTable);
