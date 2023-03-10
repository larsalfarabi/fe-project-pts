import React from "react";
import "../styles/styles.css";

// export default function Button({
//   title,
//   color = "red",
//   onClick,
//   name,
//   id,
//   disabled = false,
// }) {
//   return (
//     <React.Fragment>
//       <button
//         onClick={onClick}
//         id={id}
//         name={name}
//         disabled={disabled}
//         style={{
//           backgroundColor: color,
//         }}
//         className="button"
//       >
//         {title}
//       </button>
//     </React.Fragment>
//   );
// }

export default function Button({ title, color, disabled, ...props }) {
  return (
    <React.Fragment>
      <button
        disabled={disabled}
        style={{
          color: color,
          opacity: disabled ? 0.5 : 1,
        }} 
        className="w-full py-3 bg-[#FDC886] rounded-md text-sm font-semibold"
        {...props}
      >
        {title}
      </button>
    </React.Fragment>
  );
}
