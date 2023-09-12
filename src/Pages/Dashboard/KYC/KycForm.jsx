import { Button, Select, Upload } from "antd";
import React, { useState } from "react";
//import DatePicker from "react-multi-date-picker";
import CarKycForm from "../../../Components/KycForms/CarForm";
import HostKycForm from "../../../Components/KycForms/HostForm";
import UserKycForm from "../../../Components/KycForms/UserForm";
import styleForm from "./KycForm.module.css";
const { Option } = Select;
const { Dragger } = Upload;

const KycForm = () => {
  const [formType, setFormType] = useState("host");

  const style = {
    formContainer: {
      background: "white",
      padding: "30px",
      borderRadius: "10px",
    },
    formNavigateBtn: {
      height: "50px",
    },
  };

  return (
    <div style={{ padding: "0 60px" }}>
      <h2 style={{ marginBottom: "10px", fontWeight: "normal" }}>Kyc Form</h2>
      <div style={style.formContainer}>
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #cbcbcb",
            paddingBottom: "15px",
            gap: "10px",
          }}
        >
          <Button
            type="text"
            onClick={() => setFormType("host")}
            className={`${formType === "host" ? styleForm.navigateBtn : ""}`}
            style={style.formNavigateBtn}
            block
          >
            Host
          </Button>
          <Button
            type="text"
            onClick={() => setFormType("user")}
            className={`${formType === "user" ? styleForm.navigateBtn : ""}`}
            style={style.formNavigateBtn}
            block
          >
            User
          </Button>
          <Button
            type="text"
            onClick={() => setFormType("car")}
            className={`${formType === "car" ? styleForm.navigateBtn : ""}`}
            style={style.formNavigateBtn}
            block
          >
            Car
          </Button>
        </div>
        {formType === "host" && <HostKycForm />}
        {formType === "user" && <UserKycForm />}
        {formType === "car" && <CarKycForm />}
      </div>
    </div>
  );
};

export default KycForm;
