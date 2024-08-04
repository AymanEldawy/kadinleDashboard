import React from "react";
import { FullImage } from "../Global/FullImage/FullImage";

export const ChatSingleMessage = ({ item, user }) => {
  return (
    <div
      className={`${item?.sender !== "SUPPORT" && "flex items-start gap-2"}`}
      key={item?.id}
    >
      {item?.sender !== "SUPPORT" ? (
        <FullImage
          src={user?.profile_img}
          alt="kadinle logo"
          className="w-10 h-1o object-contain bg-white rounded-full p-1 shadow"
        />
      ) : null}
      <div
        className={`px-4 py-2 max-w-[70%] rounded-md w-fit ${
          item?.sender === "SUPPORT"
            ? "bg-[#129b9b] text-white flex-1 max-w-fit ltr:ml-auto rtl:mr-auto"
            : "bg-gray-200 text-black"
        }`}
        key={item?.id}
      >
        {item?.text}
      </div>
    </div>
  );
};
