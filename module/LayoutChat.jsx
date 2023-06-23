import { generateCode, getMessageList } from "@/api/chat";
import NewChat from "@/components/newChat";
import useAuth from "@/hook/useAuth";
import useListGroup from "@/hook/useListGroup";
import useListUser from "@/hook/useListUser";
import { socket } from "@/pages/_app";
import { motion } from "framer-motion";
import { Edit, Profile, Profile2User } from "iconsax-react";
import { Monoton } from "next/font/google";
import { useRouter } from "next/router";
import { useState } from "react";

const monoton = Monoton({
  weight: "400",
  subsets: ["latin"],
});

export default function ChatLayout({ children }) {
  const router = useRouter();
  const { asPath } = router;
  const { dataAuth } = useAuth();
  const { dataGroup } = useListGroup();
  const { dataUser } = useListUser();

  const pathGroup = asPath.split("/")[3];
  const pathChat = asPath.split("/")[2];
  const [toggle, setToggle] = useState(false);

  const active =
    "flex h-[60px] w-full cursor-pointer items-center rounded-md bg-[#252B2E] px-2.5 space-x-4";
  const current =
    "flex h-[60px] w-full cursor-pointer items-center rounded-md hover:bg-[#252B2E]/50 px-2.5 space-x-4";
  return (
    <section className="grid h-screen grid-cols-11 overflow-x-hidden font-mono">
      {toggle && <NewChat setToggle={setToggle} toggle={toggle} />}

      <div className="relative col-span-3 flex flex-col  overflow-x-hidden border-r border-r-[#2e2e2e] bg-[#171B1D] pr-1 pt-4">
        <div className="mb-2 flex h-12 w-full items-center justify-between px-2">
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
        <div className="flex h-screen w-full flex-col overflow-auto scroll-smooth px-2">
          {" "}
          {dataGroup?.length ? (
            <p className="sticky top-0 bg-[#171B1D] py-2 text-xs text-gray-500">
              Group
            </p>
          ) : (
            <p></p>
          )}
          <div className="space-y-1 ">
            {dataGroup?.map((item, index) => {
              if (item?.member === dataAuth?.id) {
                return (
                  <div
                    onClick={async () => {
                      await socket.emit("join_room", item?.chatRoom);
                      return router.push(
                        `/group/${item?.nama_group?.nama}/${item?.chatRoom}`
                      );
                    }}
                    key={index}
                  >
                    <motion.div
                      className={
                        pathGroup === item?.chatRoom ? active : current
                      }
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#212529] p-[10px]">
                        <Profile2User color="#3E454D" variant="Bold" />
                      </div>
                      <p className="mb-3 text-[13px] font-medium capitalize leading-[18px] text-gray-200">
                        {item?.nama_group?.nama}
                      </p>
                    </motion.div>
                  </div>
                );
              }
            })}
          </div>
          {dataUser?.length && (
            <p className="sticky top-0 bg-[#171B1D] py-2 text-xs text-gray-500">
              Contact
            </p>
          )}{" "}
          <div className="space-y-1 ">
            {dataUser &&
              dataUser?.map((item, index) => {
                return (
                  <div
                    onClick={async () => {
                      const result = await generateCode(item?.nama);
                      console.log("code =>", result);

                      let roomCode = result?.data?.code?.chatRoom;

                      await socket.emit("join_room", roomCode);
                      return router.push(`/chat/${item?.nama}/${roomCode}`);
                    }}
                  >
                    <motion.div
                      key={index}
                      className={pathChat == item?.nama ? active : current}
                    >
                      {" "}
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#212529] p-[10px]">
                        <Profile color="#3E454D" variant="Bold" />
                      </div>
                      <p className="mb-3 text-[13px] font-medium capitalize leading-[18px] text-gray-200">
                        {item.nama}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="col-span-8 h-full w-full bg-[#171B1D]">{children}</div>
    </section>
  );
}
