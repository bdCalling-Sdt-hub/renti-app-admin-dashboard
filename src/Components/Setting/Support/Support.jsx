import { Button, Col, Row } from "antd";
import JoditEditor from "jodit-react";
import React, { useRef, useState } from "react";

import { useEffect } from "react";
import Swal from "sweetalert2";
import axios from "../../../../Config";
import "./Support.css";

const Support = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const aboutDataSave = () => {
    let token = localStorage.getItem("token");
    let data = {
      content,
    };

    axios
      .post("/api/support/create", data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        Swal.fire("Good job!", res.data.message, "success");
      })
      .catch((err) => {
        Swal.fire("Oops!", err.response.data.message, "error");
      });
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .get("/api/support", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setContent(res.data?.support?.content);
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
            onClick={aboutDataSave}
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

export default Support;
