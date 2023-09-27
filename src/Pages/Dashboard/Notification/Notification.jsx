import { Col, Divider, Pagination, Row } from "antd";
import React from "react";
import "./Notification.css";

function Notification() {
  return (
    <div>
      <Row>
        <h2 style={{ fontSize: "25px", marginBottom: "30px" }}>
          All Notifications
        </h2>

        {[...Array(5).keys()].map((_, index) => {
          return (
            <Col lg={{ span: 24 }}>
              <div
                className="single-notification"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className="user-image" style={{ marginRight: "50px" }}>
                  <img
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                    }}
                    src="https://pbs.twimg.com/media/E2K9OQbXsAEmQfZ.jpg"
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

              <Divider />
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col lg={{ span: 12 }} style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "20px", color: "#000b90" }}>
            Showing 1-10 OF 250
          </h1>
        </Col>
        <Col lg={{ span: 8, offset: 4 }}>
          <Pagination
            defaultCurrent={1}
            total={5000}
            showQuickJumper={false}
            showSizeChanger={false}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Notification;
