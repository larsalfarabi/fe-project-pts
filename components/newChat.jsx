import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ArrowLeft, Profile, Profile2User } from "iconsax-react";
import useList from "@/hook/useList";

export default function NewChat({ toggle, setToggle }) {
  const router = useRouter();
  const { dataUser } = useList();
  console.log("new chat =>", dataUser);
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="absolute z-10 h-[370px] w-[290px] rounded-md border border-[#2e2e2e] bg-[#171B1D]"
      animate={{ y: toggle ? 65 : 0, x: 295 }}
      initial={{ y: 0, x: 295 }}
      transition={{ duration: 0.75, type: "spring" }}
    >
      {" "}
      {open && <GroupName setOpen={setOpen} open={open} />}
      <p className="mx-3 my-2 text-gray-200">New chat</p>
      {/* > shadow < */}
      <div className="absolute bottom-0 h-[50px] w-full bg-gradient-to-t from-[#171B1D] p-3"></div>
      <div className="flex h-[315px] w-full flex-col space-y-1 overflow-auto scroll-smooth p-2">
        <div
          className="flex h-11 w-full cursor-pointer items-center space-x-4 rounded-[4px] px-2 py-3 hover:bg-[#252B2E]/50"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#48A6C3] p-2">
            <Profile2User color="black" variant="Outline" />
          </div>{" "}
          <p className="text-[13px] text-xs leading-[18px] text-gray-200">
            New group
          </p>
        </div>
        <div className="sticky -top-[10px] bg-[#171B1D] px-1 py-2">
          <p className="text-xs text-gray-500">All contacts</p>
        </div>

        {dataUser?.map((item, index) => {
          return (
            <motion.div
              key={index}
              onClick={() => {
                setToggle(!toggle);
                return router.push(`/chat/${item?.nama}`);
              }}
              className="flex h-11 w-full cursor-pointer items-center space-x-4 rounded-[4px] px-2 py-3 hover:bg-[#252B2E]/50"
            >
              {" "}
              <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#212529] p-2">
                <Profile color="#3E454D" variant="Bold" />
              </div>
              <p className="text-[13px] font-medium capitalize leading-[18px] text-gray-200">
                {item.nama}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function SelectContact({ setOpen, open, dataUser }) {
  return (
    <motion.div
      animate={{
        y: -1,
        x: -1,
      }}
      initial={{ y: -1, x: 50 }}
      transition={{ duration: 0.75, type: "spring" }}
      className="absolute z-20 h-[370px] w-[290px] rounded-md border border-[#2e2e2e] bg-[#171B1D] p-2"
    >
      {" "}
      <div className="flex items-center">
        <div
          className="flex h-9 w-10 items-center justify-center rounded-md hover:bg-[#252B2E]/75"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <ArrowLeft className="text-gray-200" size={18} />
        </div>
        <p className="mx-3 text-gray-200">New Group</p>
      </div>{" "}
      <div className="flex h-[315px] w-full flex-col overflow-auto scroll-smooth">
        <div className="sticky top-0 bg-[#171B1D] px-1 py-2">
          <p className="text-xs text-gray-500">Select contacts</p>
        </div>
        {dataUser?.map((item, index) => {
          return (
            <motion.div
              key={index}
              onClick={() => {
                setToggle(!toggle);
                return router.push(`/chat/${item?.nama}`);
              }}
              className="flex h-11 w-full cursor-pointer items-center space-x-4 rounded-[4px] px-2 py-3 hover:bg-[#252B2E]/50"
            >
              {" "}
              <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#212529] p-2">
                <Profile color="#3E454D" variant="Bold" />
              </div>
              <p className="text-[13px] font-medium capitalize leading-[18px] text-gray-200">
                {item.nama}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function GroupName({ setOpen, open }) {
  const [unlocked, setUnlocked] = useState(false);
  return (
    <motion.div
      animate={{
        y: -1,
        x: -1,
      }}
      initial={{ y: -1, x: 50 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="absolute z-20 flex h-[370px] w-[290px] flex-col justify-between rounded-md border border-[#2e2e2e] bg-[#171B1D] p-2"
    >
      {" "}
      <div className="space-y-8">
        <div className="flex items-center">
          <div
            className="flex h-8 w-9 items-center justify-center rounded-md hover:bg-[#252B2E]/75"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <ArrowLeft className="text-gray-200" size={18} />
          </div>
          <p className="mx-3 text-gray-200">New Group</p>
        </div>{" "}
        <div className="space-y-1.5">
          {" "}
          <label htmlFor="nama" className="text-xs text-gray-200 ">
            Provide a group subject
          </label>
          <input
            type="text"
            id="nama"
            className=" w-full rounded border-b border-gray-400 bg-[#252B2E] p-2 text-xs text-gray-200 outline-none placeholder:text-xs focus:border-b-2 focus:border-[#48A6C3] focus:bg-[#252B2E]/25"
            placeholder="Enter a subject"
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-2">
        <div
          className="flex w-full items-center justify-center rounded bg-[#48A6C3] py-1 text-sm text-black"
          onClick={() => {}}
        >
          Next
        </div>
        <div className="flex w-full items-center justify-center rounded bg-[#252B2E] py-1 text-sm text-gray-200">
          Cencel
        </div>
      </div>
    </motion.div>
  );
}
