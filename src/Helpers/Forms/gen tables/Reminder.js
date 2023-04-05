const Reminder = [
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
    "label": "Subject",
    "name": "Subject"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "Date",
    "name": "Date"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "RemindDate",
    "name": "RemindDate"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Finished",
    "name": "Finished"
  },
  {
    "type": "text",
    "required": false,
    "label": "Mobile",
    "name": "Mobile"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "ForAllUser",
    "name": "ForAllUser"
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
  }
];

module.exports.Reminder = Reminder;
