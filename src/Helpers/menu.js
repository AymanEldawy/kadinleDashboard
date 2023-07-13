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
    key: "Languages",
    name: "Languages",
    link: "",
    icon: <LanguageIcon />,
    path: "/language",
    children: [],
  },
  {
    key: "products",
    name: "Products",
    icon: <ProductIcon />,
    path: "/product",
    children: [],
  },
  {
    key: "categories",
    name: "categories",
    icon: <TagsIcon />,
    path: "/category",
    children: [
      // { path: "/category", name: "Mange Categories" },
      // { path: "/add-category", name: "Add Category" },
      // { path: "/categories-content", name: "Categories content" },
      // { path: "/add-category-content", name: "Add Category content" },
    ],
  },
  {
    key: "Colors",
    name: "Colors",
    icon: <PaletteIcon />,
    path: "/color",
    children: [
      // { path: "/color", name: "Mange Colors" },
      // { path: "/add-color", name: "Add Color" },
      // { path: "/colors-content", name: "Colors content" },
      // { path: "/add-color-content", name: "Add Color content" },
    ],
  },
  {
    key: "Addresses",
    name: "Addresses",
    icon: <MapIcon />,
    path: "/address",
    children: [],
    // children: [
    //   { path: "/address", name: "Mange Addresses" },
    //   { path: "/add-address", name: "Add Address" },
    // ],
  },
  {
    key: "Sizes",
    name: "Sizes",
    icon: <RulerIcon />,
    path: "/size",
    children: [
      // { path: "/size", name: "Mange Sizes" },
      // { path: "/add-size", name: "Add Size" },
      // { path: "/sizes-content", name: "Sizes content" },
      // { path: "/add-size-content", name: "Add size content" },
    ],
  },
  {
    key: "Countries",
    name: "Countries",
    path: "/country",
    icon: <WorldIcon />,
    children: [
      // { path: "/country", name: "Mange Countries" },
      // { path: "/add-country", name: "Add Country" },
    ],
  },
  {
    key: "Regions",
    name: "Regions",
    icon: <WorldIcon />,
    path: "/region",
    children: [
      // { path: "/add-region", name: "Add Region" },
      // { path: "/region", name: "Mange Regions" },
    ],
  },
  {
    key: "Collections",
    name: "Collections",
    icon: <CollectionIcon />,
    path: "/collection",
    children: [
      // { path: "/collection", name: "Mange Collections" },
      // { path: "/add-collection", name: "Add Collection" },
      // { path: "/collection-content", name: "Collections Content" },
      // { path: "/add-collection-content", name: "Add Collection content" },
    ],
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
    children: [
      // { path: "/bulk-alert", name: "Mange BulkAlert" },
      // { path: "/add-bulk-alert", name: "Add BulkAlert" },
    ],
  },
  {
    key: "Brands",
    name: "Brands",
    icon: <BrandIcon />,
    path: "/brand",
    children: [
      // { path: "/brand", name: "Mange Brands" },
      // { path: "/add-brand", name: "Add Brand" },
    ],
  },
  {
    key: "Coupons",
    name: "Coupons",
    icon: <CardIcon />,
    path: "/coupons",
    children: [
      // { path: "/coupons", name: "Mange Coupons" },
      // { path: "/add-coupon", name: "Add Coupon" },
    ],
  },
  {
    key: "Currency",
    name: "Currency",
    icon: <CurrencyIcon />,
    path: "/currency",
    children: [
      // { path: "/currency", name: "Mange Currency" },
      // { path: "/add-currency", name: "Add Currency" },
    ],
  },
  {
    key: "Product Features",
    name: "Product Features",
    icon: <FireIcon />,
    path: "product-features",
    children: [],
  },
  {
    key: "News",
    name: "News",
    icon: <NewsIcon />,
    path: "/news",
    children: [
      // { path: "/news", name: "Mange News" },
      // { path: "/add-news", name: "Add News" },
    ],
  },
  {
    key: "Newsletter",
    name: "Newsletter",
    icon: <BookOpenIcon />,
    path: "/newsletter",
    children: [
      // { path: "/newsletter", name: "Mange Newsletter" },
      // { path: "/add-newsletter", name: "Add Newsletter" },
    ],
  },
  {
    key: "Newsletter",
    name: "Newsletter subscription",
    icon: <UserGroupIcon />,
    path: "/Newsletter-subscription",
    children: [
      // { path: "/newsletter", name: "Mange Newsletter" },
      // { path: "/add-newsletter", name: "Add Newsletter" },
    ],
  },

  {
    key: "Sales",
    name: "Sales",
    icon: <SparklesIcon />,
    path: "/sale",
    children: [
      // { path: "/sale", name: "Mange Sales" },
      // { path: "/add-sale", name: "Add Sale" },
    ],
  },
  {
    key: "Orders",
    icon: <BoxIcon />,
    name: "Orders",
    path: "/order",
    children: [],
  },
  {
    key: "return-status",
    icon: <BoxIcon />,
    name: "return status",
    path: "/return-status",
    children: [],
  },
  {
    key: "Orders-status",
    icon: <BoxIcon />,
    name: "Order status",
    path: "/order-status",
    children: [],
  },
  {
    key: "order-return-requests",
    icon: <BoxIcon />,
    name: "order return requests",
    path: "/order-return-requests",
    children: [],
  },
  {
    key: "users",
    icon: <UserIcon />,
    path: "/user",
    name: "Users",
    children: [],
  },
  {
    key: "comments",
    icon: <MessageIcon />,
    path: "/comments",
    name: "Comments",
    children: [],
  },
  {
    key: "logs",
    icon: <ExclamationTriangleIcon />,
    path: "/logs",
    name: "Logs",
    children: [],
  },
  {
    key: "offers",
    icon: <PackageIcon />,
    path: "/offers",
    name: "offers",
    children: [],
  },
  {
    key: "home-reviews",
    icon: <PackageIcon />,
    path: "/home-reviews",
    name: "home reviews",
    children: [],
  },
  {
    key: "showreels",
    icon: <PackageIcon />,
    path: "/showreels",
    name: "Showreels",
    children: [],
  },
  {
    key: "stocks",
    icon: <PackageIcon />,
    path: "/stocks",
    name: "Stock",
    children: [],
  },
  {
    key: "warehouses",
    icon: <PackageIcon />,
    path: "/warehouses",
    name: "warehouses",
    children: [],
  },
  {
    key: "warehouse-availability",
    icon: <PackageIcon />,
    path: "/warehouse-availability",
    name: "warehouse availability",
    children: [],
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
