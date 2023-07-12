import React from "react";
import { useContext } from "react";
import { LanguageContext } from "../../Context/LangContext";
import { fetchWord } from "../lang/fetchWord";
import ArrowIcon from "../icons/ArrowIcon";
import { Link } from "react-router-dom";
import CustomCountUp from "./CountUp";

const StatisticsCard = ({
  name,
  statistics,
  preStatistics,
  icon,
  color,
  percentage,
  isIncreased,
  link,
  linkText,
}) => {
  const { lang } = useContext(LanguageContext);

  return (
    <div className="bg-white rounded-[2px] p-4 text-[#212529]">
      <div className="flex justify-between items-center gap-1">
        <h2 className="w-1/2 overflow-hidden whitespace-nowrap text-ellipsis uppercase text-sm">
          {fetchWord(name, lang)}
        </h2>
        <p
          className={`flex items-center ${
            isIncreased
              ? isIncreased !== "stable"
                ? "text-[#20BAA5]"
                : null
              : "text-[#f06548]"
          }`}
        >
          {isIncreased === "stable" ? (
            "+"
          ) : (
            <ArrowIcon
              className={isIncreased ? "rotate-45" : "rotate-[135deg]"}
            />
          )}
          {percentage} %
        </p>
      </div>
      <div className="flex items-end justify-between mt-5">
        <div>
          <p className="text-[#495057] text-[22px] font-semibold mb-5">
            <CustomCountUp end={statistics} prefix={preStatistics} />
          </p>
          <Link to={link} className="text-sm underline first-letter:capitalize">
            {fetchWord(linkText, lang)}
          </Link>
        </div>
        <div
          className={`w-12 h-12 flex items-center justify-center rounded ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;