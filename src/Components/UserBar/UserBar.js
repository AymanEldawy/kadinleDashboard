import React, { useState } from "react";
import { Link } from "react-router-dom";

import { logout } from "../../Api/auth";
import { useGlobalOptions } from "../../Context/GlobalOptions";

const UserBar = () => {
  const { user } = useGlobalOptions();
  const [open, setOpen] = useState(false);
  console.log(user);
  const fullName =
    user?.user_metadata?.first_name + " " + user?.user_metadata?.last_name;
  return (
    <div className="relative">
      <button
        type="button"
        className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
        onClick={() => setOpen((p) => !p)}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src={
            user?.profile_img ||
            "https://flowbite.com/docs/images/people/profile-picture-3.jpg"
          }
          alt="user Avatar"
        />
      </button>
      {open ? (
        <div
          className="h-full w-full bg-[#0002] fixed top-0 left-0 z-10"
          onClick={() => setOpen(false)}
        >
          <div
            className="z-50 absolute right-0 top-6  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                {fullName || "Default name"}
              </span>
              <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                {user?.email || "example@example.com"}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to={`/update/user/${user?.id}`}
                  className="block px-4 whitespace-nowrap py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Update profile
                </Link>
              </li>
              <li>
                <button
                  onClick={async () => logout()}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserBar;
