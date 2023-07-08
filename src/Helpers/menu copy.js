import { BanknoteIcon, BrandIcon, BriefcaseIcon, BuildingIcon, BulkIcon, CardIcon, ChartIcon, CollectionIcon, CurrencyIcon, GearIcon, LanguageIcon, MapIcon, PaletteIcon, ProductIcon, PuzzleIcon, RulerIcon, TagsIcon, ToolsIcon, UserIcon, WorldIcon } from "./Icons";
import ClipboardIcon from "./Icons/ClipboardIcon";

export const menuData = [
  {
    key: "Languages",
    name: "Languages",
    link: "",
    icon: <LanguageIcon />,
    children: [
      { key: "mange", path: "/language", name: "Mange Languages" },
      { key: "", path: "/add-language", name: "Add Language" },
    ],
  },
  {
    key: "products",
    name: "products",
    icon: <ProductIcon />,
    children: [
      { path: "/product", name: "Mange Products" },
      { path: "/add-product", name: "Add Product" },
    ],
  },
  {
    key: "categories",
    name: "categories",
    icon: <TagsIcon />,
    children: [
      { path: "/category", name: "Mange Categories" },
      { path: "/add-category", name: "Add Category" },
    ],
  },
  {
    key: "Colors",
    name: "Colors",
    icon: <PaletteIcon />,
    children: [
      { path: "/color", name: "Mange Colors" },
      { path: "/add-color", name: "Add Color" },
    ],
  },
  {
    key: "Addresses",
    name: "Addresses",
    icon: <MapIcon />,
    children: [
      { path: "/address", name: "Mange Addresses" },
      { path: "/add-address", name: "Add Address" },
    ],
  },
  {
    key: "Sizes",
    name: "Sizes",
    icon: <RulerIcon />,
    children: [
      { path: "/size", name: "Mange Sizes" },
      { path: "/add-size", name: "Add Size" },
    ],
  },
  {
    key: "Countries",
    name: "Countries",
    icon: <WorldIcon />,
    children: [
      { path: "/country", name: "Mange Countries" },
      { path: "/add-country", name: "Add Country" },
    ],
  },
  {
    key: "Regions",
    name: "Regions",
    icon: <WorldIcon />,
    children: [
      { path: "/add-region", name: "Add Region" },
      { path: "/region", name: "Mange Regions" },
    ],
  },
  {
    key: "Collections",
    name: "Collections",
    icon: <CollectionIcon />,
    children: [
      { path: "/collection", name: "Mange Collections" },
      { path: "/add-collection", name: "Add Collection" },
    ],
  },
  {
    key: "Chart",
    name: "Chart",
    icon: <ChartIcon />,
    children: [
      { path: "/chart", name: "Mange Chart" },
      { path: "/add-chart", name: "Add Chart" },
    ],
  },
  {
    key: "BulkAlert",
    name: "BulkAlert",
    icon: <BulkIcon />,
    children: [
      { path: "/bulk-alert", name: "Mange BulkAlert" },
      { path: "/add-bulk-alert", name: "Add BulkAlert" },
    ],
  },
  {
    key: "Brands",
    name: "Brands",
    icon: <BrandIcon />,
    children: [
      { path: "/brand", name: "Mange Brands" },
      { path: "/add-brand", name: "Add Brand" },
    ],
  },
  {
    key: "Coupons",
    name: "Coupons",
    icon: <CardIcon />,
    children: [
      { path: "/coupons", name: "Mange Coupons" },
      { path: "/add-coupon", name: "Add Coupon" },
    ],
  },
  {
    key: "Currency",
    name: "Currency",
    icon: <CurrencyIcon />,
    children: [
      { path: "/currency", name: "Mange Currency" },
      { path: "/add-currency", name: "Add Currency" },
    ],
  },
  {
    key: "Product Features",
    name: "Product Features",
    icon: <UserIcon />,
    children: [
      { path: "/collar", name: "Mange Collar" },
      { path: "/add-collar", name: "InsertOne" },
    ],
  },
  {
    key: "fabric",
    name: "fabric",
    icon: <UserIcon />,
    children: [
      { path: "/add-fabric", name: "add fabric" },
      { path: "/fabric", name: "Mange fabric" },
    ],
  },
  {
    key: "feature",
    name: "feature",
    icon: <UserIcon />,
    children: [
      { path: "/feature", name: "Mange feature" },
      { path: "/add-feature", name: "add feature" },
    ],
  },
  {
    key: "lining",
    name: "lining",
    icon: <UserIcon />,
    children: [
      { path: "/lining", name: "Mange lining" },
      { path: "/add-lining", name: "add lining" },
    ],
  },
  {
    key: "material",
    name: "material",
    icon: <UserIcon />,
    children: [
      { path: "/material", name: "Mange material" },
      { path: "/add-material", name: "add material" },
    ],
  },
  {
    key: "pattern",
    name: "pattern",
    icon: <UserIcon />,
    children: [
      { path: "/pattern", name: "Mange pattern" },
      { path: "/add-pattern", name: "add pattern" },
    ],
  },
  {
    key: "season",
    name: "season",
    icon: <UserIcon />,
    children: [
      { path: "/season", name: "Mange season" },
      { path: "/add-season", name: "add season" },
    ],
  },
  {
    key: "sleeve",
    name: "sleeve",
    icon: <UserIcon />,
    children: [
      { path: "/sleeve", name: "Mange sleeve" },
      { path: "/add-sleeve", name: "add sleeve" },
    ],
  },
  {
    key: "Newsletter",
    name: "Newsletter",
    icon: <UserIcon />,
    children: [
      { path: "/newsletter", name: "Mange Newsletter" },
      { path: "/add-newsletter", name: "Add Newsletter" },
    ],
  },
  {
    key: "News",
    name: "News",
    icon: <UserIcon />,
    children: [
      { path: "/news", name: "Mange News" },
      { path: "/add-news", name: "Add News" },
    ],
  },
  {
    key: "Sales",
    name: "Sales",
    icon: <UserIcon />,
    children: [
      { path: "/sale", name: "Mange Sales" },
      { path: "/add-sale", name: "Add Sale" },
    ],
  },
  {
    key: "Orders",
    icon: <UserIcon />,
    name: "Orders",
    path: "/order",
  },
  { key: "users", icon: "", path: "/user", name: "Mange Users" },
  { key: "comments", icon: "", path: "/comments", name: "Mange Comments" },
  { key: "logs", icon: "", path: "/logs", name: "Mange Logs" },
];

