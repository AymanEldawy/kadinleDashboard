const LinkEntryType_Checks = [
  {
    "key": "unique",
    "required": false,
    "label": "CheckGuid",
    "name": "CheckGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Checks"
  },
  {
    "key": "unique",
    "required": false,
    "label": "EntryGuid",
    "name": "EntryGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Secondary_Entry"
  },
  {
    "type": "text",
    "required": false,
    "label": "EntryNum",
    "name": "EntryNum"
  },
  {
    "type": "text",
    "required": false,
    "label": "Kind",
    "name": "Kind"
  }
];

module.exports.LinkEntryType_Checks = LinkEntryType_Checks;
