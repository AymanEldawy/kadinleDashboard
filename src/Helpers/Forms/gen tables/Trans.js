const Trans = [
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
    "key": "unique",
    "required": false,
    "label": "TypeGuid",
    "name": "TypeGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "TransType"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "Date",
    "name": "Date"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CurrencyGuid",
    "name": "CurrencyGuid",
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
    "type": "text",
    "required": false,
    "label": "PayType",
    "name": "PayType"
  },
  {
    "key": "unique",
    "required": false,
    "label": "StoreOutGuid",
    "name": "StoreOutGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Store"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AcMatOutGuid",
    "name": "AcMatOutGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "TmpAcOutGuid",
    "name": "TmpAcOutGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CostOutGuid",
    "name": "CostOutGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "key": "unique",
    "required": false,
    "label": "StoreInGuid",
    "name": "StoreInGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Store"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AcMatInGuid",
    "name": "AcMatInGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "TmpAcInGuid",
    "name": "TmpAcInGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CostInGuid",
    "name": "CostInGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
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
    "type": "text",
    "required": false,
    "label": "Class",
    "name": "Class"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  },
  {
    "key": "unique",
    "required": false,
    "label": "EntryOutGuid",
    "name": "EntryOutGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "EntryInGuid",
    "name": "EntryInGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "EntryOutNumber",
    "name": "EntryOutNumber"
  },
  {
    "type": "text",
    "required": false,
    "label": "EntryInNumber",
    "name": "EntryInNumber"
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
    "label": "IsPosted",
    "name": "IsPosted"
  }
];

module.exports.Trans = Trans;
