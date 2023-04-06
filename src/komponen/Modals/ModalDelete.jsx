import React from "react";

const ModalDelete = ({
  color,
  subTitle,
  onclick,
  width,
  height,
  margin,
  children,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className="items-center flex justify-center rounded text-[13px] font-bold uppercase text-white outline-none transition-all duration-150 ease-linear focus:outline-none active:bg-pink-600"
        type="button"
        style={{
          background: color,
          width: width,
          height: height,
          margin: margin,
        }}
        onClick={() => setShowModal(true)}
      >
        {children}
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex w-screen items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-[30%] max-w-3xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*body*/}
                <div className="relative flex flex-col items-center justify-center space-y-3 px-6 pt-6 ">
                  <svg
                    aria-hidden="true"
                    class="mx-auto mb-4 h-14 w-14 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <p className="mb-5 text-center text-[17px] font-medium text-gray-600">
                    Apakah kamu yankin ingin menghapus{" "}
                    <span className="font-bold">{subTitle}</span> ini?
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center rounded-b p-6">
                  <button
                    className="mr-2 inline-flex items-center rounded-lg bg-emerald-500 px-5 py-2.5 text-center text-sm font-medium text-white active:bg-emerald-600"
                    type="button"
                    onClick={onclick}
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    className="rounded-lg bg-white px-5 py-2.5 font-semibold  text-red-500 focus:z-10 focus:outline-none focus:ring-4 "
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 -inset-x-2 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
};

export default ModalDelete;
