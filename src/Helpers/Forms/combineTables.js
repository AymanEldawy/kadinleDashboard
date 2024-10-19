import { Link } from "react-router-dom";
import { FullImage } from "./../../Components/Global/FullImage/FullImage";
import { UserInfo } from "../../Components/Global/UserInfo/UserInfo";
import { EyeIcon, SlashEyeIcon } from "../Icons";
import { RefreshChunksBtn } from "../../Components/RefreshChunksBtn";
import { RefreshWeightsBtn } from "../../Components/RefreshWeightsBtn";
import { ProductInfo } from "../../Components/Global/FullImage/ProductInfo";
import { ProductToggleView } from "../../Components/Global/FullImage/ProductToggleView";

const combine_address = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "country",
    header: "country",
    cell: ({ getValue }) => {
      let country = getValue();
      return (
        <Link
          to={`/update/country/${country?.id}`}
          className="text-blue-500 hover:underline"
        >
          {country?.name}
        </Link>
      );
    },
  },
  { accessorKey: "city", header: "city" },
  { accessorKey: "postal_code", header: "postal_code" },
  { accessorKey: "line_one", header: "line_one" },
  { accessorKey: "line_two", header: "line_two" },
  {
    accessorKey: "actions",
    header: "actions",
    cell: ({ row }) => (
      <Link
        to={`/update/address/${row?.original?.id}`}
        className="text-blue-500 hover:underline"
      >
        Edit
      </Link>
    ),
  },
];

const combine_brand = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: "name", header: "name" },
  {
    accessorKey: "actions",
    header: "actions",
    cell: ({ row }) => (
      <Link
        to={`/update/brand/${row?.original?.id}`}
        className="text-blue-500 hover:underline"
      >
        Edit
      </Link>
    ),
  },
];

const combine_Weights = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  { accessorKey: "category_sku", header: "category_sku" },
  { accessorKey: "gram", header: "gram" },
  {
    accessorKey: "actions",
    header: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-4 items-center">
          <Link
            to={`/update/weights/${row?.original?.id}`}
            className="text-blue-500 hover:underline"
          >
            Edit
          </Link>
          <RefreshWeightsBtn item={row?.original} />
        </div>
      );
    },
  },
];

const combine_chunks = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  { accessorKey: "min_price", header: "min_price" },
  { accessorKey: "max_price", header: "max_price" },
  { accessorKey: "percentage", header: "percentage" },
  { accessorKey: "available", header: "available" },
  {
    accessorKey: "actions",
    header: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-4 items-center">
          <Link
            to={`/update/chunks/${row?.original?.id}`}
            className="text-blue-500 hover:underline"
          >
            Edit
          </Link>
          <RefreshChunksBtn item={row?.original} />
        </div>
      );
    },
  },
];

const combine_bulk_alert = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  { accessorKey: "content", header: "content" },
];

