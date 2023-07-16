import React, { useEffect } from "react";
import { useState } from "react";

import { PopupFormOne } from "../../Components/CustomForm/PopupFormOne";
import COMBINE_DB_API from "../../Helpers/Forms/combineTables";
import DB_API from "../../Helpers/Forms/databaseApi";
import EditIcon from "../../Helpers/Icons/EditIcon";
import { useFetch } from "../../hooks/useFetch";
import DynamicLayout from "../Dynamics/DynamicLayout";
import { Link } from "react-router-dom";
import { EyeIcon } from "../../Helpers/Icons";

const userOptions = [
  "user_address",
  "user_alert",
  "user_cart",
  "user_invite",
  "user_like",
  "user_point",
  "user_suggestion",
  "user_ticket",
  "user_wallet",
];

const CACHE_COLUMNS = {};
const CACHE_DATA = {};
const CACHE_FIELDS = {};

const Users = () => {
  const { getData } = useFetch();
  const [activeStage, setActiveStage] = useState(userOptions[0]);
  const [oldValues, setOldValues] = useState({});
  const [initialFields, setInitialFields] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [openFeaturesForm, setOpenFeaturesForm] = useState(false);
  const [layout, setLayout] = useState("");

  const fetchData = async (tableName) => {
    const data = await getData(tableName);
    CACHE_DATA[tableName] = data;
  };
  useEffect(() => {
    for (let table of userOptions) {
      fetchData(table);
      let columns = COMBINE_DB_API?.[`combine_${table}`];
      CACHE_COLUMNS[table] = columns;
      let fields = DB_API?.[table];
      CACHE_FIELDS[table] = fields;
    }
    setRefresh((p) => !p);
  }, []);

  const onClickAddNew = () => {
    setInitialFields(CACHE_FIELDS[activeStage]);
    setOpenFeaturesForm(true);
  };
  const onClickEdit = (data) => {
    setInitialFields(CACHE_FIELDS[activeStage]);
    setOldValues(data);
    setOpenFeaturesForm(true);
    setLayout("update");
  };

  useEffect(() => {}, [refresh]);
  const onSubmit = async (data) => {
    if (layout === "update") {
      // const response = addItem(activeStage, {});
      // const itemId = response?.data?.[0]?.id;
      console.log("submit", data);
    }
  };

  return (
    <>
      <PopupFormOne
        setInitialFields={setInitialFields}
        setOldValues={setOldValues}
        open={openFeaturesForm}
        setOpen={setOpenFeaturesForm}
        oldValues={oldValues}
        table={activeStage}
        layout={layout}
        setLayout={setLayout}
        initialFields={initialFields}
        onSubmit={onSubmit}
      />
      <div>
        <div className="mb-4 bg-white shadow-sm my-4 w-full p-4">
          <h2 className="text-primary-blue font-semibold mb-4 text-lg">
            Users
          </h2>
          <div className=" border-b flex flex-wrap ">
            {userOptions?.map((stage, index) => (
              <button
                className={`text-gray-500 px-4 text-sm border-b-2 -mb-[2px] !gap-1 p-2 capitalize flex items-center ${
                  stage === activeStage
                    ? "border-primary-red text-primary-red font-medium"
                    : ""
                }`}
                onClick={() => setActiveStage(stage)}
              >
                {stage?.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>
        <div key={activeStage}>
          <DynamicLayout
            SUPABASE_TABLE_NAME={activeStage}
            columns={
              CACHE_COLUMNS[activeStage] ||
              DB_API?.[userOptions[0]]?.map((col) => col?.name) ||
              []
            }
            title={activeStage?.replace("_", " ")}
            oldValue={CACHE_DATA[activeStage]}
            onAddClick={onClickAddNew}
            renderTableAction={(data) => {
              return (
                <div className="flex gap-4 items-center">
                  <button
                    className="bg-primary-blue mx-auto text-white text-sm min-w-[80px] flex justify-center items-center gap-1 p-1 rounded-md"
                    onClick={() => onClickEdit(data)}
                  >
                    <EditIcon className="w-4 h-4" />
                    Edit
                  </button>
                  <Link className="text-primary-blue" to={`/users/${data?.id}`}>
                    <EyeIcon />
                  </Link>
                </div>
              );
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Users;
