import { Button, Col, Row } from "antd";
import JoditEditor from "jodit-react";
import React, { useRef, useState } from "react";

import { useEffect } from "react";
import Swal from "sweetalert2";
import axios from "../../../../Config";
import "./HowRentiWork.css";

const HowRentiWork = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const howRentiWorkSave = () => {
    let token = localStorage.getItem("token");
    let data = {
      content,
    };

    axios
      .post("/api/howRentiWork/create", data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire("Good job!", res.data.message, "success");
      })
      .catch((err) => {
        Swal.fire("Oops!", err.response.data.message, "error");
      });
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .get("/api/howRentiWork", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setContent(res.data?.howRentiWork?.content);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Row>
        <Col lg={{ span: 24 }}>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => {
              setContent(newContent);
            }}
          />

          <Button
            onClick={howRentiWorkSave}
            block
            style={{
              marginTop: "30px",
              backgroundColor: "#000b90",
              color: "#fff",
              height: "50px",
            }}
          >
            save
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default HowRentiWork;
