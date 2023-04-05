import Link from "next/link";

export default function AdminLayout({ children }) {
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
  return (
    <>
      <section className="grid grid-cols-6 h-screen w-screen antialiased ">
        
        <div className="w-full col-span-1  h-screen bg-[#38A169] ">
       <div className="pt-10 px-5">
       <h1 className="text-[40px] font-bold">SEKOLAH <span className="text-red-200">KU</span></h1>
       </div>
          <nav className="h-screen sticky top-0 shadow-xl overflow-auto transition-all duration-300 hidden sm:block py-5 px-2">
            <div className="grid grid-cols-1 space-y-5  h-[65px] mb-5">
              {url.map((item, index) => (
                <Link legacyBehavior key={index} href={item.pathname}>
                  <a className="bg-white px-10 py-2 rounded-lg  w-full">
                    {" "}
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </nav>
        </div>
        <div className="w-full col-span-5 h-screen">{children}</div>
      </section>
    </>
  );
}
