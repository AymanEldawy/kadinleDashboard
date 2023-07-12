import React from "react";
import { Link } from "react-router-dom";

export const UserInfo = ({ user }) => {
  const theName = user?.first_name + " " + user?.last_name;
  // console.log(theName, fullName);
  return (
    <Link
      to={`/users/${user?.id}`}
      className="flex gap-2 hover:text-primary-blue capitalize items-center text-sm"
    >
      {user?.profile_img ? (
        <img
          src={user?.profile_img}
          alt={`${theName} avatar`}
          className="w-9 h-9 rounded-full p-[1px] border"
        />
      ) : null}
      <span>{theName}</span>
    </Link>
  );
};
