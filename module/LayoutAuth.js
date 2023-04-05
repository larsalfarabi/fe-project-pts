export default function AuthLayout({children}) {
    return (
      <>
        <section className="grid grid-cols-5 h-screen w-screen antialiased ">
          <div className="w-full col-span-3 h-screen bg-[#38A169]"></div>
          <div className="w-full col-span-2 h-screen ">{children}</div>
        </section>
      </>
    );
  }
  

  