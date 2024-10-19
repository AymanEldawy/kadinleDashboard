import React, { useMemo, useState } from "react";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { Button } from "../../Components/Global/Button";
import { useQuery } from "@tanstack/react-query";
import CustomTable from "../../Components/CustomTable/CustomTable";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import { useFetch } from "../../hooks/useFetch";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { useDelete } from "../../hooks/useDelete";
import { BackIcon, TrashIcon } from "../../Helpers/Icons";
import { Link, useNavigate } from "react-router-dom";
import { getSales } from "../../Api/data";

const Sale = () => {
  const navigate = useNavigate();
  const { defaultLanguage, defaultRegion } = useGlobalOptions();
  const { getDataWithPagination } = useFetch();
  const { deleteItem: onDelete } = useDelete();
  const [tab, setTab] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [rowSelection, setRowSelection] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  });

  const columns = COMBINE_DB_API.combine_sale || [];

  const { data, isLoading } = useQuery({
    queryKey: ["sale", tab, pagination?.pageIndex, pagination?.pageSize, defaultLanguage?.id],
    keepPreviousData: true,
    queryFn: async () => {
      if (!defaultLanguage?.id) return;
      const response = await getSales(
        defaultLanguage?.id,
        tab,
        pagination?.pageIndex + 1,
        pagination?.pageSize
      );
      console.log(response,'responsesdsd');
      
      setPageCount(Math.ceil(response?.count / parseInt(pagination?.pageSize)));
      return response?.data;
    },
  });

  const handleDeleteItem = async () => {
    // await onDelete("sale", Object.keys(rowSelection));
    setRowSelection({});
  };
  console.log(rowSelection, "-");

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="flex gap-2 mb-2 items-center p-1 px-3 hover:bg-primary-blue hover:text-white rounded-md border text-primary-blue border-primary-blue"
      >
        <BackIcon className="h-5 w-5" />
        Back
      </button>
      <BlockPaper title={"Flash sale"}>
        <div className="flex items-center gap-4 justify-between border-b pb-4">
          <div className="flex items-center gap-4">
            <Button
              classes={`whitespace-nowrap !w-fit ${
                tab === 1 ? "" : "!bg-gray-200 !text-gray-500"
              }`}
              title="Current Sale"
              onClick={() => setTab(1)}
            />
            <Button
              classes={`whitespace-nowrap !w-fit ${
                tab === 2 ? "" : "!bg-gray-200 !text-gray-500"
              }`}
              title="Finished Sale"
              onClick={() => setTab(2)}
            />
            <Button
              classes={`whitespace-nowrap !w-fit ${
                tab === 3 ? "" : "!bg-gray-200 !text-gray-500"
              }`}
              title="Future Sale"
              onClick={() => setTab(3)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Link
              className="bg-blue-500 whitespace-nowrap text-sm text-white rounded p-2 font-normal capitalize hover:shadow-md hover:rounded-lg duration-300"
              to="/sale/add"
            >
              add new
            </Link>

            <button
              title="Delete all"
              className="bg-red-500 text-sm text-white rounded p-2 font-normal capitalize hover:shadow-md hover:rounded-lg duration-300 disabled:bg-red-200"
              disabled={!Object.keys(rowSelection)?.length}
            >
              <TrashIcon />{" "}
            </button>
          </div>
        </div>
        <CustomTable
          columns={columns}
          tableName={"sale"}
          isLoading={isLoading}
          data={data}
          pageCount={pageCount}
          pagination={pagination}
          setPagination={setPagination}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
        />
      </BlockPaper>
    </>
  );
};

export default Sale;
