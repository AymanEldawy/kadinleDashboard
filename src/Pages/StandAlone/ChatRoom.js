import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../../Helpers/SupabaseConfig/SupabaseConfig";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import ArrowIcon from "../../Components/icons/ArrowIcon";
import { UserInfo } from "../../Components/Global/UserInfo/UserInfo";
import { ChatSingleMessage } from "../../Components/ChatComponents/ChatSingleMessage";

const ChatRoom = ({ room }) => {
  const { user } = useGlobalOptions();
  const lastMessageRef = useRef();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([]);
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("chat")
        .select("*")
        .eq("room_id", room?.id)
        .order("created_at", { ascending: true });
      setMessages(data);
    };
    fetchMessages();
  }, [room?.id]);

  const insertMessage = async (data) => {
    await supabase.from("chat").insert(data);
    await supabase
      .from("room")
      .update({ last_updated: new Date() })
      .eq("id", data?.room_id);
  };

  useEffect(() => {
    if (!room?.id) return;

    const channel = supabase.channel("chat");
    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chat",
          filter: "room_id=eq." + room?.id,
        },
        (payload) => {
          if (payload?.new) setMessages((prev) => [...prev, payload?.new]);
        }
      )
      .subscribe();
  }, [room?.id]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (text === "" || !room?.id) return;

    const msg = {
      text,
      room_id: room?.id,
      user_id: user?.id,
      sender: "SUPPORT",
    };
    await insertMessage(msg);
    setText("");
  };

  return (
    <>
      <div className="bg-white flex-1">
        <div className="relative border-2 overflow-hidden w-full  pb-24 h-full">
          <div className=" bg-gray-200 w-full py-2 px-4 flex items-center justify-between">
            <UserInfo user={room?.user} />
            <small className="text-gray-500 capitalize">
              last message: {new Date().toDateString()}
            </small>
          </div>
          <div
            className="bg-white h-full overflow-auto flex flex-col gap-4 pt-4 pb-[80px] px-4"
            ref={lastMessageRef}
          >
            {messages?.map((item, index) => (
              <ChatSingleMessage user={room?.user} key={item?.id} item={item} />
            ))}
          </div>
          <form
            onSubmit={handleSendMessage}
            className="flex p-1 py-2 border-t-2 bg-white gap-2 shadow absolute bottom-0 left-0 w-full"
          >
            <input
              onChange={(e) => setText(e.target.value)}
              value={text}
              className="flex-1 px-4 bg-blue-100 rounded-md focus:ring-1 focus:outline-blue-500"
              placeholder={"Reply"}
            />
            <button className="rotate-90 h-9 w-9 group flex items-center justify-center rounded-full bg-blue-500 border border-blue-500 hover:bg-transparent hover:bg-white">
              <ArrowIcon className="h-5 w-5 group-hover:!text-blue-500 text-white" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
