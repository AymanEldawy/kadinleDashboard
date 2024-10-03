import React, { useState } from "react";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { useUpdate } from "../../hooks/useUpdate";
import { useQuery } from "@tanstack/react-query";
import { getProductEndingStock } from "../../Api/data";
import { Link } from "react-router-dom";

const ProductsStatus = () => {
  const { defaultLanguage } = useGlobalOptions();
  const { upsertItem, updateItem } = useUpdate();
  const [tab, setTab] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedList, setSelectedList] = useState({});

  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageSize: 50,
    pageIndex: 0,
  });

  const { data } = useQuery({
    queryKey: ["stocked", "products"],
    queryFn: async () => {
      const data = await getProductEndingStock();
      return data;
    },
  });

  console.log(data, "products");
  
  const onSelectRow = (e) => {
    let value = e.target.value;
    if (e.target.checked) {
      setSelectedList((prev) => ({
        ...prev,
        [value]: true,
      }));
    } else {
      const list = selectedList;
      delete list[e.target.value];
      setSelectedList({ ...list });
    }
  };

  const onSelectAll = (e) => {
    if (e.target.checked) {
      let hash = {};
      for (const product of data?.products) {
        hash[product?.id] = true;
      }
      setSelectedList(hash);
    } else {
      setSelectedList({});
    }
  };

  return (
    <div>
      <div>
        <button className="" onClick={() => setTab(1)}>
          Stocked Products
        </button>
        <button className="" onClick={() => setTab(2)}>
          Unstocked Products
        </button>
      </div>
      <div className="border-y flex items-center bg-gray-200 dark:text-white dark:bg-[#2d2d2d] dark:border-[#343333]">
        <div className="p-2 w-[50px]">
          <input type="checkbox" className="h-5 w-5" onChange={onSelectAll} />
        </div>
        <div className="p-2 flex-[2]">Product</div>
        <div className="p-2 flex-1">Supplier</div>
        <div className="p-2 flex-1">Category</div>
        <div className="p-2 flex-1">New Category</div>
        <div className="p-2 flex-1">Actions</div>
      </div>
      {data?.products?.map((product) => {
        let isSelected = selectedList?.[product?.id];
        return (
          <div
            className={`border-y flex items-center dark:border-[#343333]  dark:text-white ${
              isSelected ? "bg-gray-100" : ""
            }`}
          >
            <div className="p-2 w-[50px]">
              <input
                type="checkbox"
                checked={isSelected}
                value={product?.id}
                className="h-5 w-5"
                onChange={onSelectRow}
              />
            </div>
            <div className="p-2 flex-[2] hover:text-blue-500 hover:bg-gray-100 hover:shadow">
              <Link
                className="flex gap-2"
                to={`https://kadinle.com/product/${
                  product?.product_variant?.at(0)?.id
                }`}
                target="_blank"
              >
                <img
                  src={product?.product_image?.at(0)?.image}
                  alt=""
                  className="w-20 h-20 object-contain"
                />
                <ul className="capitalize font-medium text-sm">
                  <li>product sku: {product?.product_sku}</li>
                  <li>{product?.product_content?.at(0)?.name}</li>
                </ul>
              </Link>
            </div>
            <div className="p-2 flex-1"></div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsStatus;
