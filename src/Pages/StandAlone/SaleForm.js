import React, { useState } from "react";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { SelectedProductTable } from "../../Components/SelectedProductsComponents/SelectedProductTable";
import { useAdd } from "../../hooks/useAdd";
import { useFetch } from "../../hooks/useFetch";
import { useDelete } from "../../hooks/useDelete";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { CalenderIcon, ChevronIcon } from "../../Helpers/Icons";
import InputField from "../../Components/CustomForm/InputField";
import ReactPaginate from "react-paginate";

const SaleForm = () => {
  const params = useParams();
  const { addItem } = useAdd();
  const { getData } = useFetch();
  const { removeItems } = useDelete();
  const { defaultLanguage } = useGlobalOptions();
  const [category_id, setCategory_id] = useState(null);
  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const [rowSelection, setRowSelection] = useState([]);
  const [productsLength, setProductLength] = useState(0);
  console.log("🚀 ~ SaleForm ~ productsLength:", productsLength);

  const handleChoose = async () => {
    const loading = toast.loading("loading...");
    const response = await addItem(`sale`);
    if (response?.error) {
      toast.update(loading, {
        render: response.error || "Field to add, please try again",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    } else {
      toast.update(loading, {
        render: "Successfully set products",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  return (
    <BlockPaper
      title="Flash Sale"
      headerClassName="flex items-center justify-between"
      contentBar={
        <p className="ml-auto">
          Selected Products:{" "}
          <span className="font-extrabold text-lg">{productsLength}</span>{" "}
        </p>
      }
    >
      <SelectedProductTable
        extraContent={
          <div className="flex gap-2 items-center">
            <InputField
              containerClassName="mb-0"
              type="date"
              label="Start date"
              value={start_date}
              onChange={(e) => setStart_date(e.target.value)}
              className="p-1"
            />
            <InputField
              containerClassName="mb-0"
              type="date"
              label="End date"
              value={end_date}
              onChange={(e) => setEnd_date(e.target.value)}
              className="p-1"
            />
          </div>
        }
        setProductLength={setProductLength}
        insertMany={handleChoose}
        tableName={"sale"}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        setSelectedCategory={setCategory_id}
      />
    </BlockPaper>
  );
};

export default SaleForm;
