import React, { useEffect, useState } from "react";

import { Button } from "../../Components/Global/Button";
import { useDelete } from "../../hooks/useDelete";
import { useFetch } from "../../hooks/useFetch";
import BlockPaper from "./../../Components/BlockPaper/BlockPaper";
import { useAdd } from "./../../hooks/useAdd";
import { toast } from "react-toastify";
import { updateItem } from "../../Api/globalActions";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import {
  getAllCategories,
  getHomeSections,
  updateCategoryStatus,
} from "../../Api/data";
import { SectionOrderCard } from "../../Components/HomeSectionOrder/SectionOrderCard";
import ReactSelect from "react-select";
import { useQuery } from "@tanstack/react-query";
import AsyncSelect from "react-select/async";

const SECTIONS = [
  {
    section_id: "OUR_VIDEOS",
    section_type: "SECTION",
    section_name: "Our Videos",
    section_order: "4",
    display_home: true,
  },
  {
    section_id: "BEST_SELLER",
    section_type: "SECTION",
    section_name: "Best seller",
    section_order: "8",
    display_home: true,
  },
  {
    section_id: "CUSTOMER_VIDEOS",
    section_type: "SECTION",
    section_name: "Customer videos",
    section_order: "11",
    display_home: true,
  },
  {
    section_id: "HISTORY",
    section_type: "SECTION",
    section_name: "history",
    section_order: "12",
    display_home: true,
  },
  {
    section_id: "OUR_NEW",
    section_type: "SECTION",
    section_name: "Our news",
    section_order: "13",
    display_home: true,
  },
];

let CACHE_NUMBERS = {};

const SELECTED_CATE = {
  Dresses: true,
  Tops: true,
  Shoes: true,
  "Evening wear": true,
  Makeup: true,
  Bags: true,
  Jewelry: true,
  "Home Clothes": true,
  Abayas: true,
  Watches: true,
  "Skin Care": true,
  Hijabs: true,
  Trousers: true,
  "Hair Care": true,
  Sportswear: true,
  Jeans: true,
  Glasses: true,
  "Perfume & Deodorant": true,
  Underwear: true,
  "Personal Care": true,
  Hats: true,
  "Lingerie & Nighty": true,
  "Hair Accessories": true,
  "Maternity Clothing": true,
  Beachwear: true,
};

const HomeSections = () => {
  const { defaultLanguage } = useGlobalOptions();
  const { getData } = useFetch();
  const { deleteItem } = useDelete();
  const { addItem } = useAdd();
  const [sortedSections, setSortedSection] = useState([]);
  const [newSection, setNewSection] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [HASH_SECTIONS, setHASH_SECTIONS] = useState({});

  const getCategories = async () => {
    const res = await getAllCategories(defaultLanguage?.id);
    setCategories(res);
  };
  useEffect(() => {
    if (defaultLanguage?.id) {
      getCategories();
    }
  }, [defaultLanguage?.id]);

  const getSections = async () => {
    const response = await getHomeSections();
    if (response?.length) {
      let hash = {};
      setSortedSection(response);
      for (const item of response) {
        hash[item?.section_id] = item;
      }
      setHASH_SECTIONS(...hash);
    }
  };

  useEffect(() => {
    if (defaultLanguage?.id) getSections();
  }, [defaultLanguage]);

  const onSaveOrder = async () => {
    if (sortedSections?.length) {
      const loading = toast.loading("loading...");
      let response = null;

      for (const section of sortedSections) {
        if (section?.id) {
          let oldSection = HASH_SECTIONS?.[section?.section_id];
          if (section?.section_order !== oldSection?.section_order)
            response = await updateItem("home_sections", section);
        } else {
          response = await addItem("home_sections", section);
          if (section?.section_type === "CATEGORY") {
            await updateCategoryStatus(section?.section_id);
          }
        }
      }

      if (response?.error) {
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

  const addNewCategory = () => {
    setSortedSection((prev) => [
      ...prev,
      {
        section_id: newCategory?.category_id,
        section_type: "CATEGORY",
        section_name: newCategory?.title,
        section_order: sortedSections?.length + 1,
        display_home: true,
        deletable: true,
      },
    ]);
    setNewCategory("");
  };

  const addNewSection = () => {
    setSortedSection((prev) => [
      ...prev,
      {
        section_id: newSection,
        section_type: "SECTION",
        section_name: newSection,
        section_order: sortedSections?.length + 1,
        display_home: true,
        deletable: true,
      },
    ]);
    setNewSection("");
  };

  const deleteSection = async (section) => {
    setSortedSection((prev) =>
      prev?.filter((p) => prev?.section_name !== section?.section_name)
    );
    if (section?.id && section?.section_type === "CATEGORY") {
      // delete section from database
      await deleteItem("home_sections", [section?.id]);
      await updateItem("category", {
        id: section?.section_id,
        display_homepage: false,
      });
    }
  };

  const onChangeNumber = (e, section_name) => {
    let value = e.target.value;
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
      <BlockPaper
        title="Home sections"
        headerClassName="flex items-center justify-between"
        // contentBar={
        // }
      >
        <div className="flex gap-3 items-center mb-6 justify-between">
          <div className="flex gap-1 items-center">
            <ReactSelect
              className="w-[220px]"
              options={categories}
              // value={newCategory}
              onChange={(value) => {
                setNewCategory(value);
              }}
              placeholder="Enter new category ..."
            />
            <Button
              classes="!py-2"
              title="Add new category"
              onClick={addNewCategory}
            />
          </div>
          <div className="flex gap-1 items-center">
            <select className="w-[220px] border p-2 rounded-md">
              <option>Section</option>
              <option>Slider</option>
              <option>offer</option>
            </select>
            <input
              className="w-[220px] border p-2 rounded-md"
              onChange={(e) => setNewSection(e.target.value)}
              placeholder="Enter new section ..."
            />
            <Button
              classes="!py-2 bg-orange-500"
              title="Add new section"
              onClick={addNewSection}
            />
          </div>
        </div>

        <div className="flex-1 min-w-[250px] ">
          <div className="bg-purple-200 shadow h-full min-h-[250px]">
            <ul
              className={`grid grid-cols-1 sm:grid-col lg:grid-cols-3  gap-4 p-4`}
            >
              {sortedSections
                ?.sort((a, b) => a?.section_order - b?.section_order)
                ?.map((section, index) => (
                  <SectionOrderCard
                    section={section}
                    onChangeNumber={onChangeNumber}
                    onSaveChangeNumber={onSaveChangeNumber}
                    changeVisibility={changeVisibility}
                    deleteSection={deleteSection}
                  />
                ))}
            </ul>
          </div>
        </div>
        <button
          onClick={onSaveOrder}
          className="bg-primary-blue text-white mt-4 p-2 px-8 rounded-md"
        >
          Save Orders
        </button>
      </BlockPaper>
    </>
  );
};

export default HomeSections;
