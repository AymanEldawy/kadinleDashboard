const parking = [
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
    "label": "NO",
    "name": "NO"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Judicial",
    "name": "Judicial"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Ban",
    "name": "Ban"
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
    "label": "BuildingGuid",
    "name": "BuildingGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "FloorNo",
    "name": "FloorNo"
  },
  {
    "type": "text",
    "required": false,
    "label": "Area",
    "name": "Area"
  },
  {
    "type": "text",
    "required": false,
    "label": "unity",
    "name": "unity"
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
    "label": "ParkingKind",
    "name": "ParkingKind"
  },
  {
    "type": "text",
    "required": false,
    "label": "Description",
    "name": "Description"
  },
  {
    "type": "text",
    "required": false,
    "label": "Overlooking",
    "name": "Overlooking"
  },
  {
    "type": "text",
    "required": false,
    "label": "CostPrice",
    "name": "CostPrice"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CostCurrencyGUID",
    "name": "CostCurrencyGUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Currency"
  },
  {
    "type": "text",
    "required": false,
    "label": "Rent",
    "name": "Rent"
  },
  {
    "key": "unique",
    "required": false,
    "label": "RentCurrencyGUID",
    "name": "RentCurrencyGUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Currency"
  },
  {
    "type": "text",
    "required": false,
    "label": "Sale",
    "name": "Sale"
  },
  {
    "key": "unique",
    "required": false,
    "label": "SaleCurrencyGUID",
    "name": "SaleCurrencyGUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Currency"
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
    "type": "text",
    "required": false,
    "label": "FlatOwner",
    "name": "FlatOwner"
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
    "type": "text",
    "required": false,
    "label": "Details",
    "name": "Details"
  },
  {
    "type": "text",
    "required": false,
    "label": "OfferState",
    "name": "OfferState"
  },
  {
    "type": "text",
    "required": false,
    "label": "OfferType",
    "name": "OfferType"
  },
  {
    "type": "text",
    "required": false,
    "label": "CustomerName",
    "name": "CustomerName"
  },
  {
    "type": "text",
    "required": false,
    "label": "CustomerPhone",
    "name": "CustomerPhone"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Restrained",
    "name": "Restrained"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "PurchaseDate",
    "name": "PurchaseDate"
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
    "label": "LastContractGuid",
    "name": "LastContractGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "RestrainedUserGuid",
    "name": "RestrainedUserGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Realty_Users"
  }
];

module.exports.parking = parking;
