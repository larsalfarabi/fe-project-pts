import React from "react";

export default function Input({ label, isError, textError, ...props }) {
  return (
    <div>
      <input
        {...props}
        className="my-1 border border-gray-300 rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
        id={label}
      ></input>
      <label htmlFor={label}>{label}</label>
      {isError && <p className="text-sm text-red-500 italic">{textError}</p>}
    </div>
  );
}
