import Link from "next/link";
import useAuth from "@/hook/useAuth";
import useList from "@/hook/useList";
export default function ChatLayout({ children }) {
  const { isFetchingAuth } = useAuth();
  const { dataUser } = useList();
  console.log("data User =>", dataUser);
  const url = [
    {
      pathname: "data-siswa",
      name: "Data Siswa",
    },

    {
      pathname: "data-kelas",
      name: "Data Kelas",
    },
    {
      pathname: "data-petugas",
      name: "Data Petugas",
    },
    {
      pathname: "data-spp",
      name: "Data SPP",
    },
  ];
  if (isFetchingAuth) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <section className="grid grid-cols-10 h-screen w-screen antialiased overflow-hidden">
        <div className="h-full w-full col-span-2 bg-white px-2 py-4 space-y-2 border-r">
          {dataUser &&
            dataUser.data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-12 rounded-md hover:bg-gray-50 flex items-start py-2 px-2.5 cursor-pointer"
                >
                  <p className="text-gray-600 font-semibold text-[13px] capitalize">
                    {item.nama}
                  </p>
                </div>
              );
            })}
        </div>
        <div className="w-full col-span-8 h-full background-image">
          {children}
        </div>
      </section>
    </>
  );
}
