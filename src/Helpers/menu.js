import {
  ArrowPathIcon, BanknotesIcon,
  BookMarkIcon,
  BookOpenIcon,
  BoxClose,
  BoxIcon,
  BoxIn,
  BoxReturn,
  BrandIcon, BulkIcon,
  CardIcon,
  ChartContentIcon,
  ChartIcon,
  ChatIcon,
  ClipboardIcon,
  CollectionIcon,
  CurrencyIcon,
  DatabaseIcon,
  ExclamationTriangleIcon,
  FireIcon,
  GearIcon,
  HomeIcon, MapIcon,
  MessageIcon,
  NewsIcon,
  PackageIcon,
  PaletteIcon,
  ProductIcon, RulerIcon, SenderIcon,
  SparklesIcon,
  StarIcon,
  StoreIcon,
  TagsIcon,
  TimeIcon, TrunkIcon,
  UploadIcon,
  UserGroupIcon,
  UserIcon,
  UsersPlusIcon,
  WorldIcon
} from "./Icons";
import ChipsIcon from "./Icons/ChipsIcon";
import FlashIcon from "./Icons/FlashIcon";
import GalleryIcon from './Icons/GalleryIcon';
import MinusIcon from "./Icons/MinusIcon";
import RoundedArrowsIcon from "./Icons/RoundedArrowsIcon";

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
        path: "/products",
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
      // {
      //   key: "Product Features",
      //   name: "Product Features",
      //   icon: <FireIcon />,
      //   path: "product-features",
      // },
    ],
  },

  {
    key: "chart",
    groupTitle: "chart",
    groupList: [
      // { path: "/chart", icon: <ChartSolidIcon />, name: "Chart" },
      {
        path: "/chart",
        icon: <ChartContentIcon />,
        name: "Chart",
      },
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
        key: "less_than",
        name: "less than",
        icon: <MinusIcon />,
        path: "/less_than",
      },
      {
        key: "Coupons",
        name: "Coupons",
        icon: <CardIcon />,
        path: "/coupons",
      },
      {
        key: "special offer",
        name: "Special Offer",
        icon: <FlashIcon />,
        path: "/special-offer",
      },
    ],
  },

  {
    key: "news",
    groupTitle: "News",
    groupList: [
      {
        key: "definitions",
        name: "definitions",
        icon: <BookMarkIcon />,
        path: "/definitions",
      },
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
      {
        key: "shipping-prices",
        icon: <TrunkIcon />,
        path: "/shipping-prices",
        name: "shipping prices",
      },
    ],
  },
  {
    key: "Reports",
    groupTitle: "Reports",
    groupList: [
      {
        key: "bill",
        icon: <BanknotesIcon />,
        name: "Bill",
        path: "/bills",
      },
      {
        key: "order-report",
        icon: <ClipboardIcon />,
        name: "Order Reports",
        path: "/order-reports",
      },
      {
        key: "bill-report",
        icon: <ArrowPathIcon />,
        name: "bill reports",
        path: "/bill-reports",
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
      {
        key: "partners",
        icon: <UserGroupIcon />,
        path: "/partners",
        name: "Partners",
      },
      {
        key: "suppliers",
        icon: <UserGroupIcon />,
        path: "/suppliers",
        name: "Suppliers",
      },
      {
        key: "suppliers-request",
        icon: <UsersPlusIcon />,
        path: "/supplier-request",
        name: "Suppliers request",
      },
    ],
  },

  {
    key: "support",
    icon: <GearIcon />,
    groupTitle: "support",
    groupList: [
      {
        key: "support",
        icon: <ChatIcon />,
        path: "/support",
        name: "support",
      },
      {
        key: "chat-setting",
        icon: <TimeIcon />,
        path: "/chat-setting",
        name: "chat setting",
      },
    ],
  },
  {
    key: "actions",
    icon: <GearIcon />,
    groupTitle: "Actions",
    groupList: [
      {
        key: "change-category",
        icon: <RoundedArrowsIcon className="h-6 w-6" />,
        path: "/change-category",
        name: "change category",
      },
      {
        key: "categories-Banner",
        icon: <TagsIcon className="h-6 w-6" />,
        path: "/categories-Banner",
        name: "categories Banner",
      },
      {
        key: "chunks",
        icon: <ChipsIcon className="h-6 w-6" />,
        path: "/chunks",
        name: "Chunks",
      },
      {
        key: "logs",
        icon: <ExclamationTriangleIcon />,
        path: "/logs",
        name: "Logs",
      },
      // {
      //   path: "/select-products",
      //   icon: <SelectIcon />,
      //   name: "Select products",
      // },
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
      {
        path: "/products-slider",
        icon: <GalleryIcon />,
        name: "Products slider",
      },
      {
        path: "/home-slider",
        icon: <GalleryIcon />,
        name: "Home slider",
      },
      {
        path: "/products-supplier",
        icon: <GalleryIcon />,
        name: "Products supplier",
      },
      {
        path: "/xml-import",
        icon: <UploadIcon />,
        name: "XML Import",
      },
      { path: "/send-email", icon: <SenderIcon />, name: "send newsLetter" },
    ],
  },
];
