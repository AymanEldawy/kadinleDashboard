import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import EditableField from "../../Components/Supplier/EditableField";
import Filters from "../../Components/Supplier/Filters";
import FilterPopover from "../../Components/Supplier/FilterPopover";

const SupplierProducts = () => {
  const DATA = [
    {
      one: "Product 1",
      two: "Supplier 1",
      three: "2022-01-01",
      percentage: "100",
      price: "10",
      six: "5",
    },
    {
      one: "Product 2",
      two: "Supplier 2",
      three: "2022-02-01",
      percentage: "150",
      price: "20",
      six: "10",
    },
    {
      one: "Product 3",
      two: "Supplier 3",
      three: "2022-03-01",
      percentage: "200",
      price: "25",
      six: "15",
    },
    {
      one: "Product 4",
      two: "Supplier 4",
      three: "2022-04-01",
      percentage: "120",
      price: "20",
      six: "10",
    },
    {
      one: "Product 5",
      two: "Supplier 5",
      three: "2022-05-01",
      percentage: "170",
      price: "25",
      six: "15",
    },
  ];
  const STATUSES = ["one", "two", "three", "percentage", "price", "six"];
  const columns = [
    {
      accessorKey: "one",
      header: "one",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "two",
      header: "two",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "three",
      header: "three",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "percentage",
      header: "percentage",
      cell: (props) => <EditableField initial={props.getValue()} />,
    },
    {
      accessorKey: "price",
      header: "price",
      cell: (props) => <EditableField initial={props.getValue()} />,
    },
    {
      accessorKey: "six",
      header: "six",
      cell: (props) => <p>{props.getValue()}</p>,
    },
  ];

  const [data, setData] = useState(DATA);
  const [columnFilters, setColumnFilters] = useState([
    // {
    //   id: "one",
    //   value:"Add"
    // }
  ]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
  });
  // console.log("table", table.getHeaderGroups());
  console.log("columnFilters", columnFilters);
  return (
    <BlockPaper title="Products Supplier">
      <div className="flex">
        <Filters
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          selectedStatus={selectedStatus}
        />
        <FilterPopover
          STATUSES={STATUSES}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      </div>

      <table className="table-auto w-full border border-gray-300 rounded-md">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="bg-gray-200 text-gray-700 font-medium text-base leading-4 tracking-wider group"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`px-4 py-4 text-start relative`}
                  style={{ width: header.getSize() }}
                >
                  {header.column.columnDef.header}
                  {header.column.getCanSort() && (
                    <button
                      onClick={header.column.getToggleSortingHandler()}
                      className="rotate-90 mx-3 hidden group-hover:inline-block absolute right-2 lg:right-8"
                    >
                      ⇆
                    </button>
                  )}
                  <div className="absolute -left-1 top-4">
                    {
                      {
                        asc: "🔼",
                        desc: "🔽",
                      }[header.column.getIsSorted()]
                    }
                  </div>
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`absolute flex items-center right-0 top-0 bottom-0 h-full cursor-col-resize px-1.5 select-none invisible group-hover:visible`}
                  >
                    &#x2502;
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="odd:bg-white even:bg-gray-200">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-4 text-start">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </BlockPaper>
  );
};

export default SupplierProducts;
