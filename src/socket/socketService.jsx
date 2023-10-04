import { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://192.168.10.14:9000");

const setupSocket = () => {
  const [notificationData, setNotificationsData] = useState();
  socket.on("connect", () => {});

  socket.on("admin-notification", (data) => {
    return data;
  });
};

export default setupSocket;
