import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Formik } from "formik";
import * as Yup from "yup";
const socket = io.connect("http://localhost:8080");
const ChatSchema = Yup.object().shape({
  username: Yup.string().required("Wajib di isi"),
  roomCode: Yup.string()
    .min(2, "Password minimal 2 karakter")
    .required("Wajib di isi"),
});
export default function Chat() {
  const [initialValues, setInitialValues] = useState({
    username: "",
    roomCode: "",
  });

  const [showChat, setShowChat] = useState(false);
  const onSubmit = async (values) => {
    let result = await socket.emit("join_room", values);
    setInitialValues(values);
    setShowChat(true);
  };

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (message !== "") {
      console.log(message);
      const messageData = {
        room: initialValues.roomCode,
        author: initialValues.username,
        message: message,
        time: new Date(Date.now()),
      };

      await socket.emit("send_message", messageData);
      setMessage("");
      setMessageList((list) => [...list, messageData]);
    }
  };
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const sendBroadcast = async () => {
    const messageData = {
      author: initialValues.username,
      message: message,
      time: new Date(Date.now()),
    };
    await socket.emit("broadcast", messageData);
    setBroadcastMessage("");
  };
  useEffect(() => {
    socket.on("received_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    socket.on("broadcast_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <React.Fragment>
      <div className="p-5">
        <p className="font-semibold text-lg">{initialValues.username}</p>
        <p className="font-semibold text-lg">{initialValues.roomCode}</p>
        <section>
          {messageList?.map((message, index) => (
            <React.Fragment key={index}>
              {message.author === initialValues.username ? (
                <div className="w-full flex justify-end mb-5">
                  <div className="bg-blue-200 p-2 border rounded-md">
                    {message.message}
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-start mb-5">
                  <div className="bg-green-200 p-2 border rounded-md">
                    {message.message}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
          <div className="grid grid-cols-10 gap-5">
            <div className="col-span-8">
              <input
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                className="border border-collapse w-full py-1"
                type="text"
                fluid
                focus
                placeholder="Ketik"
              />
            </div>
            <div className="col-span-2">
              <button
                fluid
                onClick={sendMessage}
                className="w-full py-2 bg-green-500 rounded"
                content="kirim"
              >
                Simpan
              </button>
            </div>
          </div>
          <div className="grid grid-cols-10 gap-5 mt-3">
            <textarea
              value={broadcastMessage}
              onChange={(e) => {
                setBroadcastMessage(e.target.value);
              }}
              className="border border-collapse col-span-8 py-1"
              placeholder="Ketik..."
            />
            <div className="col-span-2">
              <button
                onClick={sendBroadcast}
                className="w-full py-2 bg-blue-500 rounded"
              >
                Kirim Broadcast
              </button>
            </div>
          </div>
        </section>
      </div>
      {!showChat ? (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={ChatSchema}
          enableReinitialize
        >
          {({
            values,
            handleChange,
            touched,
            errors,
            isSubmitting,
            handleSubmit,
          }) => (
            <div className="flex items-center justify-center mt-5">
              <form onSubmit={handleSubmit}>
                <div className="">
                  <input
                    name="username"
                    value={values.username}
                    className="border"
                    onChange={handleChange}
                    placeholder="Username"
                    type="text"
                    error={errors.username && touched.username}
                  />
                  {errors.username && touched.username && (
                    <p className="text-red-500">{errors.username}</p>
                  )}
                </div>
                <div className="">
                  <input
                    name="roomCode"
                    value={values.roomCode}
                    className="border"
                    onChange={handleChange}
                    placeholder="Room Kode"
                    type="text"
                    error={errors.roomCode && touched.roomCode}
                  />
                  {errors.roomCode && touched.roomCode && (
                    <p className="text-red-500">{errors.roomCode}</p>
                  )}
                </div>
                <button type="submit">Masuk</button>
              </form>
            </div>
          )}
        </Formik>
      ) : (
        <div></div>
      )}
    </React.Fragment>
  );
}
