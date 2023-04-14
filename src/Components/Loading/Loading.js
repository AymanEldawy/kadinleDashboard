import React from "react";

import { HourglassIcon } from "../../Helpers/Icons";
import Backdrop from "../Backdrop/Backdrop";

const Loading = ({ withBackdrop }) => {
  let classes = withBackdrop
    ? "!fixed -ml-16 -mt-16 top-1/2 left-1/2 w-32 h-32"
    : "mt-32 ml-32";
  return (
    <>
      {withBackdrop ? <Backdrop open={true} /> : null}
      <div
        className={`relative rounded-full h-16 w-16 text-center  z-50 ${classes}`}
      >
        <HourglassIcon />
        <h3 className="text-white text-2xl mt-1 capitalize">
          loading
          <span className="tracking-wider text-3xl delay-100 animate-ping">
            .
          </span>
          <span className="tracking-wider text-3xl delay-500 animate-ping ">
            .
          </span>
          <span className="tracking-wider text-3xl delay-700 animate-ping ">
            .
          </span>
        </h3>
      </div>
    </>
  );
};

export default Loading;
