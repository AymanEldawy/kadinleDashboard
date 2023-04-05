const Cost = [
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
    "key": "unique",
    "required": false,
    "label": "ParentGUID",
    "name": "ParentGUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  }
];

module.exports.Cost = Cost;
