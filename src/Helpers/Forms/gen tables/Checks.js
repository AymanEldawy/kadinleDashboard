const Checks = [
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
    "type": "checkbox",
    "required": false,
    "label": "Mark",
    "name": "Mark"
  },
  {
    "key": "unique",
    "required": false,
    "label": "TypeGuid",
    "name": "TypeGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "CheckType"
  },
  {
    "type": "text",
    "required": false,
    "label": "NO",
    "name": "NO"
  },
  {
    "type": "text",
    "required": false,
    "label": "InternalNO",
    "name": "InternalNO"
  },
  {
    "type": "text",
    "required": false,
    "label": "ReceiptNo",
    "name": "ReceiptNo"
  },
  {
    "type": "text",
    "required": false,
    "label": "Value",
    "name": "Value"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CurrencyGUID",
    "name": "CurrencyGUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Currency"
  },
  {
    "type": "text",
    "required": false,
    "label": "CurrencyVal",
    "name": "CurrencyVal"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "Date",
    "name": "Date"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "DueDate",
    "name": "DueDate"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "endDueDate",
    "name": "endDueDate"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "NoneDueDate",
    "name": "NoneDueDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "BankName",
    "name": "BankName"
  },
  {
    "key": "unique",
    "required": false,
    "label": "Account",
    "name": "Account",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CostGuid",
    "name": "CostGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ObverseAccount",
    "name": "ObverseAccount",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CostObverseGuid",
    "name": "CostObverseGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "type": "text",
    "required": false,
    "label": "Beneficiary",
    "name": "Beneficiary"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note2",
    "name": "Note2"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note3",
    "name": "Note3"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note4",
    "name": "Note4"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ContractGuid",
    "name": "ContractGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "UserGuid",
    "name": "UserGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Realty_Users"
  },
  {
    "key": "unique",
    "required": false,
    "label": "BranchGuid",
    "name": "BranchGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Branch"
  },
  {
    "key": "unique",
    "required": false,
    "label": "SalesManGuid",
    "name": "SalesManGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Salesman"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "FolderDate",
    "name": "FolderDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "FolderInternalNo",
    "name": "FolderInternalNo"
  },
  {
    "type": "text",
    "required": false,
    "label": "FolderExternalNo",
    "name": "FolderExternalNo"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CheckCreateEntry",
    "name": "CheckCreateEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "IsRounded",
    "name": "IsRounded"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Deposition",
    "name": "Deposition"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Lawsuit",
    "name": "Lawsuit"
  }
];

module.exports.Checks = Checks;
