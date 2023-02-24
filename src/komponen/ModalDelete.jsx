import React from "react";

const ModalDelete = ({ title, color, margin, subTitle }) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className="text-white h-10 active:bg-pink-600 font-bold uppercase text-sm px-6 rounded  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        style={{
          background: color,
          margin: margin,
        }}
        onClick={() => setShowModal(true)}
      >
        {title}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen">
            <div className="relative w-[30%] my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <div className="relative px-6 pt-6 space-y-3 flex-col flex items-center justify-center ">
                  <svg
                    aria-hidden="true"
                    class="mx-auto mb-4 text-red-600 w-14 h-14"
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
                  <p className="mb-5 text-[17px] font-medium text-gray-600 text-center">
                   Apakah kamu yankin ingin menghapus {subTitle} ini?
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 rounded-b">
                  <button
                    className="text-white bg-emerald-500 active:bg-emerald-600 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    className="text-red-500 bg-white focus:ring-4 focus:outline-none rounded-lg  font-semibold px-5 py-2.5 focus:z-10 "
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ModalDelete;
