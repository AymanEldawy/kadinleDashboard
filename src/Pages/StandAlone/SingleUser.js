import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getUserData, getUserDataById, getUserTypeData } from "../../Api/data";
import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
import InputField from "../../Components/CustomForm/InputField";
import SelectField from "../../Components/CustomForm/SelectField";
import { Button } from "../../Components/Global/Button";
import Modal from "../../Components/Modal/Modal";
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
  // "type",
];
const SingleUser = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { deleteItem } = useDelete();
  const { getData } = useFetch();
  const { updateItem } = useUpdate();
  const [userData, setUserData] = useState({});
  const [title, setTitle] = useState("");
  const [types, setTypes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const getTypes = async () => {
    const response = await getData("user_type");
    console.log(response);
    setTypes(response);
  };

  const getUser = async () => {
    const response = await getUserDataById(params?.id);
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
    console.log(`user_${table}`, "us");
    const response = await getUserData(`user_${table}`, params?.id);
    console.log(response, "user", table);
    setUserData((prev) => {
      return {
        ...prev,
        [table]: response?.data,
      };
    });
  };

  useEffect(() => {
    getUser();
    for (const option of userOptions) {
      getUserInfo(option);
    }
    getTypes();
  }, [params?.id]);

  const { user } = userData;
  const type = userData?.type;
  const cartLength = userData?.cart?.reduce((result, cur) => {
    return result + cur?.quantity;
  }, 0);

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
    await getUserInfo();
    setOpenModal(false);
  };

  console.log(userData);
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
        <div className=" h-56 bg-gray-100 flex items-center justify-center shadow mb-6">
          <div>
            {user?.profile_img ? (
              <img
                src=""
                className="h-20 w-20 mx-auto block rounded-full p-[2px] shadow"
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
              <h3 className="font-medium text-black text-lg capitalize">
                {user?.first_name} {user?.last_name}
              </h3>
              <p className="text-xs text-gray-500 items-center flex gap-1">
                Role:
                <span
                  className={`${
                    type?.number === 0 &&
                    "text-black px-2 p-1 rounded-md text-xs bg-primary-yellow"
                  } 
                ${
                  type?.number === 1 &&
                  "text-white px-2 p-1 rounded-md text-xs bg-indigo-500"
                }
                 ${
                   type?.number === 2 &&
                   "text-white px-2 p-1 rounded-md text-xs bg-primary-red"
                 } 
                 ${
                   type?.number === 3 &&
                   "text-white px-2 p-1 rounded-md text-xs bg-primary-blue"
                 } 
                 ${
                   type?.number === 4 &&
                   "text-white px-2 p-1 rounded-md text-xs bg-emerald-700"
                 }`}
                >
                  {type?.title}
                </span>
              </p>
            </div>
          </div>
        </div>
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
          <div className="shadow p-2 rounded-md bg-white">
            <h4 className=" mb-2 capitalize text-primary-blue font-medium">
              address
            </h4>
            {userData?.address?.length ? (
              <ul className="flex flex-col gap-2 text-gray-600">
                {userData?.address?.map((address) => (
                  <li className="">
                    <MapIcon /> {address?.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-red-400 text-xs">
                User doesn't have any address
              </p>
            )}
          </div>
          <div className="shadow p-2 rounded-md bg-white">
            <h4 className=" mb-2 capitalize text-primary-blue font-medium">
              cart
            </h4>
            <p className="text-gray-500 text-xs">
              {cartLength > 1
                ? "Items"
                : cartLength < 1
                ? "User doesn't have items is his cart"
                : "item"}
            </p>
          </div>
          <div className="shadow p-2 rounded-md bg-white">
            <h4 className=" mb-2 capitalize text-primary-blue font-medium">
              invite
            </h4>
            <p className="text-gray-500 text-xs">
              {userData?.invite?.length > 1
                ? `${userData?.invite?.length} Friends Invited`
                : "User doesn't Invite any friend"}
            </p>
          </div>
          <div className="shadow p-2 rounded-md bg-white">
            <h4 className=" mb-2 capitalize text-primary-blue font-medium">
              like
            </h4>
            {userData?.like?.length > 1
              ? `${userData?.like?.length} Products liked`
              : "There is no like"}
          </div>
          <div className="shadow p-2 rounded-md bg-white">
            <h4 className=" mb-2 capitalize text-primary-blue font-medium">
              point
            </h4>
            {userData?.point?.point > 0
              ? `${userData?.point?.point} Points`
              : "0 Points"}
          </div>
          <div className="shadow p-2 rounded-md bg-white">
            <h4 className=" mb-2 capitalize text-primary-blue font-medium">
              suggestion
            </h4>
            {userData?.suggestion?.length > 1
              ? `User has sent ${userData?.suggestion?.length} suggestions`
              : "There is no suggestion"}
          </div>
          <div className="shadow p-2 rounded-md bg-white">
            <h4 className=" mb-2 capitalize text-primary-blue font-medium">
              ticket
            </h4>
            {userData?.ticket?.length > 1
              ? `User has sent ${userData?.ticket?.length} suggestions`
              : "There is no suggestion"}
          </div>
          <div className="shadow p-2 rounded-md bg-white">
            <h4 className=" mb-2 capitalize text-primary-blue font-medium">
              wallet
            </h4>
            {userData?.wallet?.amount > 0
              ? `${userData?.wallet?.amount} amount`
              : "0 Amount"}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleUser;
