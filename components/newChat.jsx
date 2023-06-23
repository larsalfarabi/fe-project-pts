import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Profile } from "iconsax-react";
import { Checkbox } from "@chakra-ui/react";
import { createGroup } from "@/api/chat";
import useListUser from "@/hook/useListUser";
import { useQueryClient } from "react-query";
import clsx from "clsx";
import useListGroup from "@/hook/useListGroup";

export default function NewChat({ toggle, setToggle }) {
  const [nama, setNama] = useState("");
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState([]);
  const { dataUser } = useListUser();
  const {refetchGroup} = useListGroup();
  const queryClient = useQueryClient();
  console.log("new chat =>", dataUser);

  const handleCreateGroup = async () => {
    await createGroup(nama, select);
    queryClient.invalidateQueries({ queryKey: ['/group/list'] }); // Memperbarui data grup setelah membuat grup baru
    setOpen(!open);
    setToggle(!toggle);
    return refetchGroup();
  };
  return (
    <motion.div
      animate={{ y: toggle ? 65 : 0, x: 295 }}
      initial={{ y: 0, x: 295 }}
      transition={{ duration: 0.75, type: "spring" }}
      className="absolute z-20 flex h-[370px] w-[290px] flex-col justify-between rounded-md border border-[#2e2e2e] bg-[#171B1D] p-2"
    >
      {open && (
        <motion.div
          animate={{
            y: -9,
            x: -9,
          }}
          initial={{ y: -10, x: 50 }}
          transition={{ duration: 0.25, type: "spring" }}
          className="absolute z-20 h-[370px] w-[290px] rounded-md border border-[#2e2e2e] bg-[#171B1D] p-2"
        >
          {" "}
          <div className="flex items-center">
            <div
              className="flex h-8 w-9 items-center justify-center rounded-md hover:bg-[#252B2E]/75"
              onClick={() => {
                setNama("");
                setOpen(!open);
              }}
            >
              <ArrowLeft className="text-gray-200" size={18} />
            </div>
            <p className="mx-3 text-gray-200">New Group</p>{" "}
          </div>{" "}
          <p className="px-1 py-2 text-xs text-gray-500">Select contacts</p>{" "}
          <div className="absolute bottom-12 right-[0.5px] h-[50px] w-full bg-gradient-to-t from-[#171B1D]"></div>
          <div className="flex h-[240px] w-full flex-col overflow-auto scroll-smooth">
            {dataUser?.map((item, index) => {
              return (
                <motion.div
                  key={index}
                  className="flex h-11 w-full cursor-pointer items-center justify-between rounded-[4px] px-2 py-3 hover:bg-[#252B2E]/50"
                >
                  {" "}
                  <div className="flex items-center space-x-3">
                    {" "}
                    <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#212529] p-2">
                      <Profile color="#3E454D" variant="Bold" />
                    </div>
                    <p className="text-[13px] font-medium capitalize leading-[18px] text-gray-200">
                      {item.nama}
                    </p>
                  </div>
                  <Checkbox
                    colorScheme="linkedin"
                    onChange={(e) => {
                      if (select.includes(item?.id)) {
                        let filtered = select?.filter(
                          (group) => group !== item?.id
                        );
                        console.log("group =>", filtered);
                        setSelect(filtered);
                      } else {
                        setSelect([...select, item?.id]);
                      }
                      console.log(select.includes(item?.id));
                    }}
                    isChecked={select.includes(item?.id)}
                  />
                </motion.div>
              );
            })}
          </div>{" "}
          <div className="mt-5 grid w-full grid-cols-2 gap-2">
            <button
              className="flex w-full cursor-pointer items-center justify-center rounded bg-[#48A6C3] py-1 text-sm text-black"
              onClick={handleCreateGroup} // Memanggil fungsi handleCreateGroup saat tombol Create ditekan
            >
              Create
            </button>
            <button
              onClick={() => {
                setNama("");
                setOpen(!open);
              }}
              className="flex w-full items-center justify-center rounded bg-[#252B2E] py-1 text-sm text-gray-200">
              Cencel
            </button>
          </div>
        </motion.div>
      )}{" "}
      <div className="space-y-8">
        <div className="flex items-center">
          <div
            className="flex h-8 w-9 items-center justify-center rounded-md hover:bg-[#252B2E]/75"
            onClick={() => {
              setToggle(!toggle);
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
            name="nama"
            value={nama}
            onChange={(e) => {
              setNama(e.target.value);
            }}
            className=" w-full rounded border-b border-gray-400 bg-[#252B2E] p-2 text-xs text-gray-200 outline-none placeholder:text-xs focus:border-b-2 focus:border-[#48A6C3] focus:bg-[#252B2E]/25"
            placeholder="Enter a subject"
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-2">
        <button
          className={clsx("flex w-full items-center justify-center rounded  py-1 text-sm text-black", {
            "bg-[#48A6C3]/50 cursor-not-allowed": nama == "",
            "bg-[#48A6C3] cursor-pointer ": nama != "",
          })}
          onClick={() => {
            setNama(nama);
            setOpen(!open);
          }}
         disabled={nama.trim() === ''}
        >
          Next
        </button>
        <button onClick={() => {
          setToggle(!toggle);
        }} className="flex w-full items-center justify-center rounded bg-[#252B2E] py-1 text-sm text-gray-200">
          Cencel
        </button>
      </div>
    </motion.div>
  );
}

// <motion.div
//   className="absolute z-10 h-[370px] w-[290px] rounded-md border border-[#2e2e2e] bg-[#171B1D]"
//   animate={{ y: toggle ? 65 : 0, x: 295 }}
//   initial={{ y: 0, x: 295 }}
//   transition={{ duration: 0.75, type: "spring" }}
// >
//   {" "}
//   {open && <GroupName setOpen={setOpen} open={open} />}
//   <p className="mx-3 my-2 text-gray-200">New chat</p>
//   {/* > shadow < */}
//   <div className="absolute bottom-0 h-[50px] w-full bg-gradient-to-t from-[#171B1D] p-3"></div>
//   <div className="flex h-[315px] w-full flex-col space-y-1 overflow-auto scroll-smooth p-2">
//     <div
//       className="flex h-11 w-full cursor-pointer items-center space-x-4 rounded-[4px] px-2 py-3 hover:bg-[#252B2E]/50"
//       onClick={() => {
//         setOpen(!open);
//       }}
//     >
//       <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#48A6C3] p-2">
//         <Profile2User color="black" variant="Outline" />
//       </div>{" "}
//       <p className="text-[13px] text-xs leading-[18px] text-gray-200">
//         New group
//       </p>
//     </div>
//     <div className="sticky -top-[10px] bg-[#171B1D] px-1 py-2">
//       <p className="text-xs text-gray-500">All contacts</p>
//     </div>

//     {dataUser?.map((item, index) => {
//       return (
//         <motion.div
//           key={index}
//           onClick={() => {
//             setToggle(!toggle);
//             return router.push(`/chat/${item?.nama}`);
//           }}
//           className="flex h-11 w-full cursor-pointer items-center space-x-4 rounded-[4px] px-2 py-3 hover:bg-[#252B2E]/50"
//         >
//           {" "}
//           <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#212529] p-2">
//             <Profile color="#3E454D" variant="Bold" />
//           </div>
//           <p className="text-[13px] font-medium capitalize leading-[18px] text-gray-200">
//             {item.nama}
//           </p>
//         </motion.div>
//       );
//     })}
//   </div>
// </motion.div>;
