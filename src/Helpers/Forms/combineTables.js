import { Link } from "react-router-dom";

const combine_address = () => [
  {
    id: "select",
    size: 20,
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

const combine_bulk_alert = () => [
  {
    id: "select",
    size: 20,
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
    header: "parent_id",
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
  {
    accessorKey: "display_homepage",
    header: "display_homepage",
    cell: ({ getValue }) => <span>{getValue() ? "YES" : "NO"}</span>,
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
  { accessorKey: "banner_video", header: "banner_video" },
  { accessorKey: "description", header: "description" },
  { accessorKey: "mobile_image", header: "mobile_image" },
  { accessorKey: "web_image", header: "web_image" },
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
const combine_chart_content = () => [
  {
    id: "select",
    size: 20,
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
  {
    accessorKey: "name",
    header: "name",
    cell: ({ row, getValue }) => (
      <Link
        to={`/update/chart_content/${row?.original?.id}`}
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
        to={`/update/chart_content/${row?.original?.id}`}
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

  { accessorKey: "chart", header: "chart" },
  { accessorKey: "product", header: "product" },
  { accessorKey: "size", header: "size" },
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
  { accessorKey: "description", header: "description" },
  { accessorKey: "image", header: "image" },
  { accessorKey: "display_home", header: "display_home" },
];
const combine_color = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "image", header: "image" },
  { accessorKey: "parent_id", header: "parent_id" },
  { accessorKey: "numeric", header: "numeric" },

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
];
const combine_comment = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "user", header: "user" },
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
  { accessorKey: "code", header: "code" },
  { accessorKey: "value", header: "value" },
  { accessorKey: "percentage", header: "percentage" },
  { accessorKey: "expiration_date", header: "expiration_date" },
  { accessorKey: "public", header: "public" },
];
const combine_credit_card = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "user", header: "user" },
  { accessorKey: "number", header: "number" },
  { accessorKey: "exp_date", header: "exp_date" },
  { accessorKey: "CCV", header: "CCV" },
];
const combine_currency = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "content", header: "content" },
];
const combine_newsletter = () => [
  {
    id: "select",
    size: 20,
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

  { accessorKey: "name", header: "name" },
  { accessorKey: "description", header: "description" },
  { accessorKey: "media", header: "media" },
  { accessorKey: "display_home", header: "display_home" },
];

const combine_offer_product = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "warehouse_from", header: "warehouse_from" },
  { accessorKey: "address", header: "address" },
  { accessorKey: "shipping_date", header: "shipping_date" },
  { accessorKey: "order_status", header: "order_status" },
  { accessorKey: "user", header: "user" },
];
const combine_order_short = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "order_number", header: "order_number" },
  { accessorKey: "user", header: "user" },
  { accessorKey: "variant", header: "variant" },
  { accessorKey: "price", header: "price" },
  { accessorKey: "order_status", header: "order_status" },
  { accessorKey: "quantity", header: "quantity" },
];

const combine_order_return_request = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "order", header: "order" },
  { accessorKey: "variant", header: "variant" },
  { accessorKey: "other_reason", header: "other_reason" },
  { accessorKey: "reason", header: "reason" },
  { accessorKey: "images", header: "images" },
  { accessorKey: "return_status", header: "return_status" },
];

const combine_order_status = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "status", header: "status" },
];
const combine_payment_status = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "cause", header: "cause" },
  { accessorKey: "language", header: "language" },
];

const combine_product = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "name", header: "name" },
  { accessorKey: "category", header: "category" },
  { accessorKey: "barcode", header: "barcode" },
];

const combine_product_image = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "status", header: "status" },
];
const combine_sale = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "end_date", header: "end_date" },
];

