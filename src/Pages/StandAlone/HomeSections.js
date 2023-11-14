import React, { useEffect, useState } from "react";

import { Button } from "../../Components/Global/Button";
import Modal from "../../Components/Modal/Modal";
import { CloseIcon, ReturnIcon } from "../../Helpers/Icons";
import { useDelete } from "../../hooks/useDelete";
import { useFetch } from "../../hooks/useFetch";
import BlockPaper from "./../../Components/BlockPaper/BlockPaper";
import InputField from "./../../Components/CustomForm/InputField";
import { useAdd } from "./../../hooks/useAdd";
import { toast } from "react-toastify";
import { updateItem } from "../../Api/globalActions";

const SECTIONS = [
  { section_name: "outerwear", display_home: true },
  { section_name: "Underwear", display_home: true },
  { section_name: "Maternity", display_home: true },
  // { section_name: "kids/Girls", display_home: true },
  { section_name: "Customer videos", display_home: true },
  { section_name: "Home Clothes", display_home: true },
  { section_name: "Lingerie", display_home: true },
  { section_name: "Plus Size", display_home: true },
  { section_name: "Modest Clothes", display_home: true },
  { section_name: "Our Videos", display_home: true },
  { section_name: "Our news", display_home: true },
  { section_name: "Reviews", display_home: true },
  { section_name: "Best seller", display_home: true },
  { section_name: "influencer videos", display_home: true },
];


