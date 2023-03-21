
import { DropDowns } from "../functions";

const LeaseApartment_Contract_information = [
  { name: "ContractNo", type: "text", label: "ContractNo", required: false },
  {
    name: "CustomerGuid",
    type: "text",
    label: "CustomerGuid",
    required: false,
  },
  {
    name: "BuildingGuid",
    type: "text",
    label: "BuildingGuid",
    required: false,
  },
  {
    name: "ApartmentGuid",
    type: "text",
    label: "ApartmentGuid",
    required: false,
  },
  {
    name: "RentInfoGuid",
    type: "text",
    label: "RentInfoGuid",
    required: false,
  },
  {
    name: "SalesManGuid",
    type: "text",
    label: "SalesManGuid",
    required: false,
  },
  {
    name: "NewState",
    key: "select",
    label: "NewState",
    required: false,
    list: DropDowns("NewState"),
  }, // select
  { name: "Purpose", type: "text", label: "Purpose", required: false },
  {
    name: "ResidentCount",
    type: "number",
    label: "ResidentCount",
    required: false,
  },
  { name: "Trademark", type: "text", label: "Trademark", required: false },
  { name: "Whereabouts", type: "text", label: "Whereabouts", required: false },
  {
    name: "EditDate",
    type: "datetime-local",
    label: "EditDate",
    required: false,
  },
  {
    name: "DeliverDate",
    type: "datetime-local",
    label: "DeliverDate",
    required: false,
  },
  {
    name: "RentDuration",
    type: "text",
    label: "RentDuration",
    required: false,
  },
  { name: "Rentype", type: "text", label: "Rentype", required: false },
  {
    name: "TermsOfPayment",
    type: "text",
    label: "TermsOfPayment",
    required: false,
  },
  {
    name: "CountOldContract",
    type: "number",
    label: "CountOldContract",
    required: false,
  },
  {
    name: "CountCurrentContract",
    type: "number",
    label: "CountCurrentContract",
    required: false,
  },
];
const LeaseApartment_Financial_Information = [
  {
    name: "RentContractType",
    type: "number",
    label: "RentContractType",
    required: false,
  },
  { name: "Rent", type: "number", label: "Rent", required: false },
  {
    name: "MonthlyValue",
    type: "number",
    label: "MonthlyValue",
    required: false,
  },
  {
    name: "CurrencyGuid",
    type: "text",
    label: "CurrencyGuid",
    required: false,
  },
  {
    name: "DiscountPercent",
    type: "number",
    label: "DiscountPercent",
    required: false,
  },
  {
    name: "DiscountValue",
    type: "number",
    label: "DiscountValue",
    required: false,
  },
  {
    name: "DiscountAccountGuid",
    type: "text",
    label: "DiscountAccountGuid",
    required: false,
  },
  {
    name: "InsuranceValueOld",
    type: "number",
    label: "InsuranceValueOld",
    required: false,
  },
  {
    name: "InsuranceValue",
    type: "number",
    label: "InsuranceValue",
    required: false,
  },
  {
    name: "ContractPrice",
    type: "number",
    label: "ContractPrice",
    required: false,
  },
  { name: "OtherFee", type: "number", label: "OtherFee", required: false },
  {
    name: "ElectricityInsurance",
    type: "number",
    label: "ElectricityInsurance",
    required: false,
  },
  {
    name: "RentDuration",
    key: "select",
    label: "RentDuration",
    required: false,
    list: DropDowns("RentDuration"),
  }, // select
  {
    name: "FromDate",
    type: "datetime-local",
    label: "FromDate",
    required: false,
  },
  { name: "ToDate", type: "datetime-local", label: "ToDate", required: false },
  {
    name: "PayType",
    key: "select",
    label: "PayType",
    required: false,
    list: DropDowns("PayType"),
  }, // select
  { name: "CostGuid", type: "text", label: "CostGuid", required: false },
  {
    name: "RevenueAccountGuid",
    type: "text",
    label: "RevenueAccountGuid",
    required: false,
  },
  {
    name: "CustAccountGuid",
    type: "text",
    label: "CustAccountGuid",
    required: false,
  },
  {
    name: "InsuranceAccountGuid",
    type: "text",
    label: "InsuranceAccountGuid",
    required: false,
  },
  {
    name: "AccountContractPrice",
    type: "text",
    label: "AccountContractPrice",
    required: false,
  },
  {
    name: "AccountCertificatValue",
    type: "text",
    label: "AccountCertificatValue",
    required: false,
  },
  {
    name: "FineRevenueAccountGUID",
    type: "text",
    label: "FineRevenueAccountGUID",
    required: false,
  },
];
const LeaseApartment_payments = [
  // increasable
  {
    name: "TypeGuid",
    key: "unique",
    label: "TypeGuid",
    required: false,
    list: [],
  },
  { name: "NO", type: "text", label: "NO", required: false },
  { name: "Value", type: "text", label: "Value", required: false },
  { name: "BankName", type: "text", label: "BankName", required: false },
  {
    name: "CurrencyGUID",
    key: "unique",
    label: "CurrencyGUID",
    required: false,
    list: [],
  },
  { name: "DueDate", type: "date", label: "DueDate", required: false },
  { name: "Note", type: "text", label: "Note", required: false },
  { name: "Note2", type: "text", label: "Note2", required: false },
];
const LeaseApartment_Commission = [
  // increasable
  {
    name: "CommissionFromCustValue",
    type: "number",
    label: "CommissionFromCustValue",
    required: false,
  },
  {
    name: "CommissionFromCustPercent",
    type: "number",
    label: "CommissionFromCustPercent",
    required: false,
  },
  {
    name: "AcCommissionFromCustGuid",
    type: "text",
    label: "AcCommissionFromCustGuid",
    required: false,
  },
  {
    name: "AcCommissionFromCustNote",
    type: "text",
    label: "AcCommissionFromCustNote",
    required: false,
  },
  {
    name: "CommissionFromOwnerPercent",
    type: "number",
    label: "CommissionFromOwnerPercent",
    required: false,
  },
  {
    name: "CommissionFromOwnerValue",
    type: "number",
    label: "CommissionFromOwnerValue",
    required: false,
  },
  {
    name: "AcCommissionFromOwnerGuid",
    type: "text",
    label: "AcCommissionFromOwnerGuid",
    required: false,
  },
  {
    name: "AcCommissionFromOwnerNote",
    type: "text",
    label: "AcCommissionFromOwnerNote",
    required: false,
  },
  {
    name: "CommissionFromSalesManrPercent",
    type: "number",
    label: "CommissionFromSalesManrPercent",
    required: false,
  },
  {
    name: "CommissionFromSalesManValue",
    type: "number",
    label: "CommissionFromSalesManValue",
    required: false,
  },
  {
    name: "AcSalesManCommissionGuid",
    type: "text",
    label: "AcSalesManCommissionGuid",
    required: false,
  },
  {
    name: "AcCommissionExpenseGuid",
    type: "text",
    label: "AcCommissionExpenseGuid",
    required: false,
  },
  {
    name: "SalesManCommNote",
    type: "text",
    label: "SalesManCommNote",
    required: false,
  },
];
const LeaseApartment_Related_parking_contracts = [
  { name: "Number", type: "text", label: "Number", required: false },
  {
    name: "ParentGuid",
    key: "unique",
    label: "ParentGuid",
    required: false,
    list: [],
  },
  {
    name: "ParkingContractGuid",
    key: "unique",
    label: "ParkingContractGuid",
    required: false,
    list: [],
  },
];
const LeaseApartment_Contract_termination = [
  {
    name: "ContractFinish",
    type: "checkbox",
    label: "ContractFinish",
    required: false,
  },
  {
    name: "ContractFinishDate",
    type: "datetime-local",
    label: "ContractFinishDate",
    required: false,
  },
  {
    name: "EditContractFinishDate",
    type: "datetime-local",
    label: "EditContractFinishDate",
    required: false,
  },
  {
    name: "ResultingAmount",
    type: "number",
    label: "ResultingAmount",
    required: false,
  },
  {
    name: "ResultingAmount2",
    type: "number",
    label: "ResultingAmount2",
    required: false,
  },
  { name: "RoundKind", type: "number", label: "RoundKind", required: false },
  {
    name: "ResultingNote",
    type: "text",
    label: "ResultingNote",
    required: false,
  },
  { name: "Fine", type: "number", label: "Fine", required: false },
  { name: "FineNote", type: "text", label: "FineNote", required: false },
  { name: "FineAccount", type: "text", label: "FineAccount", required: false },
  { name: "Leave", type: "checkbox", label: "Leave", required: false },
  {
    name: "LeaveDate",
    type: "datetime-local",
    label: "LeaveDate",
    required: false,
  },
];
const LeaseApartment_Termination_fines = [
  // Increasable
  {
    name: "AccountGuid",
    key: "unique",
    label: "AccountGuid",
    required: false,
    list: [],
  },
  { name: "Value", type: "text", label: "Value", required: false },
  { name: "Note", type: "text", label: "Note", required: false },
];
const LeaseApartment_Other_fees = [
  // Submittable
  // Increasable
  { name: "No", type: "text", label: "No", required: false },
  { name: "Date", type: "date", label: "Date", required: false },
  { name: "Note", type: "text", label: "Note", required: false },
];
const LeaseApartment_Log_file = [
  // Submittable
  // Increasable

  { name: "Date", type: "date", label: "Date", required: false },
  { name: "Value", type: "text", label: "Value", required: false },
  {
    name: "AccountGuid",
    key: "unique",
    label: "AccountGuid",
    required: false,
    list: [],
  },
  { name: "Note", type: "text", label: "Note", required: false },
];
const LeaseApartment_Fixed_assets = [
  // Increasable
  { name: "ODate", type: "date", label: "ODate", required: false },
  {
    name: "UserGuid",
    key: "unique",
    label: "UserGuid",
    required: false,
    list: [],
  },
  { name: "Note", type: "text", label: "Note", required: false },
];
export const LeaseApartment = {
  steps: [
    "Contract information",
    "Financial Information",
    "payments",
    "Commission",
    "Related parking contracts",
    "Contract termination",
    "Termination fines",
    "Other fees",
    "Log file",
    "Fixed assets",
  ],
  forms: {
    "Contract information": LeaseApartment_Contract_information,
    "Financial Information": LeaseApartment_Financial_Information,
    payments: LeaseApartment_payments,
    Commission: LeaseApartment_Commission,
    "Related parking contracts": LeaseApartment_Related_parking_contracts,
    "Contract termination": LeaseApartment_Contract_termination,
    "Termination fines": LeaseApartment_Termination_fines,
    "Other fees": LeaseApartment_Other_fees,
    "Log file": LeaseApartment_Log_file,
    "Fixed assets": LeaseApartment_Fixed_assets,
  },
};
