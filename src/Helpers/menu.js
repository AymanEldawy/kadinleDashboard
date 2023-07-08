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
  UserIcon,
  WorldIcon,
} from "./Icons";
import BookOpenIcon from "./Icons/BookOpenIcon";
import ClipboardIcon from "./Icons/ClipboardIcon";
import ExclamationTriangleIcon from "./Icons/ExclamationTriangleIcon";
import MessageIcon from "./Icons/MessageIcon";

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
      { path: "/categories-content", name: "Categories content" },
      { path: "/add-category", name: "Add Category" },
      { path: "/add-category-content", name: "Add Category content" },
    ],
  },
  {
    key: "Colors",
    name: "Colors",
    icon: <PaletteIcon />,
    children: [
      { path: "/color", name: "Mange Colors" },
      { path: "/add-color", name: "Add Color" },
      { path: "/colors-content", name: "Colors content" },
      { path: "/add-color-content", name: "Add Color content" },
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
    children: [
      { path: "/size", name: "Mange Sizes" },
      { path: "/add-size", name: "Add Size" },
      { path: "/sizes-content", name: "Sizes content" },
      { path: "/add-size-content", name: "Add size content" },
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
      { path: "/collection-content", name: "Collections Content" },
      { path: "/add-collection-content", name: "Add Collection content" },
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
    icon: <FireIcon />,
    children: [
      { path: "/collar", name: "Mange Collar" },
      { path: "/add-collar", name: "add Collar" },
      { path: "/add-fabric", name: "add fabric" },
      { path: "/fabric", name: "Mange fabric" },
      { path: "/feature", name: "Mange feature" },
      { path: "/add-feature", name: "add feature" },
      { path: "/lining", name: "Mange lining" },
      { path: "/add-lining", name: "add lining" },
      { path: "/material", name: "Mange material" },
      { path: "/add-material", name: "add material" },
      { path: "/pattern", name: "Mange pattern" },
      { path: "/add-pattern", name: "add pattern" },
      { path: "/season", name: "Mange season" },
      { path: "/add-season", name: "add season" },
      { path: "/sleeve", name: "Mange sleeve" },
      { path: "/add-sleeve", name: "add sleeve" },
    ],
  },
  {
    key: "Newsletter",
    name: "Newsletter",
    icon: <BookOpenIcon />,
    children: [
      { path: "/newsletter", name: "Mange Newsletter" },
      { path: "/add-newsletter", name: "Add Newsletter" },
    ],
  },
  {
    key: "News",
    name: "News",
    icon: <NewsIcon />,
    children: [
      { path: "/news", name: "Mange News" },
      { path: "/add-news", name: "Add News" },
    ],
  },
  {
    key: "Sales",
    name: "Sales",
    icon: <SparklesIcon />,
    children: [
      { path: "/sale", name: "Mange Sales" },
      { path: "/add-sale", name: "Add Sale" },
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
    key: "users",
    icon: <UserIcon />,
    path: "/user",
    name: "Mange Users",
    children: [],
  },
  {
    key: "comments",
    icon: <MessageIcon />,
    path: "/comments",
    name: "Mange Comments",
    children: [],
  },
  {
    key: "logs",
    icon: <ExclamationTriangleIcon />,
    path: "/logs",
    name: "Mange Logs",
    children: [],
  },
];
