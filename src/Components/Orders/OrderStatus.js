const OrderStatus = ({ order, defaultLanguage }) => {
  const status = order?.order_status?.order_status_content?.filter(
    (status) => status.language_id === defaultLanguage?.id
  );

  return <div className="text-center min-w-[250px]">{status[0]?.status}</div>;
};

export default OrderStatus;
