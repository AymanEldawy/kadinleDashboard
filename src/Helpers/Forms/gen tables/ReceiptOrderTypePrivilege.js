const ReceiptOrderTypePrivilege = [
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
    "label": "TypeGuid",
    "name": "TypeGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "ReceiptOrderType"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Open",
    "name": "Open"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Add",
    "name": "Add"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Edit",
    "name": "Edit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Del",
    "name": "Del"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Mark",
    "name": "Mark"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MarkEdit",
    "name": "MarkEdit"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "MarkDel",
    "name": "MarkDel"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "ShowMark",
    "name": "ShowMark"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Print",
    "name": "Print"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Design",
    "name": "Design"
  }
];

module.exports.ReceiptOrderTypePrivilege = ReceiptOrderTypePrivilege;
