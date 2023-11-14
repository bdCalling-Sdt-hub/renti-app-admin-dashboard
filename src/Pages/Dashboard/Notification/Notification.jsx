import { Col, Modal, Pagination, Row } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import baseAxios from "../../../../Config";
import { Notifications } from "../../../ReduxSlices/NotificationSlice";
import "./Notification.css";

function Notification() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pagination, allNotification } = useSelector(
    (state) => state.NotificationData
  );
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [modalData, setModalData] = useState();
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);

  let token = localStorage.getItem("token");

  const handlePagination = (page) => {
    const data = {
      limit: 8,
      page: page,
    };
    dispatch(Notifications(data));
  };

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
    baseAxios
      .patch(
        `/api/notifications/${data._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const data = {
          limit: 8,
          page: 1,
        };
        dispatch(Notifications(data));
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const commonData = notifications?.allNotification
    ? notifications
    : allNotification;

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

  const onChangePage = (page) => {
    setCurrentPage(page);
    handlePagination(page);
  };

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
              <div style={{ display: "flex", alignItems: "center" }}>
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
                    style={{
                      fontWeight: item.viewStatus ? "normal" : "bold",
                      fontSize: item.viewStatus ? "10px" : "15px",
                    }}
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
      <Row style={{ marginTop: "20px", marginBottom: "30px" }}>
        <Col lg={{ span: 12 }}></Col>
        <Col lg={{ span: 12 }} style={{ textAlign: "right" }}>
          <Pagination
            pageSize={pageSize}
            current={currentPage}
            onChange={onChangePage}
            total={pagination.totalDocuments}
          />
        </Col>
      </Row>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
        width={"50%"}
      >
        <div>
          <h2 style={{ marginBottom: "10px" }}>{modalData?.message}</h2>

          <div>
            <img
              style={{
                borderRadius: "10px",
                width: "100%",
                height: "450px",
                objectFit: "cover",
              }}
              src={modalData?.image}
              alt=""
            />

            <div className=""></div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Notification;
