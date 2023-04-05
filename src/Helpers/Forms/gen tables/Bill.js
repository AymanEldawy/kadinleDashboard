const Bill = [
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
    "table": "BillType"
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
    "label": "CustGuid",
    "name": "CustGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Customer"
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
    "label": "StoreGuid",
    "name": "StoreGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Store"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CustAccGuid",
    "name": "CustAccGuid",
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
    "label": "EntryGuid",
    "name": "EntryGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "EntryNumber",
    "name": "EntryNumber"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CheckCreateEntry",
    "name": "CheckCreateEntry"
  },
  {
    "type": "text",
    "required": false,
    "label": "ItemsTotal",
    "name": "ItemsTotal"
  },
  {
    "type": "text",
    "required": false,
    "label": "ItemsDiscount",
    "name": "ItemsDiscount"
  },
  {
    "type": "text",
    "required": false,
    "label": "ItemsExtra",
    "name": "ItemsExtra"
  },
  {
    "type": "text",
    "required": false,
    "label": "BuExtra",
    "name": "BuExtra"
  },
  {
    "type": "text",
    "required": false,
    "label": "BuDiscount",
    "name": "BuDiscount"
  },
  {
    "type": "text",
    "required": false,
    "label": "BuOnly",
    "name": "BuOnly"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ContractGuid",
    "name": "ContractGuid"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "IsPosted",
    "name": "IsPosted"
  },
  {
    "type": "text",
    "required": false,
    "label": "AddFld1",
    "name": "AddFld1"
  },
  {
    "type": "text",
    "required": false,
    "label": "AddFld2",
    "name": "AddFld2"
  },
  {
    "type": "text",
    "required": false,
    "label": "AddFld3",
    "name": "AddFld3"
  },
  {
    "type": "text",
    "required": false,
    "label": "AddFld4",
    "name": "AddFld4"
  },
  {
    "type": "text",
    "required": false,
    "label": "AddFld5",
    "name": "AddFld5"
  },
  {
    "type": "text",
    "required": false,
    "label": "AddFld6",
    "name": "AddFld6"
  },
  {
    "type": "text",
    "required": false,
    "label": "AddFld7",
    "name": "AddFld7"
  },
  {
    "type": "text",
    "required": false,
    "label": "AddFld8",
    "name": "AddFld8"
  }
];

module.exports.Bill = Bill;
