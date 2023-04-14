import {
  BanknoteIcon,
  BriefcaseIcon,
  BuildingIcon,
  GearIcon,
  PuzzleIcon,
  ToolsIcon,
  UserIcon,
} from "./Icons";
import ClipboardIcon from "./Icons/ClipboardIcon";

export const menuData = [
  {
    key: "account",
    name: "Account",
    link: "account",
    icon: <UserIcon />,
    children: [
      { key: "account-card", name: "account card", link: "/list/account" },
      {
        key: "chart-of-accounts",
        name: "Chart of accounts",
        link: "/Chart/account",
      },
      {
        key: "cost-centers",
        name: "Cost centers",
        link: "cost-centers",
        subChild: [
          {
            key: "Const center card",
            name: "Const center card",
            link: "/list/cost",
          },
          {
            key: "Chart of cost center",
            name: "Chart of cost center",
            link: "/Chart/cost",
          },
        ],
      },
      {
        key: "currencies",
        name: "Currencies",
        link: "currencies",
        subChild: [
          {
            key: "Currency card",
            name: "Currency card",
            link: "/list/Currency",
          },
          {
            key: "Bulletin currency prices",
            name: "Bulletin currency prices",
            link: "/list/Currency",
          },

          {
            key: "Currency rate differences",
            name: "Currency rate differences",
            link: "/list/Currency",
          },
        ],
      },
    ],
  },
  {
    key: "cards",
    name: "Cards",
    link: "cards",
    icon: <ClipboardIcon />,
    children: [
      {
        key: "Customer",
        name: "Customer/Supplier Card",
        link: "/list/customer",
      },
      {
        key: "Building",
        name: "Building Card",
        link: "/list/building",
      },
      {
        key: "Flat",
        name: "Flat Card",
        link: "/list/apartment",
      },
      {
        key: "Shop",
        name: "Shop Card",
        link: "/list/shop",
      },
      {
        key: "Parking",
        name: "Parking Card",
        link: "/list/parking",
      },
      {
        key: "Land",
        name: "Land Card",
        link: "/list/Landcontract",
      },
      {
        key: "Villa",
        name: "Villa Card",
        link: "/list/Villa",
      },
      {
        key: "Leaser",
        name: "Leasor Card",
        link: "/list/RentInfo",
      },
      {
        key: "Owner",
        name: "Owner Card",
        link: "/list/Owner",
      },
      {
        key: "Salesman",
        name: "Salesman Card",
        link: "/list/salesman",
      },
      {
        key: "Watchman",
        name: "Watchman Card",
        link: "/list/watchman",
      },
      {
        key: "Quotation Card",
        name: "Quotation Card",
        link: "/list/OfferPrice",
      },
    ],
  },
  {
    key: "materials",
    name: "Materials",
    link: "",
    icon: <PuzzleIcon />,
    children: [
      {
        key: "Material",
        name: "Material Card",
        link: "/list/mat",
      },
      {
        key: "Group",
        name: "Group Card",
        link: "/list/matgroup",
      },
      {
        key: "chartMaterial",
        name: "Chart of Materials",
        link: "/Chart/mat",
      },
      {
        key: "Store",
        name: "Store Card",
        link: "/list/Store",
      },
      {
        key: "Chart of Stores",
        name: "Chart of Stores",
        link: "/Chart/store",
      },
      {
        key: "Activity reports",
        name: "Activity reports",
        link: "/report/materials",
      },
    ],
  },
  {
    key: "assets",
    name: "Assets",
    link: "",
    icon: <BuildingIcon />,
    children: [
      {
        key: "Asset Category",
        name: "Asset Category",
        link: "/list/AssetsGroup",
      },
      {
        key: "Asset Card",
        name: "Asset Card",
        link: "/list/Assets",
      },

      {
        key: "Chart of Assets",
        name: "Chart of Assets",
        link: "/Chart/Assets",
      },
    ],
  },
  {
    key: "realty",
    name: "Realty Transactions",
    link: "realty",
    icon: <BanknoteIcon />,
    children: [
      {
        key: "Contracts",
        name: "Contracts",
        link: "",
        subChild: [
          {
            key: 1,
            name: "Rent Contracts",
            link: "",
            subChild: [
              {
                key: 1,
                name: "Flat rent contract",
                link: "/LeaseApartment",
              },
              {
                key: 2,
                name: "Shop rent contract",
                link: "/list/",
              },
              {
                key: 2,
                name: "Parking rent contract",
                link: "/list/",
              },
            ],
          },
          {
            key: 2,
            name: "Sale Contracts",
            link: "",
            subChild: [
              {
                key: 1,
                name: "Flat sale contract",
                link: "/list/FlatContractFee",
              },
              {
                key: 2,
                name: "Shop sale contract",
                link: "/list/",
              },
              {
                key: 3,
                name: "Parking sale contract",
                link: "/list/",
              },
              {
                key: 4,
                name: "Land sale contract",
                link: "/list/",
              },
            ],
          },
        ],
      },
      {
        key: "services",
        name: "Services contracts",
        link: "/list/",
      },
      {
        key: "electricity",
        name: "Electricity bills",
        link: "/list/",
      },
      {
        key: "lawsuit",
        name: "Lawsuit",
        link: "/list/",
      },
      {
        key: "Owners Associations Fees",
        name: "Owners Associations Fees",
        link: "/list/",
      },
      {
        key: "Contract cycle",
        name: "Contract cycle",
        link: "/list/",
      },
      {
        key: "Building electricity meter reading",
        name: "Building electricity meter reading",
        link: "/list/",
      },
    ],
  },
  {
    key: "internal",
    name: "Internal maintenance",
    link: "",
    icon: <GearIcon />,
    children: [
      {
        key: 1,
        name: "Maintenance worker card",
        link: "/",
      },
      {
        key: 2,
        name: "Complaint card",
        link: "/",
      },

      {
        key: 3,
        name: "Maintenance order",
        link: "/",
      },

      {
        key: 4,
        name: "Complaints report",
        link: "/",
      },

      {
        key: 5,
        name: "Maintenance orders report",
        link: "/",
      },
    ],
  },
  {
    key: "Maintenance",
    name: "Maintenance",
    link: "",
    icon: <BriefcaseIcon />,
    children: [
      {
        key: "external",
        name: "External maintenance",
        link: "",
        subChild: [
          {
            key: 1,
            name: "Maintenance contracts",
            link: "/",
          },
          {
            key: 2,
            name: "Maintenance work card",
            link: "/",
          },

          {
            key: 3,
            name: "Maintenance visits",
            link: "/",
          },

          {
            key: 4,
            name: "Maintenance visits report",
            link: "/",
          },

          {
            key: 5,
            name: "Maintenance Contracts report",
            link: "/",
          },
        ],
      },
    ],
  },
  {
    key: "tools",
    name: "Tools",
    link: "",
    icon: <ToolsIcon />,
    children: [
      {
        key: "tool 1",
        name: "tool 1",
        link: "/tools",
      },
      {
        key: "contract type",
        name: "Contract Type",
        link: "/ContractType",
      },
    ],
  },
];
