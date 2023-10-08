import { Col, Modal, Pagination, Row } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Notification.css";

function Notification() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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

        {[...Array(5).keys()].map((_, index) => {
          return (
            <Col
              className="notification"
              lg={{ span: 24 }}
              style={{ cursor: "pointer" }}
              onClick={showModal}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="user-image" style={{ marginRight: "50px" }}>
                  <img
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                    }}
                    src="https://siffahim.github.io/MetaCGI-Tailwind/images/2.jpg"
                  />
                </div>
                <div className="">
                  <p>
                    <span style={{ fontWeight: "bold" }}>Professor Sergio</span>{" "}
                    start a new trip at 5pm. Trip No.56. Trip started from
                    Mexico city.....
                  </p>
                  <p style={{ color: "gray", marginTop: "10px" }}>1hr ago</p>
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
          <h2 style={{ marginBottom: "10px" }}>Trip offer from 5pm to 10pm</h2>
          <p style={{ marginBottom: "20px" }}>
            God implore long followed demons angels, all fowl god hopes
            forgiveness. Bird my from if the no perched but silken. And sent
            liftednevermore nothing whispered soul but me, oh the surely only
            usby from horror then more usby. Before gave then now the whose
            name, word hope the yet floor master wide more, louder ebony engaged
            there door echo. Tempest mystery eyes and that sure let both. But
            wandering and implore velvet only, if sent or it me but my. Thy
            desert his upon is its the though my, at let thee devil that when
            grew. Word usby i was.
          </p>
          <img
            style={{ borderRadius: "10px" }}
            width="100%"
            src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=1200"
            alt=""
          />
        </div>
      </Modal>
    </div>
  );
}

export default Notification;
