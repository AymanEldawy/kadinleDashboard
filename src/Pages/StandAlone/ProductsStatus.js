import React, { useState } from "react";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { useUpdate } from "../../hooks/useUpdate";
import { useQuery } from "@tanstack/react-query";
import {
  get_out_of_stock_products,
  hidden_available_products,
} from "../../Api/data";
import CustomTable from "../../Components/CustomTable/CustomTable";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import { Button } from "../../Components/Global/Button";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";

const ProductsStatus = () => {
  const { defaultLanguage } = useGlobalOptions();
  const { upsertItem, updateItem } = useUpdate();
  const [tab, setTab] = useState(1);
  const [selectedList, setSelectedList] = useState({});
  const [rowSelection, setRowSelection] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageSize: 50,
    pageIndex: 0,
  });

  const columns = COMBINE_DB_API.combine_product_stocked;

  const { data, isLoading } = useQuery({
    queryKey: ["stocked", "products", defaultLanguage?.id, tab],
    queryFn: async () => {
      if (!defaultLanguage?.id) return;

      const response =
        tab === 1
          ? await get_out_of_stock_products(defaultLanguage?.id, 100, 0)
          : await hidden_available_products(defaultLanguage?.id, 100, 0);
      return response?.data?.products;
    },
  });

  const handleHideAll = async () => {
    // const response = await handleHideProducts()
  }
  const handleShowAll = async () => {
    // const response = await handleShowProducts()
  }

  return (
    <BlockPaper title="Products display">
      <div className="flex items-center gap-4 justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <Button
            classes={`whitespace-nowrap !w-fit ${
              tab === 1 ? "" : "!bg-gray-200 !text-gray-500"
            }`}
            title="Stocked Products"
            onClick={() => setTab(1)}
          />
          <Button
            classes={`whitespace-nowrap !w-fit ${
              tab === 2 ? "" : "!bg-gray-200 !text-gray-500"
            }`}
            title="Unstocked Products"
            onClick={() => setTab(2)}
          />
        </div>
        <div className="flex items-center gap-4">
          {tab === 1 ? (
            <Button
              classes={`whitespace-nowrap !w-fit bg-red-500`}
              title={`Hide Selected Products (${Object.keys(rowSelection)?.length})`}
              onClick={handleHideAll}
              disabled={!Object.keys(rowSelection)?.length}
            />
          ) : (
            <Button
              classes={`whitespace-nowrap !w-fit bg-green-500`}
              title={`Show Selected Products (${Object.keys(rowSelection)?.length})`}
              onClick={handleShowAll}
              disabled={!Object.keys(rowSelection)?.length}
            />
          )}
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
      />
    </BlockPaper>
  );
};

export default ProductsStatus;