const combine_category = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  {
    accessorKey: "parent_id",
    header: "parent",
    cell: ({ getValue, row }) => {
      let parent = getValue();
      return (
        <Link
          to={`/update/category/${parent?.id}`}
          className="text-blue-500 hover:underline"
        >
          {parent?.category_content?.at(0)?.title}
        </Link>
      );
    },
  },

  { accessorKey: "numeric", header: "numeric" },
  {
    accessorKey: "title",
    header: "title",
    cell: ({ getValue, row }) => {
      return (
        <Link
          to={`/update/category/${row?.original?.id}`}
          className="text-blue-500 hover:underline"
        >
          {row?.original?.category_content?.at(0)?.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "short_title",
    header: "short_title",
    cell: ({ getValue, row }) => {
      return (
        <Link
          to={`/update/category/${row?.original?.id}`}
          className="text-blue-500 hover:underline"
        >
          {row?.original?.category_content?.at(0)?.short_title}
        </Link>
      );
    },
  },

  {
    accessorKey: "description",
    header: "description",
    cell: ({ row }) => {
      let content = row?.original?.category_content?.at(0);
      return <span>{content?.description}</span>;
    },
  },
  {
    accessorKey: "image",
    header: "icon",
    cell: ({ getValue }) => {
      return <FullImage src={getValue()} alt={"image"} />;
    },
  },
  {
    accessorKey: "mobile_image",
    header: "mobile_image",
    cell: ({ row }) => {
      let content = row?.original?.category_content?.at(0);
      return <FullImage src={content?.mobile_image} alt={content?.title} />;
    },
  },
  {
    accessorKey: "web_image",
    header: "web_image",
    cell: ({ row }) => {
      let content = row?.original?.category_content?.at(0);
      return <FullImage src={content?.web_image} alt={content?.title} />;
    },
  },
  {
    accessorKey: "mobile_banner",
    header: "mobile_banner",
    cell: ({ row }) => {
      let content = row?.original?.category_content?.at(0);
      return <FullImage src={content?.mobile_banner} alt={content?.title} />;
    },
  },
  {
    accessorKey: "web_banner",
    header: "web_banner",
    cell: ({ row }) => {
      let content = row?.original?.category_content?.at(0);
      return <FullImage src={content?.web_banner} alt={content?.title} />;
    },
  },
  {
    accessorKey: "display_homepage",
    header: "display_homepage",
    cell: ({ getValue }) => (
      <span
        className={`px-8 py-1 rounded-md ${
          getValue() ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        {getValue() ? "Yes" : "No"}
      </span>
    ),
  },
  {
    accessorKey: "actions",
    header: "actions",
    cell: ({ row }) => (
      <Link
        to={`/update/category/${row?.original?.id}`}
        className="text-blue-500 hover:underline"
      >
        Edit
      </Link>
    ),
  },
];

const combine_chart = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "number",
    header: "number",
    cell: ({ row }) => <span>{row?.original?.chart?.number}</span>,
  },
  {
    accessorKey: "actions",
    header: "actions",
    cell: ({ row }) => (
      <Link
        to={`/update/chart/${row?.original?.id}`}
        className="text-blue-500 hover:underline"
      >
        Edit
      </Link>
    ),
  },
];

const combine_chart_group = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "group_name",
    header: "group_name",
    cell: ({ row, getValue }) => (
      <Link
        to={`/chart-group-form/${row?.original?.id}`}
        className="text-blue-500 hover:underline capitalize"
      >
        {getValue()}
      </Link>
    ),
  },
  {
    accessorKey: "chart_group_ids",
    header: "categories group count",
    cell: ({ getValue }) => <span>{getValue()?.length} Categories</span>,
  },
  {
    accessorKey: "actions",
    header: "actions",
    cell: ({ row }) => (
      <Link
        to={`/chart-group-form/${row?.original?.id}`}
        className="text-blue-500 hover:underline"
      >
        Edit
      </Link>
    ),
  },
];

const combine_chart_content = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  {
    accessorKey: "number",
    header: "number",
    cell: ({ row }) => <span>{row?.original?.chart?.number}</span>,
  },
  {
    accessorKey: "name",
    header: "name",
    cell: ({ row, getValue }) => (
      <Link
        to={`/update/chart/${row?.original?.chart_id}`}
        className="text-blue-500 hover:underline"
      >
        {getValue()}
      </Link>
    ),
  },
  { accessorKey: "column1", header: "column1" },
  { accessorKey: "column2", header: "column2" },
  { accessorKey: "column3", header: "column3" },
  { accessorKey: "column4", header: "column4" },
  { accessorKey: "column5", header: "column5" },
  { accessorKey: "column6", header: "column6" },
  { accessorKey: "column7", header: "column7" },
  { accessorKey: "column8", header: "column8" },
  {
    accessorKey: "actions",
    header: "actions",
    cell: ({ row }) => (
      <Link
        to={`/update/chart/${row?.original?.chart_id}`}
        className="text-blue-500 hover:underline"
      >
        Edit
      </Link>
    ),
  },
];

const combine_chart_data = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  {
    accessorKey: "chart",
    header: "chart",
    cell: ({ row }) => {
      return (
        <span className="font-medium whitespace-nowrap capitalize">
          {row?.original?.chart?.chart_content?.at(0)?.name}
        </span>
      );
    },
  },
  {
    accessorKey: "group_name",
    header: "group_name",
    cell: ({ row }) => {
      return (
        <span className="font-medium whitespace-nowrap capitalize">
          {row?.original?.chart_group?.group_name}
        </span>
      );
    },
  },
  {
    accessorKey: "size",
    header: "size",
    cell: ({ row }) => {
      return (
        <span className="font-medium whitespace-nowrap capitalize">
          {row?.original?.size?.size_content?.at(0)?.name}
        </span>
      );
    },
  },
  { accessorKey: "column1", header: "column1" },
  { accessorKey: "column2", header: "column2" },
  { accessorKey: "column3", header: "column3" },
  { accessorKey: "column4", header: "column4" },
  { accessorKey: "column5", header: "column5" },
  { accessorKey: "column6", header: "column6" },
  { accessorKey: "column7", header: "column7" },
  { accessorKey: "column8", header: "column8" },
  {
    accessorKey: "actions",
    header: "actions",
    cell: ({ row }) => (
      <Link
        to={`/update/chart_data/${row?.original?.id}`}
        className="text-blue-500 hover:underline"
      >
        Edit
      </Link>
    ),
  },
];

const combine_collection = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },

  {
    accessorKey: "sku",
    header: "sku",
    cell: ({ getValue, row }) => {
      return (
        <Link
          to={`/update/collection/${row?.original?.id}`}
          className="text-blue-500 hover:underline"
        >
          {getValue()}
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: "name",
    cell: ({ row }) => {
      console.log("🚀 ~ row:", row?.original);
      return (
        <Link
          to={`/update/collection/${row?.original?.id}`}
          className="text-blue-500 hover:underline"
        >
          {row?.original?.collection_content?.at(0)?.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "description",
    header: "description",
    cell: ({ row }) => {
      return (
        <span>{row?.original?.collection_content?.at(0)?.description}</span>
      );
    },
  },
  {
    accessorKey: "image",
    header: "image",
    cell: ({ row }) => {
      return (
        <FullImage
          src={row?.original?.collection_content?.at(0)?.image}
          width={80}
          height={60}
        />
      );
    },
  },
  {
    accessorKey: "display_home",
    header: "display_home",
    cell: ({ getValue }) => (
      <span
        className={`px-8 py-1 rounded-md ${
          getValue() ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        {getValue() ? "Yes" : "No"}
      </span>
    ),
  },
  {
    accessorKey: "color",
    header: "color",
    cell: ({ getValue }) => (
      <span
        style={{ background: getValue() }}
        className="block h-8 w-8 rounded-full border"
      />
    ),
  },
  {
    accessorKey: "actions",
    header: "actions",
    cell: ({ row }) => (
      <Link
        to={`/update/collection/${row?.original?.id}`}
        className="text-blue-500 hover:underline"
      >
        Edit
      </Link>
    ),
  },
];
const combine_color = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  { accessorKey: "numeric", header: "numeric" },
  { accessorKey: "color_sku", header: "color_sku" },
  {
    accessorKey: "hex",
    header: "hex",
    cell: ({ getValue }) => (
      <span
        style={{ background: getValue() }}
        className="block h-8 w-8 rounded-full border"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "name",

    cell: ({ row }) => (
      <Link
        to={`/update/color/${row?.original?.id}`}
        className="text-blue-500 hover:underline"
      >
        {row?.original?.color_content?.at(0)?.name}
      </Link>
    ),
  },
  { accessorKey: "image", header: "image" },
  // { accessorKey: "parent_id", header: "parent_id" },
];
const combine_comment = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "user",
    header: "user",
    cell: ({ getValue }) => <UserInfo user={getValue()} />,
  },
  { accessorKey: "product", header: "product" },
  { accessorKey: "rating", header: "rating" },
  { accessorKey: "content", header: "content" },
  { accessorKey: "url", header: "url" },
  { accessorKey: "views", header: "views" },
];
const combine_country = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: "name", header: "name" },
  { accessorKey: "ar_name", header: "ar_name" },
  { accessorKey: "tr_name", header: "tr_name" },
  { accessorKey: "alph-2", header: "alph-2" },
  { accessorKey: "alph-3", header: "alph-3" },
  {
    accessorKey: "currency",
    header: "currency",
    cell: ({ getValue }) => {
      let currency = getValue();
      return (
        <Link
          to={`/update/currency/${currency?.id}`}
          className="text-blue-500 hover:underline"
        >
          {currency?.currency}
        </Link>
      );
    },
  },
  { accessorKey: "rate", header: "rate" },
  { accessorKey: "exchange_percent", header: "exchange_percent" },
];
const combine_coupon = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "code",
    header: "code",
    cell: ({ row, getValue }) => (
      <Link
        to={`/update/coupon/${row?.original?.id}`}
        className="text-blue-500 hover:underline"
      >
        {getValue()}
      </Link>
    ),
  },
  { accessorKey: "value", header: "value" },
  {
    accessorKey: "percentage",
    header: "percentage",
    cell: ({ getValue }) => (
      <span
        className={`px-8 py-1 rounded-md ${
          getValue() ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        {getValue() ? "Yes" : "No"}
      </span>
    ),
  },
  {
    accessorKey: "expiration_date",
    header: "expiration_date",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "public",
    header: "public",
    cell: ({ getValue }) => (
      <span>
        {getValue() ? (
          <EyeIcon className="h-5 w-5 text-green-500" />
        ) : (
          <SlashEyeIcon className="h-5 w-5 text-gray-500" />
        )}
      </span>
    ),
  },
];
const combine_credit_card = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "user",
    header: "user",
    cell: ({ getValue }) => <UserInfo user={getValue()} />,
  },
  { accessorKey: "number", header: "number" },
  { accessorKey: "exp_date", header: "exp_date" },
  { accessorKey: "CCV", header: "CCV" },
];
const combine_currency = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: "name", header: "name" },
  { accessorKey: "code", header: "code" },
  { accessorKey: "rate", header: "rate" },
  { accessorKey: "exchange_percent", header: "exchange_percent" },
];
const combine_home_reviews = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: "name", header: "name" },
  { accessorKey: "rating", header: "rating" },
  { accessorKey: "content", header: "content" },
  { accessorKey: "image", header: "image" },
];
const combine_language = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: "name", header: "name" },
  { accessorKey: "code", header: "code" },
];
const combine_logs = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  { accessorKey: "description", header: "description" },
  { accessorKey: "admin", header: "admin" },
  { accessorKey: "row_id", header: "row_id" },
  { accessorKey: "table_name", header: "table_name" },
];

const combine_news = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  { accessorKey: "link", header: "link" },
  {
    accessorKey: "content",
    header: "content",
    cell: ({ row }) => (
      <span>{row?.original?.news_content?.at(0)?.content}</span>
    ),
  },
];
const combine_newsletter = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  { accessorKey: "subject", header: "subject" },
  { accessorKey: "content", header: "content" },
];
const combine_newsletter_subscription = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: "email", header: "email" },
];
const combine_offer = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  { accessorKey: "numerical", header: "numerical" },
  {
    accessorKey: "name",
    header: "name",
    cell: ({ row }) => {
      return (
        <Link
          to={`/update/offer/${row?.original?.id}`}
          className="text-blue-500 hover:underline"
        >
          {row?.original?.offer_content?.at(0)?.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "description",
    header: "description",
    cell: ({ row }) => {
      return <span>{row?.original?.offer_content?.at(0)?.description}</span>;
    },
  },
  {
    accessorKey: "media",
    header: "media",
    cell: ({ row }) => {
      return (
        <FullImage
          src={row?.original?.offer_content?.at(0)?.media}
          width={80}
          height={60}
        />
      );
    },
  },
  {
    accessorKey: "icon",
    header: "icon",
    cell: ({ getValue }) => {
      return <FullImage src={getValue()} alt={"offer icon"} />;
    },
  },
  {
    accessorKey: "hex",
    header: "hex",
    cell: ({ getValue }) => (
      <span
        className="h-10 w-10 block rounded-full"
        style={{
          background: getValue(),
        }}
      />
    ),
  },
  {
    accessorKey: "display_home",
    header: "display_home",
    cell: ({ getValue }) => (
      <span
        className={`px-8 py-1 rounded-md ${
          getValue() ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        {getValue() ? "Yes" : "No"}
      </span>
    ),
  },
  {
    accessorKey: "actions",
    header: "actions",
    cell: ({ row }) => (
      <Link
        to={`/update/offer/${row?.original?.id}`}
        className="text-blue-500 hover:underline"
      >
        Edit
      </Link>
    ),
  },
];

const combine_offer_product = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: "product", header: "product" },
  { accessorKey: "offer", header: "offer" },
];
export const combine_order = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  { accessorKey: "order_number", header: "order_number" },
  { accessorKey: "price", header: "price" },
  {
    accessorKey: "warehouse_from",
    header: "warehouse_from",
    cell: ({ getValue }) => <span>{getValue()?.name}</span>,
  },
  {
    accessorKey: "address",
    header: "address",
    cell: ({ getValue }) => <span>{getValue()?.country?.name}</span>,
  },
  { accessorKey: "shipping_date", header: "shipping_date" },
  {
    accessorKey: "order_status",
    header: "order_status",
    cell: ({ getValue }) => {
      let status = getValue()?.status_content?.at(0)?.order_status;
      return <span>{status}</span>;
    },
  },
  {
    accessorKey: "user",
    header: "user",
    cell: ({ getValue }) => <UserInfo user={getValue()} />,
  },
];
const combine_order_short = () => [
  { accessorKey: "order_number", header: "order_number" },
  {
    accessorKey: "user",
    header: "user",
    cell: ({ getValue }) => <UserInfo user={getValue()} />,
  },
  // {
  //   accessorKey: "variant",
  //   header: "variant",
  //   cell: ({ getValue, row }) => {
  //     console.log(getValue(), row.original);
  //   },
  // },
  { accessorKey: "price", header: "price" },
  {
    accessorKey: "order_status",
    header: "order_status",
    cell: ({ getValue }) => {
      let status = getValue()?.status_content?.at(0)?.order_status;
      return <span>{status}</span>;
    },
  },
  // { accessorKey: "quantity", header: "quantity" },
];

