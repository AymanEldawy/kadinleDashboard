const FlatBuilding = [
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
    "label": "BuildingAcGuid",
    "name": "BuildingAcGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ProjectAcGuid",
    "name": "ProjectAcGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ClientAcGuid",
    "name": "ClientAcGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CreateEntry",
    "name": "CreateEntry"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "EntryDate",
    "name": "EntryDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "FloorCount",
    "name": "FloorCount"
  },
  {
    "type": "text",
    "required": false,
    "label": "FlatByFloor",
    "name": "FlatByFloor"
  },
  {
    "type": "text",
    "required": false,
    "label": "RealFlatCount",
    "name": "RealFlatCount"
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
    "label": "CostProject",
    "name": "CostProject"
  },
  {
    "type": "text",
    "required": false,
    "label": "Costunity",
    "name": "Costunity"
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
    "label": "MBalanceFloor",
    "name": "MBalanceFloor"
  },
  {
    "type": "text",
    "required": false,
    "label": "BHouseFloor",
    "name": "BHouseFloor"
  },
  {
    "type": "text",
    "required": false,
    "label": "ShopFloor",
    "name": "ShopFloor"
  }
];

module.exports.FlatBuilding = FlatBuilding;
