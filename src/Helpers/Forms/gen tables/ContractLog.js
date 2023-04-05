const ContractLog = [
  {
    "key": "unique",
    "required": false,
    "label": "Guid",
    "name": "Guid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ContractGuid",
    "name": "ContractGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "Number",
    "name": "Number"
  },
  {
    "type": "text",
    "required": false,
    "label": "SecLvl",
    "name": "SecLvl"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "Date",
    "name": "Date"
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
    "label": "Note",
    "name": "Note"
  }
];

module.exports.ContractLog = ContractLog;
