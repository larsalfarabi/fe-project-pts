import React, { useEffect, useState } from "react";
import useAuth from "@/hook/useAuth";
import { motion } from "framer-motion";
import useList from "@/hook/useList";
import ChatLayout from "@/module/LayoutChat";
import { useRouter } from "next/router";
import { generateCode, getMessageList } from "@/api/chat";
import { socket } from "@/pages/_app";
import ScrollToBottom from "react-scroll-to-bottom";
import dayjs from "dayjs";
import { Profile } from "iconsax-react";
import YesterdayChats from "@/components/yesterdayChats";
import TodayChats from "@/components/todayChats";
import OtherChats from "@/components/otherChats";

export default function Index() {
  const router = useRouter();
  const { nama } = router.query;
  const { dataAuth } = useAuth();

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [code, setCode] = useState("");

  console.log("data auth =>", dataAuth);

  const getCode = async () => {
    setMessageList([]);
    const result = await generateCode(nama);
    console.log("code =>", result);
    let roomCode = result?.data?.code?.chatRoom;
    setCode(roomCode);
    const messageList = await getMessageList(roomCode);
    console.log(messageList);
    setMessageList(messageList?.data?.data);
    await socket.emit("join_room", roomCode);
  };
  useEffect(() => {
    getCode();
    console.log("jalan disini");
  }, [nama]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!!message === false) return;

    const messageData = {
      room: code,
      sender: dataAuth?.nama,
      to: nama,
      time: dayjs(),
      message: message,
    };
    console.log("message_data =>", messageData);
    await socket.emit("send_message", messageData);
    setMessage("");
    setMessageList((previousMessage) => [...previousMessage, messageData]);
  };
  const handleMessageList = async () => {
    socket.on("received_message", (data) => {
      if (data?.to === dataAuth?.nama) {
        console.log("received_message =>", data);
        setMessageList((previousMessage) => [...previousMessage, data]);
      }
    });
  };
  useEffect(() => {
    handleMessageList();
  }, [socket, dataAuth?.nama]);
  console.log("socket =>", socket);
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

  return (
    <ChatLayout>
      <div className="flex h-full flex-col justify-between">
        <div className="flex h-[65px] items-center gap-3 border-b border-b-[#2e2e2e] pl-5">
          {" "}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#212529] p-[9px]">
            <Profile color="#3E454D" variant="Bold" />
          </div>
          <div className="flex flex-col">
            <p
              className={`text-[13px] font-medium capitalize leading-[18px] text-gray-200`}
            >
              {nama}
            </p>

            {!!message && (
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
            )}
          </div>
        </div>
        <ScrollToBottom
          initialScrollBehavior="smooth"
          followButtonClassName="button"
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
