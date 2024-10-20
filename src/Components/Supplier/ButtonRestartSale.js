import React, { useState } from "react";
import { UturnArrowIcon } from "../../Helpers/Icons";
import { toast } from "react-toastify";
import { useAdd } from "../../hooks/useAdd";
import Modal from "../Modal/Modal";
import InputField from "../CustomForm/InputField";

export const ButtonRestartSale = ({ sale }) => {
  const { addItem } = useAdd();
  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const [open, setOpen] = useState(false);
  if (Date.parse(sale?.end_date) > Date.parse(new Date())) return;

  const handleChoose = async () => {
    if (!start_date || !end_date) {
      toast.error("Please Fill Required Data");
      return;
    }

    const loading = toast.loading("loading...");
    let response = null;

    await addItem(`sale`, {
      start_date,
      end_date,
      products_ids: sale?.products_ids,
      percentage: sale?.percentage,
      amount: sale?.amount,
      category_id: sale?.category_id,
    });

    if (response?.error) {
      toast.update(loading, {
        render: response.error || "Field to reuse the offer, please try again",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } else {
      toast.update(loading, {
        render: "Successfully Reuse the offer",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      setOpen(false)
    }
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h3 className="text-lg text-blue-500 font-medium mb-4 text-center pb-2 border-b">
          Reuse offer
        </h3>
        <ul className="flex flex-col gap-2 font-medium">
          <li className="bg-gray-50 border text-gray-600 capitalize rounded-md flex gap-4 items-center px-4 py-1">
            <strong className="w-[90px]">Category:</strong>{" "}
            <span className="bg-gray-200 text-black rounded-md px-2 py-1 text-xs">
              {sale?.category?.category_content?.at(0)?.title}
            </span>{" "}
          </li>
          <li className="bg-gray-50 border text-gray-600 capitalize rounded-md flex gap-4 items-center px-4 py-1">
            <strong className="w-[90px]">products:</strong>{" "}
            <span className="bg-gray-200 text-black rounded-md px-2 py-1 text-xs">
              {sale?.products_ids?.length}
            </span>{" "}
          </li>
          <li className="bg-gray-50 border text-gray-600 capitalize rounded-md flex gap-4 items-center px-4 py-1">
            <strong className="w-[90px]">Amount:</strong>{" "}
            <span className="bg-gray-200 text-black rounded-md px-2 py-1 text-xs">
              {sale?.amount}
            </span>{" "}
          </li>
          <li className="bg-gray-50 border text-gray-600 capitalize rounded-md flex gap-4 items-center px-4 py-1">
            <strong className="w-[90px]">Percentage:</strong>{" "}
            <span className="bg-gray-200 text-black rounded-md px-2 py-1 text-xs">
              {sale?.percentage ? "YES" : "NO"}
            </span>{" "}
          </li>
        </ul>
        <div className="flex gap-4 justify-center items-end border-t pt-2 mt-4">
          <InputField
            containerClassName="mb-0"
            required
            type="date"
            label="Start date"
            value={start_date}
            onChange={(e) => setStart_date(e.target.value)}
            className="p-1"
          />
          <InputField
            containerClassName="mb-0"
            required
            type="date"
            label="End date"
            value={end_date}
            onChange={(e) => setEnd_date(e.target.value)}
            className="p-1"
          />
          <button
            type="button"
            onClick={handleChoose}
            disabled={!start_date || !end_date}
            title="Save Changes"
            className="p-2 rounded-md disabled:bg-gray-200 disabled:text-gray-600 bg-primary-blue text-white flex items-center gap-2 text-base"
          >
            Save
          </button>
        </div>
      </Modal>
      <button
        onClick={() => setOpen(true)}
        className="hover:translate-x-1 transition-transform rounded-2xl flex items-center gap-2 px-2 p-1 bg-primary-blue text-white w-fit whitespace-nowrap"
      >
        <UturnArrowIcon className=" w-4 h-4" />
        Reuse
      </button>
    </>
  );
};