let CACHE_NUMBERS = {};
const HomeSections = () => {
  const { getData } = useFetch();
  const { deleteItem } = useDelete();
  const { addItem } = useAdd();
  const [sortedSections, setSortedSection] = useState([]);
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState("");
  const [openForm, setOpenForm] = useState(false);

  const getSections = async () => {
    const response = await getData("home_sections");
    if (response?.length) setSortedSection(response);
    else setSections(SECTIONS);
  };

  useEffect(() => {
    getSections();
  }, []);

  const handleSectionDarg = (e, section) => {
    e.dataTransfer.setData("section", JSON.stringify(section));
  };
  const handleOneDrop = (e) => {
    const currentSection = JSON.parse(e.dataTransfer.getData("section"));

    let section_order = sortedSections?.length + 1;
    CACHE_NUMBERS[section_order] = true;

    setSortedSection((prev) => [...prev, { ...currentSection, section_order }]);
    setSections((prev) =>
      prev?.filter(
        (item) => item?.section_name !== currentSection?.section_name
      )
    );
  };

  const handleDargEnd = (e) => {
    e.preventDefault();
  };

  const returnSortedSection = (item) => {
    delete CACHE_NUMBERS[item?.section_order];
    setSortedSection((prev) =>
      prev?.filter(
        (currentItem) => currentItem?.section_name !== item?.section_name
      )
    );
    setSections((prev) => [...prev, item]);
  };

  const onResetOrders = () => {
    CACHE_NUMBERS = {};
    setSortedSection([]);
    setSections(SECTIONS);
  };

  const onSaveOrder = async () => {
    if (!sections?.length) {
      const loading = toast.loading("loading...");
      let response = null;
      for (const section of sortedSections) {
        if (section?.id) response = await updateItem("home_sections", section);
        else response = await addItem("home_sections", section);
      }
      if (response?.error || !response) {
        toast.update(loading, {
          render: response.error || "Field to sort sections, please try again",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      } else {
        toast.update(loading, {
          render: "Successfully sorted home page sections",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
      }
    }
  };

  const addNewSection = (e) => {
    e.preventDefault();
    setSections((prev) => [...prev, { section_name: newSection }]);
    setNewSection("");
  };

  const deleteSection = async (section) => {
    setSections((prev) =>
      prev?.filter((s) => s?.section_name !== section?.section_name)
    );
    if (section?.id) {
      // delete section from database
      await deleteItem("home_section", [section?.id]);
    }
  };

  const onChangeNumber = (e, section_name) => {
    let value = e.target.value;
    if (CACHE_NUMBERS[value]) return;
    let newSortedSections = sortedSections?.map((section) => {
      if (section?.section_name === section_name) {
        section.section_order = +value;
      }
      return section;
    });
    setSortedSection(newSortedSections);
  };

  const onSaveChangeNumber = (e) => {
    let value = e.target.value;
    CACHE_NUMBERS[value] = true;
  };

  const changeVisibility = (e, section_name) => {
    let newSortedSections = sortedSections?.map((section) => {
      if (section?.section_name === section_name) {
        section.display_home = e.target.checked;
      }
      return section;
    });
    setSortedSection(newSortedSections);
  };

  return (
    <>
      <Modal open={openForm} onClose={() => setOpenForm(false)}>
        <form>
          <InputField
            label="new Section"
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
          />
          <Button>Add new</Button>
        </form>
      </Modal>
      <BlockPaper
        title="Home sections"
        headerClassName="flex items-center justify-between"
        contentBar={
          <form className="flex gap-1 items-center">
            <InputField
              className="p-1 placeholder:text-gray-400 dark:placeholder:text-white"
              placeholder="Enter new section ..."
              value={newSection}
              onChange={(e) => setNewSection(e.target.value)}
            />
            <Button title="Add new" onClick={addNewSection} />
          </form>
        }
      >
        <div className="flex gap-8 flex-wrap md:flex-nowrap px-4">
          {sections?.length ? (
            <div className="flex-1 min-w-[250px]">
              <ul className="flex flex-wrap gap-4 bg-purple-100 p-4 rounded-md shadow">
                {sections?.map((section) => (
                  <li
                    key={section?.section_name}
                    draggable
                    onDragStart={(e) => handleSectionDarg(e, section)}
                    className="border-dashed font-medium group capitalize relative whitespace-nowrap border-2 bg-purple-100 text-purple-500 border-purple-400 p-3 gap-4 flex items-center cursor-move active:translate-x-2 active:-rotate-2 "
                  >
                    <button
                      className="bg-purple-400 border  z-10 hover:opacity-1 text-white p-1 capitalize rounded-full absolute -top-2 -left-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSection(section);
                      }}
                    >
                      <CloseIcon className="w-3 h-3" />
                    </button>
                    {section?.section_name}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="flex-1 min-w-[250px] ">
            <div
              onDrop={handleOneDrop}
              className="bg-purple-200 shadow h-full min-h-[250px]"
              onDragOver={handleDargEnd}
            >
              <ul
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  sections?.length ? "" : "md:grid-cols-4"
                } gap-4 p-4`}
              >
                {sortedSections?.map((section, index) => (
                  <li
                    key={index}
                    className="bg-white dark:bg-bgmaindark relative group-section  overflow-hidden border-gray-500 flex items-center shadow"
                  >
                    <InputField
                      type="number"
                      className="bg-purple-50 border-purple-50 w-16 text-center text-purple-500 py-2 px-4"
                      value={section?.section_order}
                      onChange={(e) => onChangeNumber(e, section?.section_name)}
                      onBlur={onSaveChangeNumber}
                      maxLength="90"
                    />
                    <label
                      htmlFor={section?.section_name}
                      className="mx-auto flex items-center gap-2 whitespace-nowrap"
                    >
                      <input
                        onChange={(e) =>
                          changeVisibility(e, section?.section_name)
                        }
                        id={section?.section_name}
                        type="checkbox"
                        name="display_home"
                        defaultChecked={section?.display_home}
                        value={section?.display_home}
                        className="w-4 h-4"
                      />
                      {section?.section_name}
                    </label>
                    <button
                      className="text-red-500 px-3"
                      onClick={() => returnSortedSection(section)}
                    >
                      <ReturnIcon className="w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center p-4">
          <button
            onClick={onResetOrders}
            className="border border-primary-blue text-primary-blue p-2 px-8 rounded-md"
          >
            Reset Orders
          </button>
          <button
            onClick={onSaveOrder}
            className="bg-primary-blue text-white  p-2 px-8 rounded-md"
          >
            Save Orders
          </button>
        </div>
      </BlockPaper>
    </>
  );
};

export default HomeSections;
