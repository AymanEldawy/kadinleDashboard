import React from "react";
import Layout from "../../Layout";
const colors = ["#f03", "#973", "#f08", "#8d3", "#0ed", "#0da", "#0e5"];
const Tools = () => {
  return (
    <Layout>
      <div className="container">
        {/* colors */}
        <div className="flex gap-1">
          {colors?.map((color) => (
            <button
              style={{ background: color }}
              className={`border h-5 w-8 bg-[${color}]`}
            ></button>
          ))}
        </div>
        {/* tables */}
      </div>
    </Layout>
  );
};

export default Tools;
