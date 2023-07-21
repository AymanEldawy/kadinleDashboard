import {
  BanknoteIcon,
  BoxClose,
  BoxIcon,
  BoxIn,
  BoxReturn,
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
  HomeIcon,
  LanguageIcon,
  MapIcon,
  NewsIcon,
  PaletteIcon,
  ProductIcon,
  PuzzleIcon,
  RulerIcon,
  SelectIcon,
  SparklesIcon,
  StarIcon,
  StoreIcon,
  TagsIcon,
  ToolsIcon,
  UploadIcon,
  UserGroupIcon,
  UserIcon,
  WorldIcon,
} from "./Icons";
import BookOpenIcon from "./Icons/BookOpenIcon";
import ChartSolidIcon from "./Icons/ChartSolidIcon";
import ClipboardIcon from "./Icons/ClipboardIcon";
import DatabaseIcon from "./Icons/DatabaseIcon";
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
      // {
      //   key: "Languages",
      //   name: "Languages",
      //   icon: <LanguageIcon />,
      //   path: "/language",
      // },
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
        key: "Brands",
        name: "Brands",
        icon: <BrandIcon />,
        path: "/brand",
      },
      {
        key: "stocks",
        icon: <DatabaseIcon />,
        path: "/stocks",
        name: "Stock",
      },
    ],
  },

  {
    key: "feature",
    groupTitle: "feature",
    groupList: [
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
        key: "Product Features",
        name: "Product Features",
        icon: <FireIcon />,
        path: "product-features",
      },
    ],
  },

  {
    key: "chart",
    groupTitle: "chart",
    groupList: [
      { path: "/chart", icon: <ChartSolidIcon />, name: "Chart" },
      { path: "/chart-data", icon: <ChartIcon />, name: " Chart data" },
    ],
  },

  {
    key: "award",
    groupTitle: "award",
    groupList: [
      {
        key: "point",
        name: "point",
        icon: <BulkIcon />,
        path: "/points",
      },

      {
        key: "Coupons",
        name: "Coupons",
        icon: <CardIcon />,
        path: "/coupons",
      },
    ],
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
      {
        key: "BulkAlert",
        name: "BulkAlert",
        icon: <BulkIcon />,
        path: "/bulk-alert",
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
        path: "/orders",
      },
      {
        key: "return-status",
        icon: <BoxClose />,
        name: "return status",
        path: "/return-status",
      },
      {
        key: "Orders-status",
        icon: <BoxIn />,
        name: "Order status",
        path: "/order-status",
      },
      {
        key: "order-return-requests",
        icon: <BoxReturn />,
        name: "order return requests",
        path: "/order-return-requests",
      },
      {
        key: "warehouses",
        icon: <StoreIcon />,
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
    key: "customers",
    groupTitle: "customers",
    groupList: [
      {
        key: "users",
        icon: <UserIcon />,
        path: "/users",
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
        icon: <StarIcon />,
        path: "/home-reviews",
        name: "home reviews",
      },
      // {
      //   key: "showreels",
      //   icon: <PackageIcon />,
      //   path: "/showreels",
      //   name: "Showreels",
      // },
    ],
  },

  {
    key: "actions",
    icon: <GearIcon />,
    groupTitle: "Actions",
    groupList: [
      {
        key: "logs",
        icon: <ExclamationTriangleIcon />,
        path: "/logs",
        name: "Logs",
      },
      {
        path: "/select-products",
        icon: <SelectIcon />,
        name: "Select products",
      },
      {
        path: "/upload-sheet",
        icon: <UploadIcon />,
        name: "Upload XLS Sheets",
      },
      {
        path: "/home-sections",
        icon: <HomeIcon />,
        name: "Home Sections",
      },
      // { path: "/send-email", name: "send newsLetter" },
    ],
  },
];
