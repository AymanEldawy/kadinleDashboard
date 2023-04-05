const LogFile = [
  {
    "type": "text",
    "required": false,
    "label": "Id",
    "name": "Id"
  },
  {
    "type": "text",
    "required": false,
    "label": "Username",
    "name": "Username"
  },
  {
    "key": "unique",
    "required": false,
    "label": "UserGuid",
    "name": "UserGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Realty_Users"
  },
  {
    "type": "text",
    "required": false,
    "label": "ComputerName",
    "name": "ComputerName"
  },
  {
    "type": "text",
    "required": false,
    "label": "CardId",
    "name": "CardId"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "ODate",
    "name": "ODate"
  },
  {
    "type": "text",
    "required": false,
    "label": "Opration",
    "name": "Opration"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  }
];

module.exports.LogFile = LogFile;