// { path: "/add-color", name: 'Color'  },
// list or table paths

// export const menuData = [
//   {
//     key: "account",
//     name: "Account",
//     link: "account",
//     icon: <UserIcon />,
//     children: [
//       { key: "account-card", name: "account card", link: "/list/account" },
//       {
//         key: "chart-of-accounts",
//         name: "Chart of accounts",
//         link: "/Chart/account",
//       },
//       {
//         key: "cost-centers",
//         name: "Cost centers",
//         link: "cost-centers",
//         subChild: [
//           {
//             key: "Const center card",
//             name: "Const center card",
//             link: "/list/cost",
//           },
//           {
//             key: "Chart of cost center",
//             name: "Chart of cost center",
//             link: "/Chart/cost",
//           },
//         ],
//       },
//       {
//         key: "currencies",
//         name: "Currencies",
//         link: "currencies",
//         subChild: [
//           {
//             key: "Currency card",
//             name: "Currency card",
//             link: "/list/Currency",
//           },
//           {
//             key: "Bulletin currency prices",
//             name: "Bulletin currency prices",
//             link: "/list/Currency",
//           },

//           {
//             key: "Currency rate differences",
//             name: "Currency rate differences",
//             link: "/list/Currency",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     key: "cards",
//     name: "Cards",
//     link: "cards",
//     icon: <ClipboardIcon />,
//     children: [
//       {
//         key: "Customer",
//         name: "Customer/Supplier Card",
//         link: "/list/customer",
//       },
//       {
//         key: "Building",
//         name: "Building Card",
//         link: "/list/building",
//       },
//       {
//         key: "Flat",
//         name: "Flat Card",
//         link: "/list/apartment",
//       },
//       {
//         key: "Shop",
//         name: "Shop Card",
//         link: "/list/shop",
//       },
//       {
//         key: "Parking",
//         name: "Parking Card",
//         link: "/list/parking",
//       },
//       {
//         key: "Land",
//         name: "Land Card",
//         link: "/list/Landcontract",
//       },
//       {
//         key: "Villa",
//         name: "Villa Card",
//         link: "/list/Villa",
//       },
//       {
//         key: "Leaser",
//         name: "Leasor Card",
//         link: "/list/RentInfo",
//       },
//       {
//         key: "Owner",
//         name: "Owner Card",
//         link: "/list/Owner",
//       },
//       {
//         key: "Salesman",
//         name: "Salesman Card",
//         link: "/list/salesman",
//       },
//       {
//         key: "Watchman",
//         name: "Watchman Card",
//         link: "/list/watchman",
//       },
//       {
//         key: "Quotation Card",
//         name: "Quotation Card",
//         link: "/list/OfferPrice",
//       },
//     ],
//   },
//   {
//     key: "materials",
//     name: "Materials",
//     link: "",
//     icon: <PuzzleIcon />,
//     children: [
//       {
//         key: "Material",
//         name: "Material Card",
//         link: "/list/mat",
//       },
//       {
//         key: "Group",
//         name: "Group Card",
//         link: "/list/matgroup",
//       },
//       {
//         key: "chartMaterial",
//         name: "Chart of Materials",
//         link: "/Chart/mat",
//       },
//       {
//         key: "Store",
//         name: "Store Card",
//         link: "/list/Store",
//       },
//       {
//         key: "Chart of Stores",
//         name: "Chart of Stores",
//         link: "/Chart/store",
//       },
//       {
//         key: "Activity reports",
//         name: "Activity reports",
//         link: "/report/materials",
//       },
//     ],
//   },
//   {
//     key: "assets",
//     name: "Assets",
//     link: "",
//     icon: <BuildingIcon />,
//     children: [
//       {
//         key: "Asset Category",
//         name: "Asset Category",
//         link: "/list/AssetsGroup",
//       },
//       {
//         key: "Asset Card",
//         name: "Asset Card",
//         link: "/list/Assets",
//       },

