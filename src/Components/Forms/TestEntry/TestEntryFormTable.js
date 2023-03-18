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
const TestEntryFormTable = ({
  handelChangeEntriesField,
  handelChangeFieldBlur,
}) => {
  console.log("run....");
  return (
    <Table className="pb-8 overflow-auto max-h-[420px] dark:border-borderdark">
      <TableHead classes="dark:bg-[#555] dark:text-gray-200">
        <TableCol classes="border border-gray-300 dark:border-borderdark !py-3" head>
          #
        </TableCol>
        <TableCol classes="border border-gray-300 dark:border-borderdark !py-3" head>
          AcGuid
        </TableCol>
        <TableCol classes="border border-gray-300 dark:border-borderdark !py-3" head>
          Debit
        </TableCol>
        <TableCol classes="border border-gray-300 dark:border-borderdark !py-3" head>
          Credit
        </TableCol>
        <TableCol classes="border border-gray-300 dark:border-borderdark !py-3" head>
          CurrencyGuid
        </TableCol>
        <TableCol classes="border border-gray-300 dark:border-borderdark !py-3" head>
          CurrencyVal
        </TableCol>
        <TableCol classes="border border-gray-300 dark:border-borderdark !py-3" head>
          Note
        </TableCol>
        <TableCol classes="border border-gray-300 dark:border-borderdark !py-3" head>
          CostGuid
        </TableCol>
        <TableCol classes="border border-gray-300 dark:border-borderdark !py-3" head>
          ObverseAcGuid
        </TableCol>
      </TableHead>
      <TableBody>
        {Array(20)
          .fill(0)
          .map((r, index) => (
            <TableRow>
              <TableCol classes="!p-0 border dark:border-borderdark text-center">{index + 1}</TableCol>
              <TableCol classes="!p-0 border dark:border-borderdark">
                <Field
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
                  className="min-w-[170px] border-0"
                  list={[]}
                  // label="CostGuid"

                  name="CostGuid"
                  getSelectedValue={handelChangeEntriesField}
                />
              </TableCol>
              <TableCol classes="!p-0 border dark:border-borderdark">
                <Field
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
