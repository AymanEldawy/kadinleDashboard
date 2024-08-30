import { useState, useEffect, useRef, memo } from "react";
import { useUpdate } from "../../hooks/useUpdate";
import { toast } from "react-toastify";

const Popup = ({
  isVisible,
  onClose,
  productPrice,
  updateAllData,
  product,
  variantId,
}) => {
  // console.log("isVisible", isVisible);
  const [price, setPrice] = useState(productPrice[0]);
  const [applyToAll, setApplyToAll] = useState(false);
  const inputRef = useRef(null);

  const updateSingleProduct = {
    id: variantId,
    price: price,
    // percentage: Math.round(variant?.percentage * 100),
  };

  const { updateItem } = useUpdate();
  const updateList = async () => {
    const response = await updateItem("product_variant", updateSingleProduct);
    if (response?.error) {
      toast.error(`Failed to update product for selected products`);
      console.log("error", response.error);
    } else {
      toast.success(`Successfully update product for selected products`);
    }
  };
  // updateList();
  console.log("updateAllData", updateAllData);
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

  return (
    <>
      <div
        id="overlay"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        onClick={handleOverlayClick}
      >
        <div className="relative bg-white p-4 rounded shadow-lg z-60">
          <div className="flex gap-2 items-center justify-center mb-3">
            <input
              ref={inputRef}
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full flex-[2]"
            />
            <button
              onClick={() => {
                // Handle update logic here
                updateList();
                onClose();
                window.location.reload(); // Refresh the page
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
    </>
  );
};

export default memo(Popup);
