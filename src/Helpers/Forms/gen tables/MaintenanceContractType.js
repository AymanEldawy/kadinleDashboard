const MaintenanceContractType = [
  {
    "type": "text",
    "required": false,
    "label": "Number",
    "name": "Number"
  },
  {
    "key": "unique",
    "required": false,
    "label": "Guid",
    "name": "Guid"
  },
  {
    "type": "text",
    "required": false,
    "label": "SecLvl",
    "name": "SecLvl"
  },
  {
    "type": "text",
    "required": false,
    "label": "Code",
    "name": "Code"
  },
  {
    "type": "text",
    "required": false,
    "label": "Name",
    "name": "Name"
  },
  {
    "type": "text",
    "required": false,
    "label": "ltnName",
    "name": "ltnName"
  },
  {
    "type": "text",
    "required": false,
    "label": "Menu",
    "name": "Menu"
  },
  {
    "type": "text",
    "required": false,
    "label": "LtnMenu",
    "name": "LtnMenu"
  },
  {
    "type": "text",
    "required": false,
    "label": "ShortCut",
    "name": "ShortCut"
  },
  {
    "key": "unique",
    "required": false,
    "label": "IncomeAccountGUID",
    "name": "IncomeAccountGUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DiscountAccountGUID",
    "name": "DiscountAccountGUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "text",
    "required": false,
    "label": "Rentcondition",
    "name": "Rentcondition"
  },
  {
    "type": "text",
    "required": false,
    "label": "DefPrintPath",
    "name": "DefPrintPath"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CreateEntry",
    "name": "CreateEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "AutoCreateEntry",
    "name": "AutoCreateEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "AutoPostedEntry",
    "name": "AutoPostedEntry"
  },
  {
    "type": "text",
    "required": false,
    "label": "EntryDate",
    "name": "EntryDate"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithExpenceDebit",
    "name": "MoveCostWithExpenceDebit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithExpenceCredit",
    "name": "MoveCostWithExpenceCredit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithDiscountDebit",
    "name": "MoveCostWithDiscountDebit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MoveCostWithDiscountCredit",
    "name": "MoveCostWithDiscountCredit"
  },
  {
    "type": "text",
    "required": false,
    "label": "DefPrintReceipt",
    "name": "DefPrintReceipt"
  },
  {
    "type": "text",
    "required": false,
    "label": "DefPrintLogPath",
    "name": "DefPrintLogPath"
  },
  {
    "type": "text",
    "required": false,
    "label": "DefPrintacquittance",
    "name": "DefPrintacquittance"
  },
  {
    "type": "text",
    "required": false,
    "label": "FirstPayNote",
    "name": "FirstPayNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "FirstPayNoteLtn",
    "name": "FirstPayNoteLtn"
  },
  {
    "type": "text",
    "required": false,
    "label": "ContractNote",
    "name": "ContractNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "ContractNoteLtn",
    "name": "ContractNoteLtn"
  }
];

module.exports.MaintenanceContractType = MaintenanceContractType;