//       {
//         key: "Chart of Assets",
//         name: "Chart of Assets",
//         link: "/Chart/Assets",
//       },
//     ],
//   },
//   {
//     key: "realty",
//     name: "Realty Transactions",
//     link: "realty",
//     icon: <BanknoteIcon />,
//     children: [
//       {
//         key: "Contracts",
//         name: "Contracts",
//         link: "",
//         subChild: [
//           {
//             key: 1,
//             name: "Rent Contracts",
//             link: "",
//             subChild: [
//               {
//                 key: 1,
//                 name: "Flat rent contract",
//                 link: "/LeaseApartment",
//               },
//               {
//                 key: 2,
//                 name: "Shop rent contract",
//                 link: "/list/",
//               },
//               {
//                 key: 2,
//                 name: "Parking rent contract",
//                 link: "/list/",
//               },
//             ],
//           },
//           {
//             key: 2,
//             name: "Sale Contracts",
//             link: "",
//             subChild: [
//               {
//                 key: 1,
//                 name: "Flat sale contract",
//                 link: "/list/FlatContractFee",
//               },
//               {
//                 key: 2,
//                 name: "Shop sale contract",
//                 link: "/list/",
//               },
//               {
//                 key: 3,
//                 name: "Parking sale contract",
//                 link: "/list/",
//               },
//               {
//                 key: 4,
//                 name: "Land sale contract",
//                 link: "/list/",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         key: "services",
//         name: "Services contracts",
//         link: "/list/",
//       },
//       {
//         key: "electricity",
//         name: "Electricity bills",
//         link: "/list/",
//       },
//       {
//         key: "lawsuit",
//         name: "Lawsuit",
//         link: "/list/",
//       },
//       {
//         key: "Owners Associations Fees",
//         name: "Owners Associations Fees",
//         link: "/list/",
//       },
//       {
//         key: "Contract cycle",
//         name: "Contract cycle",
//         link: "/list/",
//       },
//       {
//         key: "Building electricity meter reading",
//         name: "Building electricity meter reading",
//         link: "/list/",
//       },
//     ],
//   },
//   {
//     key: "internal",
//     name: "Internal maintenance",
//     link: "",
//     icon: <GearIcon />,
//     children: [
//       {
//         key: 1,
//         name: "Maintenance worker card",
//         link: "/",
//       },
//       {
//         key: 2,
//         name: "Complaint card",
//         link: "/",
//       },

//       {
//         key: 3,
//         name: "Maintenance order",
//         link: "/",
//       },

//       {
//         key: 4,
//         name: "Complaints report",
//         link: "/",
//       },

//       {
//         key: 5,
//         name: "Maintenance orders report",
//         link: "/",
//       },
//     ],
//   },
//   {
//     key: "Maintenance",
//     name: "Maintenance",
//     link: "",
//     icon: <BriefcaseIcon />,
//     children: [
//       {
//         key: "external",
//         name: "External maintenance",
//         link: "",
//         subChild: [
//           {
//             key: 1,
//             name: "Maintenance contracts",
//             link: "/",
//           },
//           {
//             key: 2,
//             name: "Maintenance work card",
//             link: "/",
//           },

//           {
//             key: 3,
//             name: "Maintenance visits",
//             link: "/",
//           },

//           {
//             key: 4,
//             name: "Maintenance visits report",
//             link: "/",
//           },

//           {
//             key: 5,
//             name: "Maintenance Contracts report",
//             link: "/",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     key: "tools",
//     name: "Tools",
//     link: "",
//     icon: <ToolsIcon />,
//     children: [
//       {
//         key: "tool 1",
//         name: "tool 1",
//         link: "/tools",
//       },
//       {
//         key: "contract type",
//         name: "Contract Type",
//         link: "/ContractType",
//       },
//     ],
//   },
// ];
