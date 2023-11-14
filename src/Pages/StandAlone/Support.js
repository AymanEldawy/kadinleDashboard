import React, { useEffect, useState } from "react";
import { getRooms } from "../../Api/data";
import { FullImage } from "../../Components/Global/FullImage/FullImage";
import ChatRoom from "./ChatRoom";
import { supabase } from "../../Helpers/SupabaseConfig/SupabaseConfig";
import { useMemo } from "react";

const Support = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(false);
  const [newRoomsId, setNewRoomsId] = useState({});

  const fetchRooms = async () => {
    const res = await getRooms("");
    if (res?.error) return;
    setRooms(res?.data);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("realtime room creation")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "room",
        },
        (payload) => {
          if (payload?.eventType === "INSERT") {
            setRooms((prev) => [payload?.new, ...prev]);
          } else {
            if (payload?.old?.id !== rooms?.[0]?.id) fetchRooms();
            if (payload?.old?.id !== selectedRoom) {
              setNewRoomsId((prev) => ({
                ...prev,
                [payload?.old?.id]: true,
              }));
            }
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (newRoomsId?.[selectedRoom?.id]) {
      let roomIds = newRoomsId;
      delete roomIds?.[selectedRoom?.id];
      setNewRoomsId(roomIds);
    }
  }, [selectedRoom, newRoomsId]);

  return (
    <div className="h-screen -mt-[70px] pt-[70px] flex">
      <div className="bg-teal-600 w-1/3 max-w-[300px]">
        <ul className="flex flex-col">
          {rooms?.map((item, index) => {
            const user = item?.user;
            const theName = user?.first_name + " " + user?.last_name;

            return (
              <li
                key={item?.id}
                className={`relative border-b border-teal-600 last:border-b-0 items-center px-4 py-2 flex gap-4 hover:bg-[#0004] ${
                  item?.id === selectedRoom?.id ? "bg-[#0004]" : ""
                } shadow text-white ${newRoomsId?.[item?.id] ? '' : 'order-1'}`}
                onClick={() => setSelectedRoom(item)}
              >
                {user?.profile_img ? (
                  <FullImage
                    height={40}
                    width={40}
                    src={user?.profile_img}
                    alt={`${theName} avatar`}
                    className="w-9 h-9 rounded-full p-[1px] border"
                  />
                ) : null}
                <div className="flex flex-col gap-[2px]">
                  <span>{theName}</span>
                  <small className="text-gray-200 opacity-70 text-[10px] capitalize">
                    {new Date(item?.last_updated).toLocaleDateString("en-UK", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </small>
                </div>
                {newRoomsId?.[item?.id] && selectedRoom?.id !== item?.id ? (
                  <span className=" capitalize absolute top-2 right-2 px-2 py-1 flex items-center justify-center bg-red-500 text-white rounded-md text-[10px]">
                    new message
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
      {selectedRoom ? (
        <ChatRoom room={selectedRoom} />
      ) : (
        <div className=""></div>
      )}
    </div>
  );
};

export default Support;
