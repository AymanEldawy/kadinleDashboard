import React, { useEffect, useState } from "react";
import { getSingleSupplier, getSupplierAttachment } from "../../Api/data";
import { useParams } from "react-router-dom";

const SingleSupplier = () => {
  const params = useParams();
  const [supplierData, setSupplierData] = useState([]);
  const [files, setFiles] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const getSupplierInfo = async (table) => {
    setIsLoading(true);

    const data = await getSingleSupplier(params?.id);
    setSupplierData(data);
    const supplierFiles = await getSupplierAttachment(data?.id);
    setFiles(supplierFiles?.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getSupplierInfo();
  }, [params?.id]);

  return <div>SingleSupplier</div>;
};

export default SingleSupplier;