const combine_order_return_request = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "order",
    header: "order",
    cell: ({ getValue }) => <span>{getValue()?.order_number}</span>,
  },
  {
    accessorKey: "variant",
    header: "variant",
    cell: ({ row }) => <span>{row?.original?.product_variant?.sku}</span>,
  },
  {
    accessorKey: "return_status",
    header: "return_status",
    cell: ({ getValue }) => (
      <span>{getValue()?.return_status_content?.at(0)?.status}</span>
    ),
  },
  { accessorKey: "other_reason", header: "other_reason" },
  { accessorKey: "reason", header: "reason" },
  { accessorKey: "images", header: "images" },
];

const combine_order_status = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: "numerical", header: "numerical" },
  {
    accessorKey: "status",
    header: "status",

    cell: ({ row }) => (
      <span>{row?.original?.order_status_content?.at(0)?.status}</span>
    ),
  },
];
const combine_payment_status = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: "numerical", header: "numerical" },

  { accessorKey: "payment_status_id", header: "payment_status_id" },
  { accessorKey: "status", header: "status" },
];
const combine_point = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: "numeric", header: "numeric" },
  { accessorKey: "point_count", header: "point_count" },
  {
    accessorKey: "cause",
    header: "cause",
    cell: ({ row }) => (
      <span>{row?.original?.point_content?.at(0)?.cause}</span>
    ),
  },
];

