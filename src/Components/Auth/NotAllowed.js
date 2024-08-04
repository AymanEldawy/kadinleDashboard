import React from "react";
import { LockIcon } from "../../Helpers/Icons";
import { Link } from "react-router-dom";
import BlockPaper from "../BlockPaper/BlockPaper";

const NotAllowed = () => {
  return (
    <div className="mx-auto max-w-xl">
      <BlockPaper>
        <div className="flex gap-8">
          <div className="bg-red-300 p-4 shadow rounded-md flex items-center">
            <LockIcon className="w-16 text-red-700" />
          </div>
          <div>
            <h1 className="font-semibold mb-2 md:text-4xl text-primary-red">Oops!</h1>
            <p className="text-medium capitalize text-red-500 mb-4">you're no authorized to access this page</p>
            <Link to="/" className="text-primary-blue text-xs underline">Back to home</Link>
          </div>
        </div>
      </BlockPaper>
    </div>
  );
};

export default NotAllowed;
