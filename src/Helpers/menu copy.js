import {
  BanknoteIcon,
  BoxIcon,
  BrandIcon,
  BriefcaseIcon,
  BuildingIcon,
  BulkIcon,
  CardIcon,
  ChartIcon,
  CollectionIcon,
  CurrencyIcon,
  FireIcon,
  GearIcon,
  LanguageIcon,
  MapIcon,
  NewsIcon,
  PaletteIcon,
  ProductIcon,
  PuzzleIcon,
  RulerIcon,
  SparklesIcon,
  TagsIcon,
  ToolsIcon,
  UserGroupIcon,
  UserIcon,
  WorldIcon,
} from "./Icons";
import BookOpenIcon from "./Icons/BookOpenIcon";
import ClipboardIcon from "./Icons/ClipboardIcon";
import ExclamationTriangleIcon from "./Icons/ExclamationTriangleIcon";
import MessageIcon from "./Icons/MessageIcon";
import PackageIcon from "./Icons/PackageIcon";

export const menuData = [
  {
    key: "locations",
    groupTitle: "locations",
    groupList: [
      {
        key: "Addresses",
        name: "Addresses",
        icon: <MapIcon />,
        path: "/address",
      },

      {
        key: "Countries",
        name: "Countries",
        path: "/country",
        icon: <WorldIcon />,
      },
      {
        key: "Currency",
        name: "Currency",
        icon: <CurrencyIcon />,
        path: "/currency",
      },
      {
        key: "Languages",
        name: "Languages",
        icon: <LanguageIcon />,
        path: "/language",
      },
      {
        key: "Regions",
        name: "Regions",
        icon: <WorldIcon />,
        path: "/region",
      },
    ],
  },

  {
    key: "content",
    groupTitle: "content",
    groupList: [
      {
        key: "products",
        name: "Products",
        icon: <ProductIcon />,
        path: "/product",
      },
      {
        key: "Product Features",
        name: "Product Features",
        icon: <FireIcon />,
        path: "product-features",
      },
      {
        key: "categories",
        name: "categories",
        icon: <TagsIcon />,
        path: "/category",
      },
      {
        key: "Colors",
        name: "Colors",
        icon: <PaletteIcon />,
        path: "/color",
      },

      {
        key: "Sizes",
        name: "Sizes",
        icon: <RulerIcon />,
        path: "/size",
      },
      {
        key: "Chart",
        name: "Chart",
        icon: <ChartIcon />,
        children: [
          { path: "/chart", name: "Chart Content" },
          // { path: "/add-chart", name: "Add Chart" },
          // { path: "/chart-content", name: "Chart content" },
          // { path: "/add-chart-content", name: "Add Chart content" },
          { path: "/chart-data", name: " Chart data" },
          // { path: "/add-chart-data", name: "Add Chart data" },
        ],
      },
    ],
  },

  {
    key: "BulkAlert",
    name: "BulkAlert",
    icon: <BulkIcon />,
    path: "/bulk-alert",
    children: [
      // { path: "/bulk-alert", name: "Mange BulkAlert" },
      // { path: "/add-bulk-alert", name: "Add BulkAlert" },
    ],
  },
  {
    key: "point",
    name: "point",
    icon: <BulkIcon />,
    path: "/points",
  },
  {
    key: "Brands",
    name: "Brands",
    icon: <BrandIcon />,
    path: "/brand",
  },
  {
    key: "Coupons",
    name: "Coupons",
    icon: <CardIcon />,
    path: "/coupons",
  },

  {
    key: "news",
    groupTitle: "News",
    groupList: [
      {
        key: "News",
        name: "News",
        icon: <NewsIcon />,
        path: "/news",
      },
      {
        key: "Newsletter",
        name: "Newsletter",
        icon: <BookOpenIcon />,
        path: "/newsletter",
      },
      {
        key: "Newsletter",
        name: "Newsletter subscription",
        icon: <UserGroupIcon />,
        path: "/Newsletter-subscription",
      },
    ],
  },

  {
    key: "orders",
    groupTitle: "orders",
    groupList: [
      {
        key: "Orders",
        icon: <BoxIcon />,
        name: "Orders",
        path: "/order",
      },
      {
        key: "return-status",
        icon: <BoxIcon />,
        name: "return status",
        path: "/return-status",
      },
      {
        key: "Orders-status",
        icon: <BoxIcon />,
        name: "Order status",
        path: "/order-status",
      },
      {
        key: "order-return-requests",
        icon: <BoxIcon />,
        name: "order return requests",
        path: "/order-return-requests",
      },
    ],
  },
  {
    key: "customers",
    groupTitle: "customers",
    groupList: [
      {
        key: "users",
        icon: <UserIcon />,
        path: "/user",
        name: "Users",
      },
    ],
  },
  {
    key: "seasons",
    groupTitle: "seasons",
    groupList: [
      {
        key: "Collections",
        name: "Collections",
        icon: <CollectionIcon />,
        path: "/collection",
      },
      {
        key: "Sales",
        name: "Sales",
        icon: <SparklesIcon />,
        path: "/sale",
      },
      {
        key: "offers",
        icon: <PackageIcon />,
        path: "/offers",
        name: "offers",
      },
    ],
  },
  {
    key: "interactive",
    groupTitle: "interactive",
    groupList: [
      {
        key: "comments",
        icon: <MessageIcon />,
        path: "/comments",
        name: "Comments",
      },
      {
        key: "home-reviews",
        icon: <PackageIcon />,
        path: "/home-reviews",
        name: "home reviews",
      },
      {
        key: "showreels",
        icon: <PackageIcon />,
        path: "/showreels",
        name: "Showreels",
      },
    ],
  },

  {
    key: "logs",
    icon: <ExclamationTriangleIcon />,
    path: "/logs",
    name: "Logs",
  },

  {
    key: "interactive",
    groupTitle: "interactive",
    groupList: [
      {
        key: "stocks",
        icon: <PackageIcon />,
        path: "/stocks",
        name: "Stock",
      },
      {
        key: "warehouses",
        icon: <PackageIcon />,
        path: "/warehouses",
        name: "warehouses",
      },
      {
        key: "warehouse-availability",
        icon: <PackageIcon />,
        path: "/warehouse-availability",
        name: "warehouse availability",
      },
    ],
  },
  {
    key: "actions",
    icon: <GearIcon />,
    path: "/actions",
    name: "Actions",
    children: [
      { path: "/select-products", name: "Select products" },
      { path: "/upload-sheet", name: "Upload XLS Sheets" },
      { path: "/send-email", name: "send newsLetter" },
    ],
  },
];

const newMenu = [
  {
    key: "",
    groupTitle: "actions",
    groupList: [{}],
  },
];
