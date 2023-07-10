import React from "react";
import { Link } from "react-router-dom";

export const UserInfo = ({ id, first_name, last_name, profile_img }) => {
  const fullName = first_name + " " + last_name;
  return (
    <Link to={`/users/${id}`} className="flex gap-2 items-center text-sm">
      <img
        src={profile_img}
        alt={`${fullName} avatar`}
        className="w-9 h-9 rounded-full p-[1px] border"
      />
      <span>{fullName}</span>
    </Link>
  );
};
