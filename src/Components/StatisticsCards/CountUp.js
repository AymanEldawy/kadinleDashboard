import React from "react";
import CountUp from "react-countup";

const CustomCountUp = ({ start = 0, end, prefix }) => {
  return (
    <CountUp
      start={start}
      end={end}
      duration={2}
      decimals={3}
      decimal=","
      prefix={prefix}
    >
      {({ countUpRef }) => (
        <div>
          <span ref={countUpRef} />
        </div>
      )}
    </CountUp>
  );
};

export default CustomCountUp;
