import React from "react";

const Sosmed = ({ title, ...props }) => {
    return <div {...props} className="border border-gray-300 rounded-md text-sm font-semibold text-center py-3">{title}</div>;
};

export default Sosmed;
