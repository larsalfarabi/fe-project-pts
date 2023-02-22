import React from "react";

const InputPassword = ({ label, isError, textError, ...props }) => {
  const [changePassword, setChangePassword] = React.useState(true);
  const changeIcon = changePassword === true ? false : true;
  return (
    <div className="relative">
      <input
        {...props}
        className="my-1 border border-gray-300 rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
        id={label}
        type={changeIcon ? "text" : "password"}
      ></input>
      <p
        onClick={() => {
          setChangePassword(changeIcon);
        }}
        className="absolute right-4 top-5 cursor-pointer text-[13px] font-medium"
      >
        {changeIcon ? "Hide" : "Show"}
      </p>
      {isError && <p className="text-sm text-red-500 italic">{textError}</p>}
    </div>
  );
};

export default InputPassword;
