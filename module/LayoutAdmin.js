import Link from "next/link";
import useAuth from "@/hook/useAuth";
import useList from "@/hook/useListUser";
export default function AdminLayout({ children }) {
  const { isFetchingAuth } = useAuth();
  const { dataUser } = useList();
  console.log("data User =>", dataUser);
  const url = [
    {
      pathname: "/admin/data-siswa",
      name: "Data Siswa",
    },

    {
      pathname: "/admin/data-kelas",
      name: "Data Kelas",
    },
    {
      pathname: "/admin/data-petugas",
      name: "Data Petugas",
    },
    {
      pathname: "/admin/data-spp",
      name: "Data SPP",
    },
  ];
  if (isFetchingAuth) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <section className="grid h-screen w-screen grid-cols-10 overflow-hidden antialiased">
        <div className="col-span-2 h-full w-full bg-[#38A169] ">
          <div className="px-5 pt-10">
            <h1 className="text-[40px] font-bold">
              SEKOLAH <span className="text-red-200">KU</span>
            </h1>
          </div>
          <nav className="sticky top-0 hidden h-full overflow-auto px-2 py-5 shadow-xl transition-all duration-300 sm:block">
            <div className="mb-5 grid h-[65px]  grid-cols-1 space-y-5">
              {url.map((item, index) => (
                <Link legacyBehavior key={index} href={item.pathname}>
                  <a className="w-full rounded-lg bg-white px-10  py-2">
                    {" "}
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </nav>
        </div>
        <div className="background-image col-span-8 h-full w-full">
          {children}
        </div>
      </section>
    </>
  );
}
