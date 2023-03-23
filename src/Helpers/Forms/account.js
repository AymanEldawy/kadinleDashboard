import { DropDowns, getData } from "../functions";

export const account = [
  { name: "Number", type: "number", label: "Number", required: false },
  {
    name: "SecLvl",
    key: "select",
    label: "SecLvl",
    required: false,
    list: DropDowns("SecLvl"),
  },
  { name: "Name", type: "text", label: "Name", required: false },
  { name: "LtnName", type: "text", label: "LtnName", required: false },
  { name: "Code", type: "text", label: "Code", required: false },
  { name: "CDate", type: "datetime-local", label: "CDate", required: false },
  { name: "NSons", type: "number", label: "NSons", required: false },
  { name: "Note", type: "text", label: "Note", required: false },
  {
    table: "Currency",
    name: "CurrencyGUID",
    key: "unique",
    label: "CurrencyGUID",
    required: false,
    list: getData("currency"),
  },
  {
    name: "CurrencyVal",
    type: "number",
    label: "CurrencyVal",
    required: false,
  },
  { name: "Type", type: "number", label: "Type", required: false },
  {
    table: "account",
    name: "ParentGUID",
    key: "unique",
    label: "ParentGUID",
    required: false,
    list: getData("account"),
  },
  { name: "FinalGUID", type: "text", label: "FinalGUID", required: false }, // need to change
  { name: "MaxDebit", type: "number", label: "MaxDebit", required: false },
  { name: "MinDebit", type: "number", label: "MinDebit", required: false },
  { name: "MaxCredit", type: "number", label: "MaxCredit", required: false },
  { name: "MinCredit", type: "number", label: "MinCredit", required: false },
  { name: "SumDebit", type: "number", label: "SumDebit", required: false },
  { name: "SumCredit", type: "number", label: "SumCredit", required: false },
];

export const cost = [
  { name: "Number", type: "number", label: "Number", required: false },
  {
    name: "SecLvl",
    key: "select",
    label: "SecLvl",
    required: false,
    list: DropDowns("SecLvl"),
  },
  { name: "Code", type: "text", label: "Code", required: false },
  { name: "Name", type: "text", label: "Name", required: false },
  { name: "LtnName", type: "text", label: "LtnName", required: false },
  {
    table: "cost",
    name: "ParentGUID",
    key: "unique",
    label: "ParentGUID",
    required: false,
    list: getData("account"),
  },
  { name: "Note", type: "text", label: "Note", required: false },
];
export const Currency = [
  { name: "Number", type: "number", label: "Number", required: false },
  {
    name: "SecLvl",
    key: "select",
    label: "SecLvl",
    required: false,
    list: DropDowns("SecLvl"),
  },

  { name: "Code", type: "text", label: "Code", required: false },
  { name: "LtnCode", type: "text", label: "LtnCode", required: false },
  { name: "Name", type: "text", label: "Name", required: false },
  { name: "LtnName", type: "text", label: "LtnName", required: false },
  {
    name: "CurrencyVal",
    type: "number",
    label: "CurrencyVal",
    required: false,
  },
  { name: "EnPartName", type: "text", label: "EnPartName", required: false },
  { name: "ArPartName", type: "text", label: "ArPartName", required: false },
  { name: "Part", type: "number", label: "Part", required: false },
  {
    name: "CurrencyRate",
    type: "number",
    label: "CurrencyRate",
    required: false,
  },
  { name: "Note", type: "text", label: "Note", required: false },
  { name: "OnlyName", type: "text", label: "OnlyName", required: false },
  {
    name: "OnlyPluralName",
    type: "text",
    label: "OnlyPluralName",
    required: false,
  },
  {
    name: "OnlyByCountryName",
    type: "text",
    label: "OnlyByCountryName",
    required: false,
  },
  {
    name: "OnlyPartPlularName",
    type: "text",
    label: "OnlyPartPlularName",
    required: false,
  },
  { name: "OnlyLtnName", type: "text", label: "OnlyLtnName", required: false },
  {
    name: "OnlyPluralLtnName",
    type: "text",
    label: "OnlyPluralLtnName",
    required: false,
  },
  {
    name: "OnlyByCountryLtnName",
    type: "text",
    label: "OnlyByCountryLtnName",
    required: false,
  },
  {
    name: "OnlyPartPlularLtnName",
    type: "text",
    label: "OnlyPartPlularLtnName",
    required: false,
  },
];