const combine_showreel = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "user", header: "user" },
  { accessorKey: "product", header: "product" },
  { accessorKey: "url", header: "url" },
  { accessorKey: "views", header: "views" },
];
const combine_size = () => [
  {
    id: "select",
    size: 20,
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
  {
    id: "select",
    size: 20,
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
  { accessorKey: "first_name", header: "first_name" },
  { accessorKey: "last_name", header: "last_name" },
  { accessorKey: "email", header: "email" },
  { accessorKey: "title", header: "title" },
  { accessorKey: "phone", header: "phone" },
  { accessorKey: "profile_img", header: "profile_img" },
  { accessorKey: "wallet", header: "wallet" },
  { accessorKey: "points", header: "points" },
];
const combine_user_address = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "address", header: "address" },
];
const combine_user_alert = () => [
  {
    id: "select",
    size: 20,
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

  { accessorKey: "warehouse", header: "warehouse" },
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
  { accessorKey: "shipping_price_id", header: "shipping_price_id" },
];

const combine_warehouse = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "address", header: "address" },
  { accessorKey: "number", header: "number" },
];

const combine_stock = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "variant", header: "variant" },
  { accessorKey: "warehouse", header: "warehouse" },
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
const combine_lining = () => [
  {
    id: "select",
    size: 20,
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
const combine_fabric = () => [
  {
    id: "select",
    size: 20,
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
const combine_season = () => [
  {
    id: "select",
    size: 20,
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
const combine_sleeve = () => [
  {
    id: "select",
    size: 20,
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
const combine_material = () => [
  {
    id: "select",
    size: 20,
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
const combine_pattern = () => [
  {
    id: "select",
    size: 20,
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

const combine_fabric_information = () => [
  {
    id: "select",
    size: 20,
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
const combine_environment = () => [
  {
    id: "select",
    size: 20,
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
const combine_style = () => [
  {
    id: "select",
    size: 20,
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
const combine_package = () => [
  {
    id: "select",
    size: 20,
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
const combine_sleeve_type = () => [
  {
    id: "select",
    size: 20,
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
const combine_waist = () => [
  {
    id: "select",
    size: 20,
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
const combine_belt_condition = () => [
  {
    id: "select",
    size: 20,
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
const combine_pocket = () => [
  {
    id: "select",
    size: 20,
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
const combine_leg_type = () => [
  {
    id: "select",
    size: 20,
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
const combine_closure_type = () => [
  {
    id: "select",
    size: 20,
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
const combine_thickness = () => [
  {
    id: "select",
    size: 20,
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
const combine_printing_technique = () => [
  {
    id: "select",
    size: 20,
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
const combine_embroidery_type = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "user", header: "user" },
  { accessorKey: "order_number", header: "order_number" },
  { accessorKey: "total", header: "total" },
  { accessorKey: "shipping_cost", header: "shipping_cost" },
];

export const combine_bill_report = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "user", header: "user" },
  { accessorKey: "bill_id", header: "bill_id" },
  { accessorKey: "report", header: "report" },
];
export const combine_order_report = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "user", header: "user" },
  { accessorKey: "order_number", header: "order_number" },
  { accessorKey: "report", header: "report" },
];

const combine_suppliers = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "user", header: "user" },
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
  { accessorKey: "address", header: "address" },
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
  { accessorKey: "user", header: "user" },
  { accessorKey: "content", header: "content" },
  { accessorKey: "room_id", header: "room_id" },
];
const combine_room = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "user", header: "user" },
];
const combine_partner = () => [
  {
    id: "select",
    size: 20,
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
  { accessorKey: "user", header: "user" },
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

const COMBINE_DB_API = {
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
  combine_fabric,
  combine_feature,
  combine_collar,
  combine_home_reviews,
  combine_language,
  combine_lining,
  combine_logs,
  combine_material,
  combine_news,
  combine_newsletter,
  combine_newsletter_subscription,
  combine_offer,
  combine_offer_product,
  combine_order,
  combine_order_return_request,
  combine_order_status,
  combine_pattern,
  combine_payment_status,
  combine_point,
  combine_product,
  combine_product_image,
  combine_product_variant,
  combine_region,
  combine_return_status,
  combine_sale,
  combine_season,
  combine_showreel,
  combine_size,
  combine_sleeve,
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
  combine_fabric_information,
  combine_environment,
  combine_style,
  combine_package,
  combine_sleeve_type,
  combine_waist,
  combine_belt_condition,
  combine_pocket,
  combine_leg_type,
  combine_closure_type,
  combine_thickness,
  combine_printing_technique,
  combine_embroidery_type,
  combine_washing_instructions,
};
export default COMBINE_DB_API;
