const LinkEntry_Checks = [
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
    "table": "HEntry"
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

module.exports.LinkEntry_Checks = LinkEntry_Checks;