const combine_product = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  { accessorKey: "product_sku", header: "product_sku" },
  {
    accessorKey: "name",
    header: "name",
    cell: ({ row }) => (
      <Link
        to={`/products/update/product/${row?.original?.id}`}
        className="text-blue-500 hover:underline"
      >
        name
      </Link>
    ),
  },
  { accessorKey: "description", header: "description" },
  {
    accessorKey: "category",
    header: "category",
    cell: ({ getValue }) => {
      let category = getValue()?.category_content?.at(0);
      return (
        <Link
          to={`/update/category/${category?.id}`}
          className="text-blue-500 hover:underline"
        >
          {category?.name}
        </Link>
      );
    },
  },
  { accessorKey: "price", header: "price" },
  { accessorKey: "barcode", header: "barcode" },
  {
    accessorKey: "brand",
    header: "brand",
    cell: ({ getValue }) => {
      let brand = getValue();
      return (
        <Link
          to={`/update/brand/${brand?.id}`}
          className="text-blue-500 hover:underline"
        >
          {brand?.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "actions",
    cell: ({ row }) => (
      <Link
        to={`/products/update/product/${row?.original?.id}`}
        className="text-blue-500 hover:underline"
      >
        Edit
      </Link>
    ),
  },
];
const combine_collection_product = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "product",
    header: "product",
    cell: ({ row }) => (
      <ProductInfo
        image={row?.original?.product_image?.at(0)?.image}
        product_sku={row?.original?.product_sku}
        name={row?.original?.product_content?.[0]?.name}
      />
    ),
  },
  {
    accessorKey: "category",
    header: "category",
    cell: ({ row }) => (
      <span>{row?.original?.category?.category_content?.at(0)?.title}</span>
    ),
  },
  { accessorKey: "barcode", header: "barcode" },
  {
    accessorKey: "action",
    header: "action",
    cell: ({ row }) => (
      <Link
        to={`/products/update/product/${row?.original?.id}`}
        className="hover:translate-x-1 transition-transform rounded-2xl flex items-center gap-2 px-2 p-1 bg-primary-blue text-white w-fit whitespace-nowrap"
      >
        <EyeIcon className=" w-4 h-4" />
      </Link>
    ),
  },
];

