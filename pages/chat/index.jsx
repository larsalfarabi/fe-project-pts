import ChatLayout from "@/module/LayoutChat";
import React from "react";


export default function Index() {
  return (
    <ChatLayout>
      <div className="flex h-full w-full flex-col items-center justify-center space-y-2">
        <p className="text-lg font-medium text-gray-200">
          Welcome To Chat
        </p>
        <p className="text-[13px] leading-4 text-gray-500">
          Click on a contact to view their message updates
        </p>
      </div>
    </ChatLayout>
  );
}
