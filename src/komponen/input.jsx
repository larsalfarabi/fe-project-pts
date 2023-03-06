import React from "react";

function Input({ label, isError, textError, ...props }) {
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
function Search({ nama, value, change, submit }) {
  return (
    <div className="input-wrapper">
      <button className="icon">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Iconly/Regular/Light/Search">
            <g id="Search">
              <circle
                id="Ellipse_739"
                cx="11.7666"
                cy="11.7667"
                r="8.98856"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Line_181"
                d="M18.0183 18.4853L21.5423 22.0001"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </g>
        </svg>
      </button>
      <input
        placeholder="search.."
        onSubmit={submit}
        className="input"
        name={nama}
        type="text"
        value={value}
        onChange={change}
      />
    </div>
  );
}
function Filter() {
  return (
    <div className="w-[40px] h-[40px] rounded-full bg-[#FAFAFA] relative cursor-pointer flex justify-center items-center mx-3">
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-[22px] h-[22px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
          />
        </svg>
      </button>
    </div>
  );
}
export { Input, Search, Filter };
