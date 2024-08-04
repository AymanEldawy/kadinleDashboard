import React from "react";
import BlockPaper from "../../Components/BlockPaper/BlockPaper";
import { useEffect } from "react";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useUpdate } from "../../hooks/useUpdate";

const ChatSetting = () => {
  const { getData } = useFetch();
  const { updateItem } = useUpdate();
  const [settings, setSettings] = useState({});

  const getSettings = async () => {
    const res = await getData("chat_settings");
    setSettings(res?.at(0));
  };

  useEffect(() => {
    getSettings();
  }, []);

  const handleChange = async (e) => {
    await updateItem("chat_settings", {
      [e.target.name]: e.target.checked,
      id: settings?.id
    });
    getSettings()
  };

  return (
    <BlockPaper title="Chat Setting">
      <div className="flex flex-col gap-4">
        {["display", "status"]?.map((item) => (
          <div
            className="flex gap-4 items-center bg-white rounded-xl p-1"
            key={item}
          >
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                checked={settings?.[item]}
                type="checkbox"
                value={settings?.[item]}
                className="sr-only peer"
                name={item}
                onChange={(e) => handleChange(e)}
              />
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <span class="ml-3 capitalize text-sm font-medium text-gray-500 dark:text-gray-600">
              {item === "status" ? "Open the chat" : "display in the website"}
            </span>
          </div>
        ))}
      </div>
    </BlockPaper>
  );
};

export default ChatSetting;
