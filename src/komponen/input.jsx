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
function Search() {
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
      <input placeholder="search.." className="input" name="text" type="text" />
    </div>
  );
}
function Filter() {
  return (
    <div className="w-[40px] h-[40px] rounded-full bg-[#FAFAFA] relative cursor-pointer flex justify-center items-center">
      <button>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Iconly/Regular/Light/Filter 3">
            <g id="Filter">
              <path
                id="Stroke 1"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.56517 3.00012C3.70108 3.00012 3 3.71299 3 4.59052V5.52656C3 6.17659 3.24719 6.8017 3.68936 7.27189L8.5351 12.4244L8.53723 12.4212C9.47271 13.3789 9.99905 14.6735 9.99905 16.0234V20.5953C9.99905 20.9008 10.3187 21.0958 10.584 20.9517L13.3436 19.448C13.7602 19.2205 14.0201 18.7785 14.0201 18.2985V16.0115C14.0201 14.6692 14.539 13.38 15.466 12.4244L20.3117 7.27189C20.7528 6.8017 21 6.17659 21 5.52656V4.59052C21 3.71299 20.3 3.00012 19.4359 3.00012H4.56517Z"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
}
export { Input, Search,Filter };
