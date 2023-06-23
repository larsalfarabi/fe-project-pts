import React from "react";

function format(items) {
  if (items?.length === 0) {
    return "";
  } else if (items?.length === 1) {
    return items[0];
  } else {
    const lastItem = items?.pop();
    const formattedItems = items?.join(", ") + ", dan " + lastItem;
    return formattedItems;
  }
}

export default function FormatItemList({ dataGroup, dataAuth, roomCode }) {
  const getMemberList = () => {
    const memberList = dataGroup
      ?.filter((item) => item?.chatRoom === roomCode)
      .map((item) =>
        dataAuth?.nama === item?.member_group?.nama
          ? "Me"
          : item?.member_group?.nama
      );

    return format(memberList);
  };
  return (
    <div>
      <p className="text-xs text-gray-500">{getMemberList()}</p>
    </div>
  );
}
