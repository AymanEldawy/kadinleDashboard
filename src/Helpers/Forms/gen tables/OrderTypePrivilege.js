const OrderTypePrivilege = [
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
    "table": "OrderType"
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
    "label": "Print",
    "name": "Print"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Design",
    "name": "Design"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CloseOrder",
    "name": "CloseOrder"
  }
];

module.exports.OrderTypePrivilege = OrderTypePrivilege;
