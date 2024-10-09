import CopyButton from "../Supplier/CopyButton";

const OrderUser = ({ order }) => {
  return (
    <div className="flex min-w-[320px] items-center justify-center gap-5">
      <img
        src={order?.user?.profile_img}
        alt="user"
        className="h-10 w-10 rounded-full"
      />
      <div>
        <h2>{`${order?.user?.first_name} ${order?.user?.last_name}`}</h2>
        <div className="flex justify-center items-center gap-1">
            <p className="text-blue-700">{order?.user?.email}</p>
            {/* <CopyButton textToCopy={order?.user?.email}/> */}
        </div>
      </div>
    </div>
  );
};

export default OrderUser