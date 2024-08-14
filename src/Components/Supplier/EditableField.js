import React, { useRef, useState } from "react";

const EditableField = ({ initial }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initial);
  const inputRef = useRef(null);

   const handleEditClick = () => {
     setIsEditing(true);
     setTimeout(() => {
       if (inputRef.current) {
         inputRef.current.select();
       }
     }, 0);
   };


  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="relative">
      {isEditing ? (
        <input
          ref={inputRef}
          type="number"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded w-[80%] lg:w-[40%] px-2"
        />
      ) : (
        <span
          onClick={handleEditClick}
          className="cursor-pointer text-gray-700"
        >
          {text}
        </span>
      )}
      <button
        onClick={handleEditClick}
        className="max-lg:hidden rotate-90 absolute -top-2 right-12 mt-1 mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:text-blue-500 hover:bg-white border border-blue-500"
      >
        ✎
      </button>
    </div>
  );
};

export default EditableField;
