const ListOrderTypeGroups = [
  {
    "type": "text",
    "required": false,
    "label": "Spid",
    "name": "Spid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "GroupGuid",
    "name": "GroupGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "OrderTypeGuid",
    "name": "OrderTypeGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "OrderType"
  }
];

module.exports.ListOrderTypeGroups = ListOrderTypeGroups;
