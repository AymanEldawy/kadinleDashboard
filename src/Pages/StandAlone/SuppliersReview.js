import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import Select from "react-select";
import {
  getProductInfo,
  getSupplierProductsReview,
  getSuppliersList,
} from "../../Api/data";
import { LoadingProcess } from "../../Components/Global/LoadingProcess";
import { VariantsView } from "../../Components/DisplayOrder/VariantsView";

const SuppliersReview = () => {
  let name = "products_slider";
  const { defaultLanguage, defaultRegion } = useGlobalOptions();
  const [supplierId, setSupplierId] = useState(74);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const { data: suppliers } = useQuery({
    queryKey: ["list", "suppliers"],
    queryFn: async () => {
      const data = await getSuppliersList();
      return data;
    },
  });

  const {
    data: products,
    error,
    isError,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["list", "products", supplierId, defaultLanguage?.id],
    queryFn: async () => {
      const response = await getSupplierProductsReview(
        defaultLanguage?.id,
        supplierId
      );

      if (response?.error) throw Error(response?.error?.message);
      return response;
    },
    enabled: !!defaultLanguage?.id && !!supplierId,
  });

  const { data: selectedProduct, isLoading: isVariantLoading } = useQuery({
    queryKey: [
      selectedProductId,
      "variant",
      defaultLanguage?.id,
      defaultRegion?.id,
    ],
    queryFn: async () =>
      await getProductInfo(
        selectedProductId,
        defaultLanguage?.id,
        defaultRegion?.id
      ),
  });

  return (
    <>
      <div className="relative">
        <BlockPaper
          headerClassName="flex items-center justify-between"
          title={"Supplier Review"}
          contentBar={
            <div className="flex gap-4 items-center font-medium text-lg text-gray-700">
              <Select
                menuPlacement="auto"
                menuPortalTarget={document?.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                className="w-[180px] flex-1"
                options={suppliers}
                getOptionLabel={({ seller_file_id }) => seller_file_id}
                getOptionValue={({ seller_file_id }) => seller_file_id}
                value={suppliers?.find(c => c?.seller_file_id === supplierId)}
                onChange={(value) => {
                  setSupplierId(value?.seller_file_id);
                }}
              />
              <div className="flex gap-2 items-center">
                <span>
                  Supplier id:{" "}
                  <span className="bg-gray-100 rounded-md px-2 py-1 border border-gray-200">
                    {supplierId}
                  </span>{" "}
                </span>
                |
                <span>
                  Products count:{" "}
                  <span className="bg-gray-100 rounded-md px-2 py-1 border border-gray-200">
                    {products?.data?.length}
                  </span>{" "}
                </span>

              </div>
            </div>
          }
        >
          {!isLoading ? (
            <>
              {isError ? (
                <div className="flex items-center justify-between gap-2 flex-col">
                  <p className="text-red-500 bg-red-100 rounded p-1 w-full text-center">
                    {error?.message}
                  </p>
                  <button
                    className="bg-blue-500 text-white hover:bg-blue-700 p-1 rounded-md"
                    onClick={refetch}
                  >
                    Refetch
                  </button>
                </div>
              ) : (
                <>
                  <div className="border-y flex items-center bg-gray-200 dark:text-white dark:bg-[#2d2d2d] dark:border-[#343333]">
                    <div className="p-2 flex-1">Product</div>
                    <div className="p-2 flex-1">Supplier File id</div>
                    <div className="p-2 flex-1">Supplier sku</div>
                  </div>
                  {products?.data?.map((product, index) => {
                    let opened = selectedProductId === product?.id;
                    return (
                      <div
                        className={`${opened && "bg-gray-100 shadow border"}`}
                      >
                        <div
                          role="button"
                          onClick={() => setSelectedProductId(product?.id)}
                          className={`border-y flex items-center dark:border-[#343333] dark:text-white hover:bg-gray-100`}
                        >
                          <div className="p-2 flex-1  hover:text-blue-500 ">
                            {index + 1} - {product?.content?.at(0)?.name}
                          </div>
                          <div className="p-2 flex-1">
                            {product?.seller_file_id}
                          </div>
                          <div className="p-2 flex-1">
                            {product?.seller_sku}{" "}
                          </div>
                        </div>
                        {opened ? (
                          <div className="w-full">
                            <div className="flex items-start bg-gray-300">
                              <div className="flex-1 p-2">Pricing</div>
                              <div className="flex-1 p-2">Colors</div>
                              <div className="flex-1 p-2">Sizes</div>
                              <div className="flex-1 p-2">Stock</div>
                            </div>
                            {isVariantLoading ? (
                              <p className="w-full gap-2 min-h-[120px] flex items-center justify-center text-blue-500 animate-pulse text-l">
                                <svg
                                  aria-hidden="true"
                                  role="status"
                                  class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="#1C64F2"
                                  />
                                </svg>
                                loading ....
                              </p>
                            ) : (
                              <>
                                {selectedProduct?.variants?.map((variant) => (
                                  <VariantsView
                                    variant={variant}
                                    key={variant?.id}
                                  />
                                ))}
                              </>
                            )}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </>
              )}
            </>
          ) : (
            <LoadingProcess isFull />
          )}
        </BlockPaper>
      </div>
    </>
  );
};

export default SuppliersReview;
