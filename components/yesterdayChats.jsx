import React from "react";
import dayjs from "dayjs";
import clsx from "clsx";
import { useRouter } from "next/router";
export default function YesterdayChats({ yesterdayChats, dataAuth }) {
  console.log("yesterday =>", yesterdayChats);const router = useRouter();
  const { chat } = router.query;
  return (
    <div>
      {" "}
      {yesterdayChats?.length && (
        <div className="sticky top-0 mb-2 flex w-full items-center justify-center">
          <p className="rounded-[4px] bg-[#212529]/50 px-2 py-1 text-xs text-[#9c9c9c]">
            Yesterday
          </p>
        </div>
      )}
      {yesterdayChats?.map((message, index) => {
        return (
          <div key={index} className="flex flex-col space-y-1">
            {" "}
            {chat === "group" && (
              <p
                className={clsx("ml-4 mt-0.5 text-[10px]", {
                  hidden: message?.sender == dataAuth?.nama,
                  "text-gray-500": message?.sender != dataAuth?.nama,
                })}
              >
                {message?.sender}
              </p>
            )}
            <div
              className={clsx(`mb-1 w-full`, {
                "flex justify-end pr-4": message?.sender == dataAuth?.nama,
                "flex justify-start pl-4": message?.sender != dataAuth?.nama,
              })}
            >
              <div
                className={clsx(
                  "flex items-end gap-5 rounded-bl-lg rounded-br-lg shadow-sm",
                  {
                    "rounded-tl-lg bg-[#48A6C3]":
                      message?.sender == dataAuth?.nama,
                    "rounded-tr-lg bg-[#252B2E]":
                      message?.sender != dataAuth?.nama,
                  }
                )}
              >
                {" "}
                <p
                  className={clsx(
                    "pb-3 pl-2 pt-1.5 text-[13px] leading-[18px] ",
                    {
                      "text-black": message?.sender == dataAuth?.nama,
                      "text-gray-400 shadow-sm":
                        message?.sender != dataAuth?.nama,
                    }
                  )}
                >
                  {message?.message}
                </p>{" "}
                <p
                  className={clsx("mr-2 pb-1 pt-1.5 text-[10px]", {
                    "text-[#205464]": message?.sender == dataAuth?.nama,
                    "text-gray-500": message?.sender != dataAuth?.nama,
                  })}
                >
                  {dayjs(message?.time).format("HH:mm")}
                </p>
              </div>
            </div>
          </div>
        );
      })}{" "}
    </div>
  );
}
