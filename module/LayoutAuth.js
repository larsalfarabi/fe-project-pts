export default function AuthLayout({ children }) {
  return (
    <>
      <section className="grid h-screen w-screen grid-cols-5 antialiased ">
        <div className="col-span-3 h-screen w-full bg-[#38A169]"></div>
        <div className="col-span-2 h-screen w-full ">{children}</div>
      </section>
    </>
  );
}
