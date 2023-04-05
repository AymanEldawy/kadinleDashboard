const Store = [
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
    "label": "LtnName",
    "name": "LtnName"
  },
  {
    "type": "text",
    "required": false,
    "label": "Address",
    "name": "Address"
  },
  {
    "type": "text",
    "required": false,
    "label": "warehouseman",
    "name": "warehouseman"
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
    "label": "ParentGuid",
    "name": "ParentGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Store"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AcFinalGUID",
    "name": "AcFinalGUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  }
];

module.exports.Store = Store;
