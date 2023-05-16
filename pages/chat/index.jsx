import React, { useState } from "react";
import useAuth from "@/hook/useAuth";
import { motion } from "framer-motion";
import { Send2 } from "iconsax-react";
import useList from "@/hook/useList";
import ChatLayout from "@/module/LayoutChat";
export default function Index() {
  const { dataAuth } = useAuth();
  const { dataUser } = useList();
  console.log("data User =>", dataUser);
  console.log("data auth =>", dataAuth);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  let [message, setMessage] = useState("");
  return (
    <ChatLayout>
      <div className="flex flex-col justify-between h-full ">
        <div className="flex gap-3 p-5 bg-white items-center border-l-0 border-b">
          <motion.p
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: [0, 1, 0.5, 1] }}
            transition={{
              delay: 0.2,
              bounce: 0.1,
              type: "spring",
              duration: 1,
            }}
            className={`text-sm font-medium text-black`}
          >
            {dataAuth?.nama}
          </motion.p>{" "}
        </div>
        <div className="px-2 pb-0.5 flex justify-end items-end h-full">
          <div className="rounded-bl-xl rounded-tl-xl rounded-br-xl shadow-md shadow-slate-200 bg-green-200 p-3 max-w-sm">
            {message}
          </div>
        </div>

        <div className="flex h-[84px] p-4 mt-4 bg-white rounded-tl-2xl rounded-tr-2xl border-t-[1.5px]">
          <div className="relative w-full">
            <input
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
              type="text"
              placeholder="Your message..."
              className={`rounded-xl bg-[#F5F5F5] w-full pl-5 pr-20 py-4 placeholder:text-gray-400 text-sm focus:outline-none`}
            />
            <div className="bottom-0 right-0 w-20 absolute flex h-[43px]">
              <p className="text-xl text-gray-300 select-none">|</p>
              <Send2
                onClick={() => {
                  setMessage;
                }}
                size="24"
                variant="Bold"
                color="#38A169"
                className="cursor-pointer w-full mt-[5px] "
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
}
