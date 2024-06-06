
export const ResizeBar = ({ header }) => {
  return (
    <div
      className={`absolute top-0 rtl:left-0 ltr:right-0 h-full w-[3px] group-hover:bg-green-500 cursor-col-resize`}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
    />
  );
};
