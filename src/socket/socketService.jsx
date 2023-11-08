import { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://192.168.10.14:9000");

const setupSocket = () => {
  const [notificationData, setNotificationsData] = useState();
  socket.on("connect", () => {
    console.log("tusar")
  });

  socket.on("admin-notification", (data) => {
    console.log(data)
  });
};

export default setupSocket;
