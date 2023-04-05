const AlarmCheckTypeSource = [
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
    "key": "unique",
    "required": false,
    "label": "CheckTypeGuid",
    "name": "CheckTypeGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "CheckType"
  }
];

module.exports.AlarmCheckTypeSource = AlarmCheckTypeSource;
