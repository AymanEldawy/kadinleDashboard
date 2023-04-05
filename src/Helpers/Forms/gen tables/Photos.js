const Photos = [
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
    "key": "unique",
    "required": false,
    "label": "ParentGuid",
    "name": "ParentGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "TableGUID",
    "name": "TableGUID"
  },
  {
    "key": "unique",
    "required": false,
    "label": "userGuid",
    "name": "userGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Realty_Users"
  },
  {
    "type": "text",
    "required": false,
    "label": "Date",
    "name": "Date"
  },
  {
    "type": "text",
    "required": false,
    "label": "Path",
    "name": "Path"
  },
  {
    "type": "text",
    "required": false,
    "label": "Tab",
    "name": "Tab"
  },
  {
    "type": "text",
    "required": false,
    "label": "Desc",
    "name": "Desc"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  }
];

module.exports.Photos = Photos;
