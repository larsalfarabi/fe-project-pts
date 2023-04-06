import React from "react";

const InputPassword = ({ label, isError, textError, ...props }) => {
  const [changePassword, setChangePassword] = React.useState(true);
  const changeIcon = changePassword === true ? false : true;
  return (
    <div className="relative">
      <input
        {...props}
        className="my-1 w-full rounded-md border border-gray-300 px-4 py-3 text-sm font-medium placeholder:text-sm placeholder:font-medium placeholder:text-gray-500 focus:border focus:border-gray-400 focus:outline-none"
        id={label}
        type={changeIcon ? "text" : "password"}
      ></input>
      <p
        onClick={() => {
          setChangePassword(changeIcon);
        }}
        className="absolute right-4 top-5 cursor-pointer text-[13px] font-medium"
      >
        {changeIcon ? "Sembunyikan" : "Tunjukan"}
      </p>
      {isError && <p className="text-sm italic text-red-500">{textError}</p>}
    </div>
  );
};

export default InputPassword;
