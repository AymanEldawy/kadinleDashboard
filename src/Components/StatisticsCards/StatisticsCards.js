import React from "react";
import StatisticsCard from "./StatisticsCard";

const StatisticsCards = ({ data }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {Object.values(data)?.map((item) => (
        <StatisticsCard key={item.name} {...item} />
      ))}
    </div>
  );
};

export default StatisticsCards;
