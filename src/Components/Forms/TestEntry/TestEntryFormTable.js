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
const TestEntryFormTable = ({
  handelChangeEntriesField,
  handelChangeFieldBlur,
}) => {
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
                  table="account"
                  className="min-w-[170px] border-0"
                  list={[]}
                  // label="AcGuid"
                  name="AcGuid"
                  getSelectedValueWithIndex={handelChangeEntriesField}
                  index={index}
                />
              </TableCol>
              <TableCol classes="!p-0 border dark:border-borderdark">
                <InputField
                  type="number"
                  className="border-0"
                  // label="Debit"
                  name="Debit"
                  onChange={(e) =>
                    handelChangeEntriesField(index, "Debit", e.target.value)
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
                  name="Credit"
                  className="border-0"
                  onChange={(e) =>
                    handelChangeEntriesField(index, "Credit", e.target.value)
                  }
                  onBlur={(e) =>
                    handelChangeFieldBlur(index, "Credit", e.target.value)
                  }
                />
              </TableCol>
              <TableCol classes="!p-0 border dark:border-borderdark">
                <Field
                  table="Currency"
                  className="min-w-[170px] border-0"
                  list={[]}
                  // label="CurrencyGuid"
                  name="CurrencyGuid"
                  getSelectedValue={handelChangeEntriesField}
                />
              </TableCol>
              <TableCol classes="!p-0 border dark:border-borderdark">
                <InputField
                  type="number"
                  // label="CurrencyVal"
                  className="border-0"
                  name="CurrencyVal"
                  onChange={(e) =>
                    handelChangeEntriesField(
                      index,
                      "CurrencyVal",
                      e.target.value
                    )
                  }
                />
              </TableCol>
              <TableCol classes="!p-0 border dark:border-borderdark">
                <InputField
                  type="text"
                  // label="Note"
                  className="border-0"
                  name="Note"
                  onChange={(e) =>
                    handelChangeEntriesField(index, "Note", e.target.value)
                  }
                />
              </TableCol>
              <TableCol classes="!p-0 border dark:border-borderdark">
                <Field
                  table="cost"
                  className="min-w-[170px] border-0"
                  list={[]}
                  // label="CostGuid"

                  name="CostGuid"
                  getSelectedValue={handelChangeEntriesField}
                />
              </TableCol>
              <TableCol classes="!p-0 border dark:border-borderdark">
                <Field
                  table="account"
                  className="min-w-[170px] border-0"
                  list={[]}
                  // label="ObverseAcGuid"
                  name="ObverseAcGuid"
                  getSelectedValue={handelChangeEntriesField}
                />
              </TableCol>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default memo(TestEntryFormTable);
