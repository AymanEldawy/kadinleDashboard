
const Variant = ({ product }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className=" !h-[80px] flex items-center justify-center space-x-1">
        <span>{product?.variant_count}</span>
      </div>
    </div>
  );
};

export default Variant;
