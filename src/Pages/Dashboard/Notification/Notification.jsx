import { Col, Modal, Pagination, Row } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import baseAxios from "../../../../Config";
import { Notifications } from "../../../ReduxSlices/NotificationSlice";
import "./Notification.css";

function Notification() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { allNotification } = useSelector((state) => state.NotificationData);
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [modalData, setModalData] = useState();

  console.log("fa", allNotification);

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
    console.log(data._id);
    // axios
    //   .patch(`api/notifications/${data?._id}`, {
    //     headers: {
    //       "Content-type": "application/json",
    //       authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => console.log(res.data))
    //   .catch((err) => console.log(err));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const notificationUpdateHandler = (id) => {
    let token = localStorage.getItem("token");
    baseAxios
      .patch(
        `/api/notifications/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(Notifications());
        // navigate("/booking");
      })
      .catch((err) => console.log(err));
  };

  const commonData = notifications?.allNotification
    ? notifications
    : allNotification;

  // useEffect(() => {
  //   // Connect to server using socket.io-client
  //   let socket = io("http://192.168.10.14:9000");
  //   socket.on("connect", () => {
  //     // Emit events or listen for events here
  //     socket.on("admin-notification", (data) => {
  //       setNotifications(data);
  //     });
  //   });
  //   dispatch(Notifications());
  // }, []);

  function getTimeAgo(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);

    const secondsAgo = Math.floor((now - date) / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const yearsAgo = Math.floor(daysAgo / 365);

    if (yearsAgo > 0) {
      return yearsAgo === 1 ? "1 year ago" : `${yearsAgo} years ago`;
    } else if (daysAgo > 0) {
      return daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;
    } else if (hoursAgo > 0) {
      return hoursAgo === 1 ? "1 hour ago" : `${hoursAgo} hours ago`;
    } else if (minutesAgo > 0) {
      return minutesAgo === 1 ? "1 minute ago" : `${minutesAgo} minutes ago`;
    } else {
      return "just now";
    }
  }

  return (
    <div>
      <Row>
        <h2
          style={{
            fontSize: "25px",
            marginBottom: "30px",
            fontWeight: "normal",
          }}
        >
          All Notifications
        </h2>

        {commonData?.allNotification?.map((item) => {
          return (
            <Col
              className="notification"
              lg={{ span: 24 }}
              style={{
                cursor: "pointer",
              }}
              onClick={() => showModal(item)}
            >
              <div
                onClick={() => notificationUpdateHandler(item._id)}
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className="user-image" style={{ marginRight: "50px" }}>
                  <img
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                    }}
                    src={item.image}
                  />
                </div>
                <div className="">
                  <p
                    style={{ fontWeight: item.viewStatus ? "normal" : "bold" }}
                  >
                    {item.message}
                  </p>
                  <p style={{ color: "gray", marginTop: "10px" }}>
                    {getTimeAgo(item.createdAt)}
                  </p>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col lg={{ span: 12 }}>
          <h1 style={{ fontSize: "20px", color: "#000b90" }}>
            Showing 1-10 OF 250
          </h1>
        </Col>
        <Col lg={{ span: 8, offset: 4 }}>
          <Pagination
            defaultCurrent={1}
            total={50}
            showQuickJumper={false}
            showSizeChanger={false}
          />
        </Col>
      </Row>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
        width={"60%"}
      >
        <div>
          <h2 style={{ marginBottom: "10px" }}>{modalData?.message}</h2>

          <img
            style={{ borderRadius: "10px" }}
            width="100%"
            src={modalData?.image}
            alt=""
          />
        </div>
      </Modal>
    </div>
  );
}

export default Notification;
