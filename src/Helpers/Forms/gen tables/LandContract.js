const LandContract = [
  {
    "type": "text",
    "required": false,
    "label": "Number",
    "name": "Number"
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
    "type": "checkbox",
    "required": false,
    "label": "IsAutoRenewal",
    "name": "IsAutoRenewal"
  },
  {
    "key": "unique",
    "required": false,
    "label": "TypeGuid",
    "name": "TypeGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "ContractType"
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
    "label": "SalesManGuid",
    "name": "SalesManGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Salesman"
  },
  {
    "key": "unique",
    "required": false,
    "label": "RentInfoGuid",
    "name": "RentInfoGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "RentInfo"
  },
  {
    "key": "unique",
    "required": false,
    "label": "LandGuid",
    "name": "LandGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Earth"
  },
  {
    "key": "unique",
    "required": false,
    "label": "VillaGuid",
    "name": "VillaGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Villa"
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
    "label": "Purpose",
    "name": "Purpose"
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
    "label": "Whereabouts",
    "name": "Whereabouts"
  },
  {
    "key": "unique",
    "required": false,
    "label": "RevenueAccountGuid",
    "name": "RevenueAccountGuid",
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
    "name": "AcCommissionFromCustGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
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
    "name": "AcCommissionFromOwnerGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
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
    "name": "AcSalesManCommissionGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AcCommissionExpenseGuid",
    "name": "AcCommissionExpenseGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "type": "text",
    "required": false,
    "label": "SalesManCommNote",
    "name": "SalesManCommNote"
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
    "label": "AcIncomNextYearGUID",
    "name": "AcIncomNextYearGUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "InsuranceAccountGuid",
    "name": "InsuranceAccountGuid",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
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
    "label": "InsuranceValuePercent",
    "name": "InsuranceValuePercent"
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
    "type": "text",
    "required": false,
    "label": "CertificatValue",
    "name": "CertificatValue"
  },
  {
    "type": "text",
    "required": false,
    "label": "ElectricityInsurance",
    "name": "ElectricityInsurance"
  },
  {
    "type": "text",
    "required": false,
    "label": "ElectricityCounter",
    "name": "ElectricityCounter"
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
    "label": "OtherFee1",
    "name": "OtherFee1"
  },
  {
    "key": "unique",
    "required": false,
    "label": "OtherFeeAccount1GUID",
    "name": "OtherFeeAccount1GUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
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
    "name": "OtherFeeAccount2GUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
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
    "name": "OtherFeeAccount3GUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
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
    "name": "OtherFeeAccount4GUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
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
    "name": "OtherFeeAccount5GUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
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
    "label": "ResultingAmount2",
    "name": "ResultingAmount2"
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
    "label": "RoundKind",
    "name": "RoundKind"
  },
  {
    "key": "unique",
    "required": false,
    "label": "FineRevenueAccountGUID",
    "name": "FineRevenueAccountGUID",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
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
    "name": "FineAccount",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
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
    "key": "unique",
    "required": false,
    "label": "AccountContractPrice",
    "name": "AccountContractPrice",
    "key": "unique",
    "keyLabel": "name",
    "keyValue": "Guid",
    "table": "Account"
  },
  {
    "key": "unique",
    "required": false,
    "label": "AccountCertificatValue",
    "name": "AccountCertificatValue",
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
    "type": "checkbox",
    "required": false,
    "label": "Leave",
    "name": "Leave"
  },
  {
    "type": "datetime-local",
    "required": false,
    "label": "LeaveDate",
    "name": "LeaveDate"
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
  },
  {
    "type": "checkbox",
    "required": false,
    "label": "Judicial",
    "name": "Judicial"
  },
  {
    "type": "text",
    "required": false,
    "label": "Trademark",
    "name": "Trademark"
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

module.exports.LandContract = LandContract;
