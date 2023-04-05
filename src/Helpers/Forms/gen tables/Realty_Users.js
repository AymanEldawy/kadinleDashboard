const Realty_Users = [
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
    "label": "LoginName",
    "name": "LoginName"
  },
  {
    "type": "text",
    "required": false,
    "label": "Password",
    "name": "Password"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "bAdmin",
    "name": "bAdmin"
  },
  {
    "type": "text",
    "required": false,
    "label": "UserSecLvl",
    "name": "UserSecLvl"
  },
  {
    "key": "unique",
    "required": false,
    "label": "BranchGuid",
    "name": "BranchGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Branch"
  }
];

module.exports.Realty_Users = Realty_Users;
