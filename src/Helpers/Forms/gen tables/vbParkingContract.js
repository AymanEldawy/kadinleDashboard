const vbParkingContract = [
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
    "type": "checkbox",
    "required": false,
    "label": "Mark",
    "name": "Mark"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "EditDate",
    "name": "EditDate"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "DeliverDate",
    "name": "DeliverDate"
  },
  {
    "key": "unique",
    "required": false,
    "label": "TypeGuid",
    "name": "TypeGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "ContractKind",
    "name": "ContractKind"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "IsAutoRenewal",
    "name": "IsAutoRenewal"
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
    "name": "CustomerGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "BuildingGuid",
    "name": "BuildingGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "ParkingGuid",
    "name": "ParkingGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "Description",
    "name": "Description"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CostGuid",
    "name": "CostGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "RentInfoGuid",
    "name": "RentInfoGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "SalesManGuid",
    "name": "SalesManGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "FlatContractGuid",
    "name": "FlatContractGuid"
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
    "label": "Rent",
    "name": "Rent"
  },
  {
    "type": "text",
    "required": false,
    "label": "RentContractType",
    "name": "RentContractType"
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
    "name": "CurrencyGuid"
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
    "name": "DiscountAccountGuid"
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
    "key": "unique",
    "required": false,
    "label": "RevenueAccountGuid",
    "name": "RevenueAccountGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "CustAccountGuid",
    "name": "CustAccountGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "CommissionFromCustPercent",
    "name": "CommissionFromCustPercent"
  },
  {
    "type": "text",
    "required": false,
    "label": "CommissionFromCustValue",
    "name": "CommissionFromCustValue"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AcCommissionFromCustGuid",
    "name": "AcCommissionFromCustGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "CommissionFromOwnerPercent",
    "name": "CommissionFromOwnerPercent"
  },
  {
    "type": "text",
    "required": false,
    "label": "CommissionFromOwnerValue",
    "name": "CommissionFromOwnerValue"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AcCommissionFromOwnerGuid",
    "name": "AcCommissionFromOwnerGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AcIncomNextYearGUID",
    "name": "AcIncomNextYearGUID"
  },
  {
    "type": "text",
    "required": false,
    "label": "AcCommissionFromOwnerNote",
    "name": "AcCommissionFromOwnerNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "AcCommissionFromCustNote",
    "name": "AcCommissionFromCustNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "CommissionFromSalesManrPercent",
    "name": "CommissionFromSalesManrPercent"
  },
  {
    "type": "text",
    "required": false,
    "label": "CommissionFromSalesManValue",
    "name": "CommissionFromSalesManValue"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AcSalesManCommissionGuid",
    "name": "AcSalesManCommissionGuid"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AcCommissionExpenseGuid",
    "name": "AcCommissionExpenseGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "SalesManCommNote",
    "name": "SalesManCommNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "OtherFee1",
    "name": "OtherFee1"
  },
  {
    "key": "unique",
    "required": false,
    "label": "OtherFeeAccount1GUID",
    "name": "OtherFeeAccount1GUID"
  },
  {
    "type": "text",
    "required": false,
    "label": "OtherFee2",
    "name": "OtherFee2"
  },
  {
    "key": "unique",
    "required": false,
    "label": "OtherFeeAccount2GUID",
    "name": "OtherFeeAccount2GUID"
  },
  {
    "type": "text",
    "required": false,
    "label": "OtherFee3",
    "name": "OtherFee3"
  },
  {
    "key": "unique",
    "required": false,
    "label": "OtherFeeAccount3GUID",
    "name": "OtherFeeAccount3GUID"
  },
  {
    "type": "text",
    "required": false,
    "label": "OtherFee4",
    "name": "OtherFee4"
  },
  {
    "key": "unique",
    "required": false,
    "label": "OtherFeeAccount4GUID",
    "name": "OtherFeeAccount4GUID"
  },
  {
    "type": "text",
    "required": false,
    "label": "OtherFee5",
    "name": "OtherFee5"
  },
  {
    "key": "unique",
    "required": false,
    "label": "OtherFeeAccount5GUID",
    "name": "OtherFeeAccount5GUID"
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
    "type": "datetime-local",
    "required": false,
    "label": "EditContractFinishDate",
    "name": "EditContractFinishDate"
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
    "label": "ResultingNote",
    "name": "ResultingNote"
  },
  {
    "type": "text",
    "required": false,
    "label": "Fine",
    "name": "Fine"
  },
  {
    "key": "unique",
    "required": false,
    "label": "FineAccount",
    "name": "FineAccount"
  },
  {
    "type": "text",
    "required": false,
    "label": "FineNote",
    "name": "FineNote"
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
    "label": "InsuranceValue",
    "name": "InsuranceValue"
  },
  {
    "type": "text",
    "required": false,
    "label": "InsuranceValueOld",
    "name": "InsuranceValueOld"
  },
  {
    "type": "text",
    "required": false,
    "label": "ContractPrice",
    "name": "ContractPrice"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AccountContractPrice",
    "name": "AccountContractPrice"
  },
  {
    "type": "text",
    "required": false,
    "label": "CertificatValue",
    "name": "CertificatValue"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AccountCertificatValue",
    "name": "AccountCertificatValue"
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
    "type": "checkbox",
    "required": false,
    "label": "Step1Complete",
    "name": "Step1Complete"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Step2Complete",
    "name": "Step2Complete"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Step3Complete",
    "name": "Step3Complete"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Step4Complete",
    "name": "Step4Complete"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Step5Complete",
    "name": "Step5Complete"
  },
  {
    "type": "text",
    "required": false,
    "label": "Certification",
    "name": "Certification"
  },
  {
    "key": "unique",
    "required": false,
    "label": "BranchGuid",
    "name": "BranchGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "CardNo",
    "name": "CardNo"
  },
  {
    "type": "text",
    "required": false,
    "label": "CarNo",
    "name": "CarNo"
  },
  {
    "type": "text",
    "required": false,
    "label": "CarType",
    "name": "CarType"
  },
  {
    "type": "text",
    "required": false,
    "label": "CarColor",
    "name": "CarColor"
  },
  {
    "type": "text",
    "required": false,
    "label": "Emirate",
    "name": "Emirate"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "CreateContractEntry",
    "name": "CreateContractEntry"
  },
  {
    "key": "unique",
    "required": false,
    "label": "FineRevenueAccountGUID",
    "name": "FineRevenueAccountGUID"
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
    "type": "checkbox",
    "required": false,
    "label": "Judicial",
    "name": "Judicial"
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "IsReturnInsurance",
    "name": "IsReturnInsurance"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "ReturnInsuranceDate",
    "name": "ReturnInsuranceDate"
  },
  {
    "key": "unique",
    "required": false,
    "label": "PrvContractGuid",
    "name": "PrvContractGuid"
  },
  {
    "type": "text",
    "required": false,
    "label": "AddPercent",
    "name": "AddPercent"
  },
  {
    "type": "text",
    "required": false,
    "label": "AddValue",
    "name": "AddValue"
  }
];

module.exports.vbParkingContract = vbParkingContract;