const combine_product_image = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  { accessorKey: "product", header: "product" },
  { accessorKey: "color", header: "color" },
  { accessorKey: "image", header: "image" },
  { accessorKey: "size", header: "size" },
  { accessorKey: "pattern_sku", header: "pattern_sku" },
];

const combine_product_variant = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  { accessorKey: "product", header: "product" },
  { accessorKey: "color", header: "color" },
  { accessorKey: "size", header: "size" },
  { accessorKey: "weight", header: "weight" },
  { accessorKey: "sku", header: "sku" },
];

const combine_region = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: "name", header: "name" },
  {
    accessorKey: "actions",
    header: "actions",
    cell: ({ row }) => (
      <Link
        to={`/update/region/${row?.original?.id}`}
        className="text-blue-500 hover:underline"
      >
        Edit
      </Link>
    ),
  },
];
const combine_return_status = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: "numerical", header: "numerical" },
  {
    accessorKey: "status",
    header: "status",
    cell: ({ row }) => (
      <span>{row?.original?.return_status_content?.at(0)?.status}</span>
    ),
  },
];
const combine_sale = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "start_date",
    header: "start_date",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "end_date",
    header: "end_date",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "products_ids",
    header: "products length",
    cell: ({ getValue }) => (
      <span className="font-medium">
        Selected Products:{getValue()?.length}
      </span>
    ),
  },
  {
    accessorKey: "category_id",
    header: "category",
    cell: ({ row }) => {
      console.log("🚀 ~ row:", row?.original);
      return (
        <Link
          to={`/update/category/${row?.original?.category_id}`}
          className="text-blue-500 hover:underline"
        >
          {row?.original?.category?.category_content?.at(0)?.title}
        </Link>
      );
    },
  },
  { accessorKey: "amount", header: "amount" },
  {
    accessorKey: "percentage",
    header: "percentage",
    cell: ({ getValue }) => (
      <span
        className={`px-8 py-1 rounded-md ${
          getValue() ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        {getValue() ? "Yes" : "No"}
      </span>
    ),
  },
  {
    accessorKey: "actions",
    header: "actions",
    cell: ({ row }) => (
      <Link
        to={`/sale/update/${row?.original?.id}`}
        className="text-blue-500 hover:underline"
      >
        Edit
      </Link>
    ),
  },
];

const combine_showreel = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "user",
    header: "user",
    cell: ({ getValue }) => <UserInfo user={getValue()} />,
  },
  { accessorKey: "product", header: "product" },
  { accessorKey: "url", header: "url" },
  { accessorKey: "views", header: "views" },
];
const combine_size = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: "size_sku", header: "size_sku" },
  { accessorKey: "numeric", header: "numeric" },
  {
    accessorKey: "name",
    header: "name",
    cell: ({ getValue, row }) => {
      let size = row?.original;
      return (
        <Link
          to={`/update/size/${size?.id}`}
          className="text-blue-500 hover:underline"
        >
          {size?.size_content?.at(0)?.name}
        </Link>
      );
    },
  },

  {
    accessorKey: "category",
    header: "category",
    cell: ({ getValue }) => {
      let category = getValue();
      return (
        <Link
          to={`/update/category/${category?.id}`}
          className="text-blue-500 hover:underline"
        >
          {category?.category_content?.at(0)?.title}
        </Link>
      );
    },
  },
  // { accessorKey: "region", header: "region" },
];

const combine_user = () => [
  // {
  //   id: "select",
  //   size: 20,
  // minSize: 50,
  //   header: ({ table }) => (
  //     <input
  //       type="checkbox"
  //       className="h-5 w-5"
  //       {...{
  //         checked: table?.getIsAllRowsSelected(),
  //         // indeterminate: table?.getIsSomeRowsSelected(),
  //         onChange: table?.getToggleAllRowsSelectedHandler(),
  //       }}
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="px-1">
  //       <input
  //         type="checkbox"
  //         className="h-5 w-5"
  //         {...{
  //           checked: row?.getIsSelected(),
  //           disabled: !row?.getCanSelect(),
  //           // indeterminate: row?.getIsSomeSelected(),
  //           onChange: row?.getToggleSelectedHandler(),
  //         }}
  //       />
  //     </div>
  //   ),
  // },

  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "user",
    header: "user",
    cell: ({ row }) => (
      <UserInfo
        user={{
          ...row?.original,
        }}
      />
    ),
  },
  { accessorKey: "email", header: "email" },
  {
    accessorKey: "title",
    header: "title",
    cell: ({ getValue }) => <span>{getValue()?.name}</span>,
  },
  { accessorKey: "phone", header: "phone" },
  { accessorKey: "wallet", header: "wallet" },
  { accessorKey: "points", header: "points" },
];
const combine_user_address = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  { accessorKey: "title", header: "title" },
  {
    accessorKey: "address",
    header: "address",
    cell: ({ getValue }) => <span>{getValue()?.name}</span>,
  },
];
const combine_user_alert = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  { accessorKey: "content", header: "content" },
  { accessorKey: "status", header: "status" },
  { accessorKey: "url", header: "url" },
];
const combine_user_cart = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  { accessorKey: "variant", header: "variant" },
  { accessorKey: "quantity", header: "quantity" },
];
const combine_user_invite = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  { accessorKey: "email", header: "email" },
  { accessorKey: "status", header: "status" },
];
const combine_user_like = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  { accessorKey: "product", header: "product" },
];

const combine_user_point = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  { accessorKey: "point_numeric", header: "point_numeric" },
  { accessorKey: "status", header: "status" },
  { accessorKey: "cause", header: "cause" },
];
const combine_user_suggestion = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  { accessorKey: "suggestion", header: "suggestion" },
  { accessorKey: "status", header: "status" },
];
const combine_user_ticket = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  { accessorKey: "ticket", header: "ticket" },
  { accessorKey: "status", header: "status" },
];
const combine_user_wallet = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: "amount", header: "amount" },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
];
const combine_warehouse_availability = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  {
    accessorKey: "warehouse",
    header: "warehouse",
    cell: ({ getValue }) => <span>{getValue()?.name}</span>,
  },
  {
    accessorKey: "country",
    header: "country",
    cell: ({ getValue }) => {
      let country = getValue();
      return (
        <Link
          to={`/update/country/${country?.id}`}
          className="text-blue-500 hover:underline"
        >
          {country?.name}
        </Link>
      );
    },
  },
  // { accessorKey: "shipping_price_id", header: "shipping_price_id" },
];

const combine_warehouse = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: "number", header: "number" },
  { accessorKey: "name", header: "name" },
  {
    accessorKey: "address",
    header: "address",
    cell: ({ getValue }) => <span>{getValue()?.name}</span>,
  },
];

const combine_stock = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "variant",
    header: "variant",

    cell: ({ row }) => <span> {row?.original?.product_variant?.sku}</span>,
  },
  {
    accessorKey: "warehouse",
    header: "warehouse",
    cell: ({ getValue }) => <span> {getValue()?.name}</span>,
  },
  { accessorKey: "stock", header: "stock" },
  {
    accessorKey: "actions",
    header: "actions",
    cell: ({ row }) => (
      <Link
        to={`/update/stock/${row?.original?.id}`}
        className="text-blue-500 hover:underline"
      >
        Edit
      </Link>
    ),
  },
];

const combine_collar = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: "name", header: "name" },
];
const combine_feature = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: "name", header: "name" },
];

const combine_washing_instructions = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: "name", header: "name" },
];

export const combine_shipping_price = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  { accessorKey: "area", header: "area" },
  { accessorKey: "min_fast_duration", header: "min_fast_duration" },
  { accessorKey: "max_fast_duration", header: "max_fast_duration" },
  { accessorKey: "min_normal_duration", header: "min_normal_duration" },
  { accessorKey: "max_normal_duration", header: "max_normal_duration" },
];

export const combine_bill = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "user",
    header: "user",
    cell: ({ getValue }) => <UserInfo user={getValue()} />,
  },
  { accessorKey: "order_number", header: "order_number" },
  { accessorKey: "total", header: "total" },
  { accessorKey: "shipping_cost", header: "shipping_cost" },
];

export const combine_bill_report = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "user",
    header: "user",
    cell: ({ getValue }) => <UserInfo user={getValue()} />,
  },
  { accessorKey: "bill_id", header: "bill_id" },
  { accessorKey: "report", header: "report" },
];
export const combine_order_report = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },

  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "user",
    header: "user",
    cell: ({ getValue }) => <UserInfo user={getValue()} />,
  },
  { accessorKey: "order_number", header: "order_number" },
  { accessorKey: "report", header: "report" },
];

const combine_suppliers = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  { accessorKey: "supplier_number_id", header: "supplier_number_id" },
  {
    accessorKey: "user",
    header: "user",
    cell: ({ getValue }) => <UserInfo user={getValue()} />,
  },
  { accessorKey: "attachment", header: "attachment" },
  { accessorKey: "company_name", header: "company_name" },
  { accessorKey: "company_type", header: "company_type" },
  { accessorKey: "tax_office", header: "tax_office" },
  { accessorKey: "tax_number", header: "tax_number" },
  { accessorKey: "KEP_address", header: "KEP_address" },
  { accessorKey: "mersis_number", header: "mersis_number" },
  { accessorKey: "IBAN_number", header: "IBAN_number" },
  { accessorKey: "billing_address", header: "billing_address" },
  { accessorKey: "shipping_addres", header: "shipping_addres" },
  { accessorKey: "return_address", header: "return_address" },
  { accessorKey: "province", header: "province" },
  { accessorKey: "district", header: "district" },
  { accessorKey: "neighborhood", header: "neighborhood" },
  {
    accessorKey: "address",
    header: "address",
    cell: ({ getValue }) => <span>{getValue()?.name}</span>,
  },
  { accessorKey: "main", header: "main" },
  { accessorKey: "finance", header: "finance" },
  { accessorKey: "operations", header: "operations" },
  { accessorKey: "sales", header: "sales" },
  { accessorKey: "other", header: "other" },
  { accessorKey: "full_name", header: "full_name" },
  { accessorKey: "email", header: "email" },
  { accessorKey: "phone", header: "phone" },
  { accessorKey: "blocked", header: "blocked" },
  { accessorKey: "approved", header: "approved" },
];
const combine_chat = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "user",
    header: "user",
    cell: ({ getValue }) => <UserInfo user={getValue()} />,
  },
  { accessorKey: "content", header: "content" },
  { accessorKey: "room_id", header: "room_id" },
];
const combine_room = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "user",
    header: "user",
    cell: ({ getValue }) => <UserInfo user={getValue()} />,
  },
];
const combine_partner = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  { accessorKey: "name", header: "name" },
  { accessorKey: "image", header: "image" },
  { accessorKey: "link", header: "link" },
];

const supplier_request = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "user",
    header: "user",
    cell: ({ getValue }) => <UserInfo user={getValue()} />,
  },
  { accessorKey: "attachment", header: "attachment" },
  { accessorKey: "company_name", header: "company_name" },
  { accessorKey: "company_contact", header: "company_contact" },
  { accessorKey: "company_phone", header: "company_phone" },
  { accessorKey: "company_address", header: "company_address" },
  { accessorKey: "company_email", header: "company_email" },
  { accessorKey: "company_website", header: "company_website" },
  { accessorKey: "company_platforms", header: "company_platforms" },
  { accessorKey: "company_brand", header: "company_brand" },
  { accessorKey: "company_best_products", header: "company_best_products" },
  { accessorKey: "company_quality", header: "company_quality" },
  { accessorKey: "company_model", header: "company_model" },
  {
    accessorKey: "company_made_description",
    header: "company_made_description",
  },
  { accessorKey: "company_capacity", header: "company_capacity" },
  { accessorKey: "company_model_pieces", header: "company_model_pieces" },
  { accessorKey: "company_which_modal", header: "company_which_modal" },
  { accessorKey: "company_average_pieces", header: "company_average_pieces" },
  { accessorKey: "company_more_capacity", header: "company_more_capacity" },
  { accessorKey: "company_raw_materials", header: "company_raw_materials" },
  { accessorKey: "company_seasons", header: "company_seasons" },
  { accessorKey: "company_challenges", header: "company_challenges" },
  { accessorKey: "company_partnership", header: "company_partnership" },
  { accessorKey: "company_certificates", header: "company_certificates" },
];

export const combine_definitions = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "sku",
    header: "sku",
    cell: ({ getValue, row }) => {
      return (
        <Link
          to={`/update/definitions/${row.original.id}`}
          className="text-blue-500 hover:underline"
        >
          {getValue()}
        </Link>
      );
    },
  },

  {
    accessorKey: "image",
    header: "image",
    cell: ({ row }) => {
      return (
        <FullImage
          src={row.original?.definitions_content?.at?.(0)?.image}
          alt={"image"}
        />
      );
    },
  },
  { accessorKey: "url", header: "url" },
];

export const combine_less_than = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "sku",
    header: "sku",
    cell: ({ getValue, row }) => {
      return (
        <Link
          to={`/update/less_than/${row.original.id}`}
          className="text-blue-500 hover:underline"
        >
          {getValue()}
        </Link>
      );
    },
  },
  {
    accessorKey: "web_image",
    header: "web_image",
    cell: ({ getValue, row }) => {
      return (
        <FullImage
          src={row.original?.less_than_content?.at?.(0)?.web_image}
          alt={"image"}
        />
      );
    },
  },
  {
    accessorKey: "mobile_image",
    header: "mobile_image",
    cell: ({ row }) => {
      return (
        <FullImage
          src={row.original?.less_than_content?.at?.(0)?.mobile_image}
          alt={"image"}
        />
      );
    },
  },
  { accessorKey: "price", header: "price" },
];

const home_sliders = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "sku",
    header: "sku",
    cell: ({ getValue, row }) => {
      return (
        <Link
          to={`/update/home_sliders/${row.original.id}`}
          className="text-blue-500 hover:underline"
        >
          {getValue()}
        </Link>
      );
    },
  },
  {
    accessorKey: "web_image",
    header: "web_image",
    cell: ({ row }) => {
      return (
        <FullImage
          src={row.original?.home_sliders_content?.at?.(0)?.mobile_image}
          alt={"image"}
        />
      );
    },
  },
  {
    accessorKey: "mobile_image",
    header: "mobile_image",
    cell: ({ row }) => {
      return (
        <FullImage
          src={row.original?.home_sliders_content?.at?.(0)?.mobile_image}
          alt={"image"}
        />
      );
    },
  },
  { accessorKey: "title", header: "title" },
  { accessorKey: "description", header: "description" },
  { accessorKey: "url", header: "url" },
];

const products_slider = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "sku",
    header: "sku",
    cell: ({ getValue, row }) => {
      return (
        <Link
          to={`/update-products-slider/${row.original.id}`}
          className="text-blue-500 hover:underline"
        >
          {getValue()}
        </Link>
      );
    },
  },
  {
    accessorKey: "products_sku",
    header: "products_sku",
    cell: ({ getValue }) => <span>{getValue()?.length} Products</span>,
  },
  { accessorKey: "display_home", header: "display_home" },
];

const combine_measurement = () => [
  {
    id: "select",
    size: 20,
    minSize: 50,
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-5 w-5"
        {...{
          checked: table?.getIsAllRowsSelected(),
          // indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <input
          type="checkbox"
          className="h-5 w-5"
          {...{
            checked: row?.getIsSelected(),
            disabled: !row?.getCanSelect(),
            // indeterminate: row?.getIsSomeSelected(),
            onChange: row?.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "created_at",
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString("en-UK"),
  },
  {
    accessorKey: "numeric",
    header: "numeric",
    cell: ({ getValue, row }) => {
      return (
        <Link
          to={`/update-measurement/${row.original.id}`}
          className="text-blue-500 hover:underline"
        >
          {getValue()}
        </Link>
      );
    },
  },
  {
    accessorKey: "categories_ids",
    header: "categories_ids",
    cell: ({ getValue }) => <span>{getValue()?.length}</span>,
  },
  {
    accessorKey: "actions",
    header: "actions",
    cell: ({ row }) => (
      <Link
        to={`/update-measurement/${row?.original?.id}`}
        className="text-blue-500 hover:underline"
      >
        Edit
      </Link>
    ),
  },
];

const COMBINE_DB_API = {
  combine_measurement,
  products_slider,
  home_sliders,
  combine_chart_group,
  combine_less_than,
  combine_definitions,
  supplier_request,
  combine_partner,
  combine_room,
  combine_chat,
  combine_address,
  combine_brand,
  combine_bulk_alert,
  combine_category,
  combine_chart,
  combine_chart_data,
  combine_chart_content,
  combine_suppliers,
  combine_collection,
  combine_collection_product,
  combine_color,
  combine_comment,
  combine_country,
  combine_coupon,
  combine_credit_card,
  combine_currency,
  combine_home_reviews,
  combine_language,
  combine_logs,
  combine_news,
  combine_newsletter,
  combine_newsletter_subscription,
  combine_offer,
  combine_offer_product,
  combine_order,
  combine_order_return_request,
  combine_order_status,
  combine_payment_status,
  combine_point,
  combine_product,
  combine_product_image,
  combine_product_variant,
  combine_region,
  combine_return_status,
  combine_sale,
  combine_showreel,
  combine_size,
  combine_user,
  combine_user_address,
  combine_user_alert,
  combine_user_cart,
  combine_user_invite,
  combine_user_like,
  combine_user_point,
  combine_user_suggestion,
  combine_user_ticket,
  combine_user_wallet,
  combine_warehouse_availability,
  combine_warehouse,
  combine_stock,
  combine_order_short,
  combine_shipping_price,
  combine_bill,
  combine_bill_report,
  combine_order_report,
  combine_washing_instructions,
  combine_chunks,
  combine_Weights,
};
export default COMBINE_DB_API;
