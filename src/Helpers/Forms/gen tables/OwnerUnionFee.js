const OwnerUnionFee = [
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
    "type": "datetime-local",
    "required": false,
    "label": "Date",
    "name": "Date"
  },
  {
    "key": "unique",
    "required": false,
    "label": "BuildingGuid",
    "name": "BuildingGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Building"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CkFlat",
    "name": "CkFlat"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CkShop",
    "name": "CkShop"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CkParking",
    "name": "CkParking"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AccountGuid",
    "name": "AccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CkMoveCreditCost",
    "name": "CkMoveCreditCost"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CkMoveDebitCost",
    "name": "CkMoveDebitCost"
  },
  {
    "type": "text",
    "required": false,
    "label": "Fee",
    "name": "Fee"
  },
  {
    "type": "text",
    "required": false,
    "label": "RoundKind",
    "name": "RoundKind"
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
    "type": "text",
    "required": false,
    "label": "ItemNote",
    "name": "ItemNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  }
];

module.exports.OwnerUnionFee = OwnerUnionFee;
