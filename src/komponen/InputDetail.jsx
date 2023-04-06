import React from "react";

const InputDetail = ({ label, ...props }) => {
  return (
    <div className="flex flex-col space-y-1">
      {" "}
      <label htmlFor={label} className="text-[15px] font-semibold capitalize">
        {label}
      </label>
      <input
        {...props}
        id={label}
        type="text"
        className="rounded-md border border-gray-200 px-3 py-2.5 text-sm font-medium focus:outline-none"
      />
    </div>
  );
};

export default InputDetail;
