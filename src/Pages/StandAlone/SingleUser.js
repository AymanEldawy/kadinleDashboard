import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { logout } from "../../Api/auth";
import { getUserData, getUserTypeData } from "../../Api/data";
import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
import InputField from "../../Components/CustomForm/InputField";
import SelectField from "../../Components/CustomForm/SelectField";
import { Button } from "../../Components/Global/Button";
import { FullImage } from "../../Components/Global/FullImage/FullImage";
import Modal from "../../Components/Modal/Modal";
import { UserStatices } from "../../Components/User/UserStatictes";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import { MapIcon } from "../../Helpers/Icons";
import { useDelete } from "../../hooks/useDelete";
import { useFetch } from "../../hooks/useFetch";
import { useUpdate } from "../../hooks/useUpdate";

const userOptions = [
  "address",
  "cart",
  "invite",
  "like",
  "point",
  "suggestion",
  "ticket",
  "wallet",
];

const SingleUser = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { deleteItem } = useDelete();
  const { getData } = useFetch();
  const { updateItem } = useUpdate();
  const { user: ADMIN } = useGlobalOptions()
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [types, setTypes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const getTypes = async () => {
    const response = await getData("user_type");
    setTypes(response);
  };

  const getUser = async () => {
    const response = await getUserData('user', 'id', params?.id);
    const userType = await getUserTypeData(response?.data?.[0]?.user_type_id);
    setUserData((prev) => {
      return {
        ...prev,
        user: response?.data?.[0],
        type: userType?.data?.[0],
      };
    });
  };
  const getUserInfo = async (table) => {
    setIsLoading(true)

    const response = await getUserData(`user_${table}`, 'user_id', params?.id);
    setUserData((prev) => {
      return {
        ...prev,
        [table]: response?.data,
      };
    });
    setIsLoading(false)

  };

  useEffect(() => {
    getUser();
    for (const option of userOptions) {
      getUserInfo(option);
    }
    getTypes();
  }, [params?.id]);



  const handleDeleteItem = async () => {
    const response = await deleteItem(user, params?.id);
    if (response?.error) {
      toast.success("Failed to delete the user, please try again");
    } else {
      toast.success("User has been deleted successfully");
      setTimeout(() => {
        navigate(-1);
      }, 200);
    }
  };

  const updateRole = async (e) => {
    e.preventDefault();
    const response = await updateItem("user", {
      ...userData?.user,
      user_type_id: title,
    });

    if (response.error) {
      toast.error("Failed to update user role");
      return;
    }

    toast.success("Successfully updated user role");
    await getUser();

    if (userData?.user?.id === ADMIN?.id) {
      logout()
    }
    setOpenModal(false);
  };
  console.log("🚀 ~ file: SingleUser.js:116 ~ updateRole ~ ADMIN:", ADMIN)
  console.log("🚀 ~ file: SingleUser.js:116 ~ updateRole ~ user:", userData?.user)
  const { user } = userData;
  const type = userData?.type;
  return (
    <>
      <ConfirmModal
        onConfirm={() => {
          handleDeleteItem();
          setOpenConfirmation(false);
        }}
        open={openConfirmation}
        setOpen={setOpenConfirmation}
      />
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <form className="flex flex-col gap-4 ">
          <div>
            <h3 className="mb-1 text-primary-blue text-lg font-semibold">
              Change user role
            </h3>
            <p className="text-yellow-700 bg-yellow-50 p-1 text-xs">
              Be careful when allowing the user to add or remove roles, as this
              can affect their level of access.
            </p>
          </div>
          <SelectField
            name="title"
            label={"title"}
            value={title}
            list={types}
            onChange={(e) => setTitle(e.target.value)}
            keyLabel="title"
          />
          <Button onClick={updateRole} title="Save" />
        </form>
      </Modal>
      <div className="-mx-4 -mt-8">
        <div className=" h-56 dark:bg-[#303030] bg-gray-100 flex items-center justify-center shadow mb-6">
          <div>
            {user?.profile_img ? (
              <FullImage
                width={80}
                height={80}
                src={user?.profile_img}
                className="!h-20 !w-20 min-w-[80px] mx-auto block rounded-full p-[2px] shadow"
                alt="user avatar"
              />
            ) : (
              <span
                className="h-20 w-20 text-3xl bg-purple-500 font-semibold mx-auto block rounded-full p-[2px] shadow flex items-center justify-center"
                alt="user avatar"
              >
                {user?.first_name?.[0] || "U"}
              </span>
            )}
            <div className="mt-3 flex flex-col items-center justify-center">
              <h3 className="font-medium text-black text-lg capitalize dark:text-white">
                {user?.first_name} {user?.last_name}
              </h3>
              <p className="text-xs text-gray-500 items-center flex gap-1">
                Role:
                <span
                  className={`${type?.number === 0 &&
                    "text-black px-2 p-1 rounded-md text-xs bg-primary-yellow"
                    } 
                ${type?.number === 1 &&
                    "text-white px-2 p-1 rounded-md text-xs bg-indigo-500"
                    }
                 ${type?.number === 2 &&
                    "text-white px-2 p-1 rounded-md text-xs bg-primary-red"
                    } 
                 ${type?.number === 3 &&
                    "text-white px-2 p-1 rounded-md text-xs bg-primary-blue"
                    } 
                 ${type?.number === 4 &&
                    "text-white px-2 p-1 rounded-md text-xs bg-emerald-700"
                    }`}
                >
                  {type?.title}
                </span>
              </p>
            </div>
          </div>
        </div>
        {
          ADMIN?.role?.title === 'superadmin' ? (
            <div className="my-4 px-4 flex gap-4 justify-between items-center">
              <div className="gap-4 flex items-center">
                <button
                  className="text-white p-2 rounded-md text-xs font-medium bg-primary-red"
                  onClick={() => setOpenConfirmation(true)}
                >
                  Delete
                </button>
                <button
                  onClick={() => setOpenModal(true)}
                  className="text-white p-2 rounded-md text-xs font-medium bg-primary-green"
                >
                  Change role
                </button>
                <Link
                  to={`/update/user/${user?.id}`}
                  className="text-white p-2 rounded-md text-xs font-medium bg-primary-blue"
                >
                  Edit
                </Link>
              </div>
            </div>
          ) : null
        }
        <UserStatices userData={userData} isLoading={isLoading} />
      </div>
    </>
  );
};

export default SingleUser;
