import React, { useState } from "react";

import { CloseIcon } from "../../Helpers/Icons";

const SECTIONS = [
  { id: 1, name: "Why us", number: "" },
  { id: 2, name: "Benefits", number: "" },
  { id: 3, name: "Sale", number: "" },
  { id: 4, name: "Offers", number: "" },
  { id: 5, name: "Price limit", number: "" },
  { id: 6, name: "Collections", number: "" },
  { id: 7, name: "Category 1", number: "" },
  { id: 8, name: "Category 2", number: "" },
  { id: 10, name: "ShowReels", number: "" },
  { id: 9, name: "Category 3", number: "" },
  { id: 7, name: "Category 4", number: "" },
  { id: 11, name: "Customer videos", number: "" },
  { id: 8, name: "Category 5", number: "" },
  { id: 9, name: "Category 6", number: "" },
  { id: 12, name: "Category 7", number: "" },
  { id: 13, name: "Category 8", number: "" },
  { id: 14, name: "Our Videos", number: "" },
  { id: 14, name: "Our news", number: "" },
  { id: 14, name: "Reviews", number: "" },
];

const HomeSections = () => {
  const [sortedSections, setSortedSection] = useState([]);
  const [sections, setSections] = useState(SECTIONS);

  const handleSectionDarg = (e, section) => {
    e.dataTransfer.setData("section", JSON.stringify(section));
  };
  const handleOneDrop = (e) => {
    const currentSection = JSON.parse(e.dataTransfer.getData("section"));
    setSortedSection((prev) => [...prev, currentSection]);
    setSections((prev) =>
      prev?.filter((item) => item?.id !== currentSection?.id)
    );
  };

  const handleDargEnd = (e) => {
    e.preventDefault();
  };

  const deleteSection = (item) => {
    setSortedSection((prev) =>
      prev?.filter((currentItem) => currentItem?.id !== item?.id)
    );
    setSections((prev) => [...prev, item]);
  };

  const onResetOrders = () => {
    setSortedSection([]);
    setSections(SECTIONS);
  };

  return (
    <section className="">
      <div className="flex gap-8 flex-wrap md:flex-nowrap">
        {sections?.length ? (
          <div className="flex-1 min-w-[250px]">
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 bg-gray-50 p-2 rounded-md shadow">
              {sections?.map((section) => (
                <li
                  draggable
                  onDragStart={(e) => handleSectionDarg(e, section)}
                  className="border-dashed whitespace-nowrap border-2 border-gray-300 text-white bg-[#00C9A7] p-3 grid place-items-center cursor-move active:translate-x-2 active:-rotate-2 "
                >
                  {section?.name}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="flex-1 min-w-[250px] ">
          <div
            onDrop={handleOneDrop}
            className="bg-[#C4FCEF] shadow h-full min-h-[250px]"
            onDragOver={handleDargEnd}
          >
            <ul
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                sections?.length ? "" : "md:grid-cols-4"
              } gap-4 p-2`}
            >
              {sortedSections?.map((section, index) => (
                <li className="bg-white relative group-section  overflow-hidden border-gray-500 flex items-center shadow">
                  <span className="bg-[#00C9A7] w-12 text-center text-white py-2 px-4">
                    {index + 1}
                  </span>
                  <span className="mx-auto whitespace-nowrap">
                    {section?.name}
                  </span>
                  <button
                    className="text-red-500 px-3"
                    onClick={() => deleteSection(section)}
                  >
                    <CloseIcon className="w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center mt-8">
        <button
          onClick={onResetOrders}
          className="border border-primary-blue text-primary-blue p-2 px-8 rounded-md"
        >
          Reset Orders
        </button>
        <button className="bg-primary-blue text-white  p-2 px-8 rounded-md">
          Save Orders
        </button>
      </div>
    </section>
  );
};

export default HomeSections;
