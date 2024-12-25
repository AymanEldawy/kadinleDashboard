import React, { useState } from "react";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { useUpdate } from "../../hooks/useUpdate";
import { useQuery } from "@tanstack/react-query";
import {
  get_out_of_stock_products,
  getHiddenProducts,
  hidden_available_products,
  pricingProducts,
  unPricingProducts,
} from "../../Api/data";
import CustomTable from "../../Components/CustomTable/CustomTable";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import { Button } from "../../Components/Global/Button";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { LoadingProcess } from "../../Components/Global/LoadingProcess";
import { toast } from "react-toastify";
import { ProductToggleView } from "../../Components/Global/FullImage/ProductToggleView";
import { ProductInfo } from "../../Components/Global/FullImage/ProductInfo";

const ProductsPricingStatus = () => {
  const { defaultLanguage } = useGlobalOptions();
  const { updateInItems } = useUpdate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tab, setTab] = useState(1);
  const [selectedList, setSelectedList] = useState({});
  const [rowSelection, setRowSelection] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageSize: 50,
    pageIndex: 0,
  });

  const columns = () => [
    // {
    //   id: "select",
    //   size: 20,
    //   minSize: 50,
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
      accessorKey: "product",
      header: "product",
      cell: ({ row }) => (
        <ProductInfo
          image={row?.original?.product?.image}
          product_sku={row?.original?.product?.product_sku}
          name={row?.original?.content?.name}
          variant_id={row?.original?.product?.variants?.variant_id}
          nameClassName="text-xs text-blue-500 whitespace-nowrap text-ellipsis overflow-hidden max-w-[300px]"
        />
      ),
    },
    {
      accessorKey: "display",
      header: "display",
      cell: ({ row }) => {
        return <span>{row?.original?.product?.display ? "YES" : "No"}</span>;
      },
    },
    {
      accessorKey: "Actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <ProductToggleView
            product={row?.original?.product}
            handleToggleViewAll={handleToggleViewAll}
          />
        );
      },
    },
  ];

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      defaultLanguage?.id,
      tab,
      pagination?.pageIndex,
      pagination?.pageSize,
    ],
    queryFn: async () => {
      const response = pricingProducts(defaultLanguage?.id, tab === 1);
      setPageCount(
        Math.ceil(response?.data?.count / parseInt(pagination?.pageSize))
      );
      return response?.data?.products;
    },
    enabled: !!defaultLanguage?.id,
  });

  async function handleToggleViewAll(display, oldList) {
    const list = oldList || Object.keys(rowSelection);
    setIsSubmitting(true);
    const res = await updateInItems("product", { display }, "id", list);
    if (res?.error) {
      toast.error(
        `Failed to ${display ? "showing" : "hiding"} products => ${
          res?.error?.message
        }`
      );
    } else {
      refetch();
      toast.success(`successfully ${display ? "showing" : "hiding"} products`);
    }
    setIsSubmitting(false);
  }

  return (
    <>
      {isSubmitting ? <LoadingProcess /> : null}
      <BlockPaper title="Products Pricing display">
        <div className="flex items-center gap-4 justify-between border-b pb-4">
          <div className="flex items-center gap-4">
            <Button
              classes={`whitespace-nowrap !w-fit ${
                tab === 1 ? "" : "!bg-gray-200 !text-gray-500"
              }`}
              title="Un Priding Products"
              onClick={() => setTab(1)}
            />
            <Button
              classes={`whitespace-nowrap !w-fit ${
                tab === 2 ? "" : "!bg-gray-200 !text-gray-500"
              }`}
              title="Pricing Products"
              onClick={() => setTab(2)}
            />
          </div>
          <div className="flex items-center gap-4">
            {tab === 1 ? (
              <Button
                classes={`whitespace-nowrap !w-fit bg-red-500`}
                title={`Hide Selected Products (${
                  Object.keys(rowSelection)?.length
                })`}
                onClick={() => handleToggleViewAll(false)}
                disabled={!Object.keys(rowSelection)?.length}
              />
            ) : tab === 2 ? (
              <Button
                classes={`whitespace-nowrap !w-fit bg-green-500`}
                title={`Show Selected Products (${
                  Object.keys(rowSelection)?.length
                })`}
                onClick={() => handleToggleViewAll(true)}
                disabled={!Object.keys(rowSelection)?.length}
              />
            ) : null}
          </div>
        </div>
        <CustomTable
          columns={columns}
          tableName={"product"}
          isLoading={isLoading}
          data={data}
          pageCount={pageCount}
          pagination={pagination}
          setPagination={setPagination}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          outerSelectedId={(row, relativeIndex, parent) =>
            row?.product?.product_id
          }
        />
      </BlockPaper>
    </>
  );
};

export default ProductsPricingStatus;