import NewChat from "@/components/newChat";
import useList from "@/hook/useList";
import { motion } from "framer-motion";
import { Edit, Profile } from "iconsax-react";
import { Monoton } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const monoton = Monoton({
  weight: "400",
  subsets: ["latin"],
});

export default function ChatLayout({ children }) {
  const router = useRouter();
  const { asPath } = router;
  const path = asPath.split("/")[2];
  const { dataUser } = useList();
  const [toggle, setToggle] = useState(false);
  console.log("data User =>", dataUser);
  const active =
    "flex h-[60px] w-full cursor-pointer items-center rounded-md bg-[#252B2E] px-2.5 space-x-4";
  const current =
    "flex h-[60px] w-full cursor-pointer items-center rounded-md hover:bg-[#252B2E]/50 px-2.5 space-x-4";
  return (
    <section className="grid h-screen grid-cols-11 overflow-x-hidden font-mono">
      {toggle && <NewChat setToggle={setToggle} toggle={toggle} />}

      <div className="relative col-span-3 flex flex-col space-y-2 overflow-x-hidden border-r border-r-[#2e2e2e] bg-[#171B1D] pr-1 pt-4">
        <div className="mb-4 flex h-12 w-full items-center justify-between px-2">
          <p
            className={`text-xl font-medium text-gray-200 ${monoton.className} select-none`}
          >
            Chats
          </p>
          <div
            className={
              toggle
                ? "flex h-10 w-[55px] cursor-pointer items-center justify-center rounded-md border border-[#2e2e2e] bg-[#252B2E]/75 text-gray-200"
                : "flex h-10 w-[55px] cursor-pointer items-center justify-center rounded-md text-gray-200 hover:bg-[#252B2E]/75"
            }
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <Edit size="18" />
          </div>
        </div>

        {/* > shadow < */}
        {/* <div className="absolute top-16 z-20 h-2.5 w-full bg-gradient-to-b from-[#171B1D]"></div> */}
        <div className="absolute bottom-0 z-20 h-9 w-full bg-gradient-to-t from-[#171B1D]"></div>

        {/* list user */}
        <div className="flex h-screen w-full flex-col space-y-1 overflow-auto scroll-smooth px-2">
          {dataUser &&
            dataUser?.map((item, index) => {
              return (
                <Link href={`/chat/${item?.nama}`}>
                  <motion.div
                    key={index}
                    className={path == item?.nama ? active : current}
                  >
                    {" "}
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#212529] p-[10px]">
                      <Profile color="#3E454D" variant="Bold" />
                    </div>
                    <p className="mb-3 text-[13px] font-medium capitalize leading-[18px] text-gray-200">
                      {item.nama}
                    </p>
                  </motion.div>
                </Link>
              );
            })}
        </div>
      </div>
      <div className="col-span-8 h-full w-full bg-[#171B1D]">{children}</div>
    </section>
  );
}
