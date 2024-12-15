import { useState, useEffect, useRef } from "react";
import { useUpdate } from "../../hooks/useUpdate";
import { toast } from "react-toastify";
import { getFormatPriceToInsert } from "../../Helpers/functions";

const Popup = ({
  isVisible,
  onClose,
  // productPrice,
  updateAllData,
  product,
  variantId,
  getFormatPrice,
  selectedCurrency,
  index,
}) => {
  const updateProductsIdArr =
    JSON.parse(localStorage.getItem("updateProductsIdArr")) || [];

  const productPrice = getFormatPriceToInsert(
    product?.variants[index]?.price,
    selectedCurrency
  );
  const { updateItem } = useUpdate();
  const [price, setPrice] = useState(null);
  const [dollarPrice, setDollarPrice] = useState(null);
  const [applyToAll, setApplyToAll] = useState(false);
  const inputRef = useRef(null);

  const updateSingleProduct = {
    id: variantId,
    price: dollarPrice,
    // percentage: Math.round(variant?.percentage * 100),
  };

  const updateList = async () => {
    if (applyToAll && updateProductsIdArr.length > 0) {
      const allResponses = updateProductsIdArr.map(async (productId) => {
        const response = await updateItem("product_variant", {
          id: productId,
          price: dollarPrice,
        });
        return response;
      });

      Promise.all(allResponses).then((responses) => {
        const allSuccessful = responses.every(
          (response) => response.error === null
        );

        if (allSuccessful) {
          toast.success(`Successfully update  product for selected products`);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          toast.error(`Failed to update product for selected products`);
        }
      });
    } else {
      const response = await updateItem("product_variant", updateSingleProduct);
      if (response?.error) {
        toast.error(`Failed to update the product`);
      } else {
        toast.success(`Successfully update the product`);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    }
  };

  useEffect(() => {
    setPrice(productPrice[0]);
  }, [productPrice[0]]);
  useEffect(() => {
    setDollarPrice(price / selectedCurrency?.rate);
  }, [price, selectedCurrency?.rate]);
  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.select();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handleOverlayClick = (e) => {
    if (e.target.id === "overlay") {
      onClose();
    }
  };

  const handleOnChange = (e) => {
    return setPrice(e.target.value);
  };
  return (
    <>
      {price && (
        <div
          id="overlay"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleOverlayClick}
        >
          <div className="relative bg-white p-4 rounded shadow-lg z-60">
            <div className="flex gap-2 items-center justify-center mb-3">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={price}
                  onChange={handleOnChange}
                  className="border border-gray-300 rounded p-2 w-full flex-[2]"
                />
                <span className="absolute top-2 right-3">
                  {productPrice[1]}
                </span>
              </div>
              <button
                onClick={() => {
                  // Handle update logic here
                  updateList();
                  onClose();
                  // window.location.reload(); // Refresh the page
                }}
                className="bg-blue-500 text-white rounded hover:text-blue-500 hover:bg-white border border-blue-500 p-2 w-full flex-1"
              >
                Apply
              </button>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="applyToAll"
                checked={applyToAll}
                onChange={(e) => setApplyToAll(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="applyToAll" className="text-sm">
                Apply to all variants
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;