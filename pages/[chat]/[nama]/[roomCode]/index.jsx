import React, { useEffect, useState } from "react";
import useAuth from "@/hook/useAuth";
import ChatLayout from "@/module/LayoutChat";
import { useRouter } from "next/router";
import { getMessageGroup, getMessageList } from "@/api/chat";
import { socket } from "@/pages/_app";
import ScrollToBottom from "react-scroll-to-bottom";
import dayjs from "dayjs";
import { Profile, Profile2User } from "iconsax-react";
import YesterdayChats from "@/components/yesterdayChats";
import TodayChats from "@/components/todayChats";
import OtherChats from "@/components/otherChats";
import useListGroup from "@/hook/useListGroup";
import FormatItemList from "@/components/formatItemList";

export default function Index() {
  const router = useRouter();
  const { nama, roomCode, chat } = router.query;
  const { dataAuth } = useAuth();
  const { dataGroup } = useListGroup();
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [code, setCode] = useState("");

  useEffect(() => {
    const handleGetMessage = async () => {
      try {
        setMessageList([]);
        setCode(roomCode);
        const messageList = await (chat === "chat"
          ? getMessageList(roomCode)
          : getMessageGroup(roomCode));
        console.log("messageList", messageList);
        setMessageList(messageList?.data?.data);
        await socket.emit("join_room", roomCode);
      } catch (error) {
        console.log("error =>", error);
      }
    };

    handleGetMessage();
    console.log("jalan disini");
  }, [nama, roomCode, chat]);

  useEffect(() => {
    const handleMessage = (data) => {
      setMessageList((previousMessage) => [...previousMessage, data]);
      console.log("received_message =>", data);
    };

    const messageEvent =
      chat === "chat" ? "received_message" : "received_message_group";
    socket.on(messageEvent, handleMessage);

    return () => {
      socket.off(messageEvent, handleMessage);
    };
  }, [socket, dataAuth?.nama, chat]);
  function separateChatsByDay(chats) {
    const today = dayjs().startOf("day");
    const yesterday = today.subtract(1, "day").startOf("day");

    return chats.reduce((result, chat) => {
      const chatDate = dayjs(chat?.time).startOf("day");

      if (chatDate.isSame(today, "day")) {
        const todayChats = result.todayChats || [];
        return { ...result, todayChats: [...todayChats, chat] };
      }

      if (chatDate.isSame(yesterday, "day")) {
        const yesterdayChats = result.yesterdayChats || [];
        return { ...result, yesterdayChats: [...yesterdayChats, chat] };
      }

      const otherChats = result.otherChats || [];
      return { ...result, otherChats: [...otherChats, chat] };
    }, {});
  }

  const separatedChats = separateChatsByDay(messageList);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!!message) return;

    const messageData = {
      room: code,
      sender: dataAuth?.nama,
      to: nama,
      time: dayjs(),
      message: message,
    };
    console.log("message_data =>", messageData);
    const event = chat === "chat" ? "send_message" : "send_message_group";
    await socket.emit(event, messageData);

    setMessage("");
    setMessageList((previousMessage) => [...previousMessage, messageData]);
  };

  return (
    <ChatLayout>
      <div className="flex h-full flex-col justify-between">
        <div className="flex h-[65px] items-center gap-3 border-b border-b-[#2e2e2e] pl-5">
          {" "}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#212529] p-[9px]">
            {chat === "group" ? (
              <Profile2User color="#3E454D" variant="Bold" />
            ) : (
              <Profile color="#3E454D" variant="Bold" />
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <p
              className={`text-[13px] font-medium capitalize leading-[18px] text-gray-200`}
            >
              {nama}
            </p>
            <div className="flex space-x-1">
              {chat === "group" && (
                <FormatItemList
                  dataGroup={dataGroup}
                  dataAuth={dataAuth}
                  roomCode={roomCode}
                />
              )}
            </div>
            {/* {!!message && (
              <div className="flex">
                <motion.p
                  initial={{ x: -5, opacity: 0 }}
                  animate={{ x: 1, opacity: [0, 1, 0.5, 1] }}
                  transition={{
                    // delay: 0.01,
                    bounce: 0.1,
                    type: "spring",
                    duration: 0.5,
                    // repeat: 100000000,
                  }}
                  className="mt-0.5 flex text-xs text-[#48A6C3]"
                >
                  Typing{" "}
                  <div className="mb-0.5 ml-0.5 flex items-end justify-center space-x-1">
                    {[1, 2, 3].map((i) => (
                      <div className="h-[3px] w-[3px] animate-pulse rounded-full dark:bg-[#48A6C3]"></div>
                    ))}
                  </div>
                </motion.p>{" "}
              </div>
            )} */}
          </div>
        </div>
        <ScrollToBottom
          initialScrollBehavior="smooth"
          mode="bottom"
          className="flex h-[479px] w-full scroll-m-1 flex-col overflow-auto scroll-smooth bg-[#0A0E0F] py-4"
        >
          {/* other */}
          <OtherChats
            otherChats={separatedChats.otherChats}
            dataAuth={dataAuth}
          />
          {/* Yesterday */}
          <YesterdayChats
            yesterdayChats={separatedChats.yesterdayChats}
            dataAuth={dataAuth}
          />

          {/* Today */}
          <TodayChats
            todayChats={separatedChats.todayChats}
            dataAuth={dataAuth}
          />
        </ScrollToBottom>

        <div className="flex border-t border-t-[#2e2e2e] bg-[#171B1D] p-3">
          <form action="" onSubmit={sendMessage} className="w-full">
            <input
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
              type="text"
              placeholder="Your message..."
              className={`w-full rounded-xl bg-[#202426] py-4 pl-5 pr-20 text-[13px] leading-[18px] text-white shadow placeholder:text-gray-500 focus:outline-none`}
            />
          </form>
        </div>
      </div>
    </ChatLayout>
  );
}
