const Tooltip = ({ text }) => {
  return (
    <div className="relative inline-block cursor-pointer min-w-[220px] lg:min-w-[170px] group">
      <span className="inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-[20ch]">
        {text}
      </span>
      <span className="absolute hidden group-hover:block bg-gray-100 text-[15px] rounded-sm border border-gray-300 p-1 z-10 whitespace-nowrap top-full left-0">
        {text}
      </span>
    </div>
  );
};

export default Tooltip;
