const ServicesContract = [
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
    "type": "datetime-local",
    "required": false,
    "label": "EditDate",
    "name": "EditDate"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Mark",
    "name": "Mark"
  },
  {
    "key": "unique",
    "required": false,
    "label": "TypeGuid",
    "name": "TypeGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "ServicesContractType"
  },
  {
    "type": "text",
    "required": false,
    "label": "ContractNo",
    "name": "ContractNo"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CustomerGuid",
    "name": "CustomerGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Customer"
  },
  {
    "key": "unique",
    "required": false,
    "label": "BuildingGuid",
    "name": "BuildingGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Building"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CostGuid",
    "name": "CostGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Cost"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "FromDate",
    "name": "FromDate"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "ToDate",
    "name": "ToDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "Period",
    "name": "Period"
  },
  {
    "type": "text",
    "required": false,
    "label": "PeriodType",
    "name": "PeriodType"
  },
  {
    "type": "text",
    "required": false,
    "label": "Rent",
    "name": "Rent"
  },
  {
    "type": "text",
    "required": false,
    "label": "MonthlyValue",
    "name": "MonthlyValue"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CurrencyGuid",
    "name": "CurrencyGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Currency"
  },
  {
    "type": "text",
    "required": false,
    "label": "CurrencyVal",
    "name": "CurrencyVal"
  },
  {
    "type": "text",
    "required": false,
    "label": "PayType",
    "name": "PayType"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note",
    "name": "Note"
  },
  {
    "type": "text",
    "required": false,
    "label": "Note2",
    "name": "Note2"
  },
  {
    "type": "text",
    "required": false,
    "label": "Trademark",
    "name": "Trademark"
  },
  {
    "type": "text",
    "required": false,
    "label": "Purpose",
    "name": "Purpose"
  },
  {
    "type": "text",
    "required": false,
    "label": "Whereabouts",
    "name": "Whereabouts"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ExpenceAccountGUID",
    "name": "ExpenceAccountGUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CustAccountGuid",
    "name": "CustAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CreateContractEntry",
    "name": "CreateContractEntry"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "ContractFinish",
    "name": "ContractFinish"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "ContractFinishDate",
    "name": "ContractFinishDate"
  },
  {
    "type": "text",
    "required": false,
    "label": "ResultingAmount",
    "name": "ResultingAmount"
  },
  {
    "type": "text",
    "required": false,
    "label": "ResultingAmount2",
    "name": "ResultingAmount2"
  },
  {
    "type": "text",
    "required": false,
    "label": "RoundKind",
    "name": "RoundKind"
  },
  {
    "type": "text",
    "required": false,
    "label": "ResultingNote",
    "name": "ResultingNote"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CreateResultingEntry",
    "name": "CreateResultingEntry"
  },
  {
    "type": "text",
    "required": false,
    "label": "RentDuration",
    "name": "RentDuration"
  },
  {
    "type": "text",
    "required": false,
    "label": "Rentype",
    "name": "Rentype"
  },
  {
    "type": "text",
    "required": false,
    "label": "TermsOfPayment",
    "name": "TermsOfPayment"
  },
  {
    "type": "text",
    "required": false,
    "label": "DiscountPercent",
    "name": "DiscountPercent"
  },
  {
    "type": "text",
    "required": false,
    "label": "DiscountValue",
    "name": "DiscountValue"
  },
  {
    "key": "unique",
    "required": false,
    "label": "DiscountAccountGuid",
    "name": "DiscountAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
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
    "key": "unique",
    "required": false,
    "label": "BranchGuid",
    "name": "BranchGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Branch"
  },
  {
    "key": "unique",
    "required": false,
    "label": "FineExpenceAccountGUID",
    "name": "FineExpenceAccountGUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "text",
    "required": false,
    "label": "NewState",
    "name": "NewState"
  },
  {
    "type": "text",
    "required": false,
    "label": "OtherFee",
    "name": "OtherFee"
  },
  {
    "key": "unique",
    "required": false,
    "label": "OtherFeeAccountGUID",
    "name": "OtherFeeAccountGUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "text",
    "required": false,
    "label": "License1No",
    "name": "License1No"
  },
  {
    "type": "text",
    "required": false,
    "label": "License2No",
    "name": "License2No"
  },
  {
    "type": "text",
    "required": false,
    "label": "License3No",
    "name": "License3No"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "License1Date1",
    "name": "License1Date1"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "License2Date1",
    "name": "License2Date1"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "License3Date1",
    "name": "License3Date1"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "License1Date2",
    "name": "License1Date2"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "License2Date2",
    "name": "License2Date2"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "License3Date2",
    "name": "License3Date2"
  },
  {
    "type": "text",
    "required": false,
    "label": "Ltnwhereabouts",
    "name": "Ltnwhereabouts"
  },
  {
    "type": "text",
    "required": false,
    "label": "LtnPurpose",
    "name": "LtnPurpose"
  },
  {
    "type": "text",
    "required": false,
    "label": "LtnRentDuration",
    "name": "LtnRentDuration"
  },
  {
    "type": "text",
    "required": false,
    "label": "LtnRentype",
    "name": "LtnRentype"
  },
  {
    "type": "text",
    "required": false,
    "label": "LtnTermsOfPayment",
    "name": "LtnTermsOfPayment"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "IsRounded",
    "name": "IsRounded"
  },
  {
    "type": "text",
    "required": false,
    "label": "CountOldContract",
    "name": "CountOldContract"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "AcquittancePrinted",
    "name": "AcquittancePrinted"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "AcquittancePrintDate",
    "name": "AcquittancePrintDate"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AcquittancePrintedByGuid",
    "name": "AcquittancePrintedByGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Realty_Users"
  }
];

module.exports.ServicesContract = ServicesContract;
