const Realty_LogCard = [
  {
    "type": "text",
    "required": false,
    "label": "Number",
    "name": "Number"
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
    "key": "unique",
    "required": false,
    "label": "CardGuid",
    "name": "CardGuid"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "Date",
    "name": "Date"
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

module.exports.Realty_LogCard = Realty_LogCard;
