const RealtyRestrained = [
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
    "label": "RestrainedCanceld",
    "name": "RestrainedCanceld"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CustomerGuid",
    "name": "CustomerGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Customer"
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
    "key": "unique",
    "required": false,
    "label": "FlatGuid",
    "name": "FlatGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Apartment"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ParkingNo",
    "name": "ParkingNo",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "parking"
  },
  {
    "key": "unique",
    "required": false,
    "label": "VillaGuid",
    "name": "VillaGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Villa"
  },
  {
    "key": "unique",
    "required": false,
    "label": "LandGuid",
    "name": "LandGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Earth"
  },
  {
    "key": "unique",
    "required": false,
    "label": "Shop",
    "name": "Shop",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Shop"
  },
  {
    "type": "text",
    "required": false,
    "label": "RealtyType",
    "name": "RealtyType"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "EditDate",
    "name": "EditDate"
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
    "label": "EndDate",
    "name": "EndDate"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "EndDateSpecific",
    "name": "EndDateSpecific"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Pay",
    "name": "Pay"
  },
  {
    "type": "text",
    "required": false,
    "label": "PayValue",
    "name": "PayValue"
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
    "label": "Currencyval",
    "name": "Currencyval"
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
    "label": "DebitAccountGuid",
    "name": "DebitAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CreditAccountGuid",
    "name": "CreditAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CostDebitGuid",
    "name": "CostDebitGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CostCreditGuid",
    "name": "CostCreditGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CheckTypeGuid",
    "name": "CheckTypeGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "CheckType"
  }
];

module.exports.RealtyRestrained = RealtyRestrained;
