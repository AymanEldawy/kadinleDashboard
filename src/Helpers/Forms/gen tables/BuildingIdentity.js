const BuildingIdentity = [
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
    "label": "OwnerAccountGuid",
    "name": "OwnerAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
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
    "type": "datetime-local",
    "required": false,
    "label": "BeginDate",
    "name": "BeginDate"
  },
  {
    "key": "unique",
    "required": false,
    "label": "cachEntryGuid",
    "name": "cachEntryGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "InsuranceEntryGuid",
    "name": "InsuranceEntryGuid"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "DoReconciliation",
    "name": "DoReconciliation"
  }
];

module.exports.BuildingIdentity = BuildingIdentity;
