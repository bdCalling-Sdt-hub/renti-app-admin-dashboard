import {
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Upload,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
const { Option } = Select;
const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const CarKycForm = () => {
  const style = {
    input: {
      height: "43px",
    },
  };

  return (
    <div style={{ margin: "50px 0" }}>
      <Form>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Car Model Name"
              labelCol={{ span: 24 }}
            >
              <Input style={style.input} placeholder="Type car name" />
            </Form.Item>

            <Form.Item label="Car Description" labelCol={{ span: 24 }}>
              <TextArea rows={6} />
            </Form.Item>

            <Form.Item name="color" label="Car Color" labelCol={{ span: 24 }}>
              <Input style={style.input} placeholder="Type color here" />
            </Form.Item>
            <Form.Item name="color" label="Car Seat" labelCol={{ span: 24 }}>
              <Input style={style.input} placeholder="Type number here" />
            </Form.Item>
            <Form.Item name="color" label="Gear Type" labelCol={{ span: 24 }}>
              <Input style={style.input} placeholder="Type gear here" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="license"
              label="Car License Number"
              labelCol={{ span: 24 }}
            >
              <Input
                style={style.input}
                placeholder="Type license number here"
              />
            </Form.Item>

            <Form.Item
              name="rentAmount"
              label="Set Rent Amount"
              labelCol={{ span: 24 }}
            >
              <Input style={style.input} placeholder="Type rent amount here" />
            </Form.Item>

            <Form.Item
              label="Insurance Date"
              labelCol={{ span: 24 }}
              style={{ marginBottom: "-5px" }}
            >
              <Form.Item style={{ display: "inline-block", width: "50%" }}>
                <DatePicker style={{ height: "40px", width: "100%" }} />
              </Form.Item>
              <Form.Item style={{ display: "inline-block", width: "50%" }}>
                <DatePicker style={{ height: "40px", width: "100%" }} />
              </Form.Item>
            </Form.Item>

            <Form.Item name="door" label="Car Door" labelCol={{ span: 24 }}>
              <Input style={style.input} placeholder="Type number here" />
            </Form.Item>
            <Form.Item name="door" label="Total Run" labelCol={{ span: 24 }}>
              <Input style={style.input} placeholder="Type km here" />
            </Form.Item>
            <Form.Item label="Car Features" labelCol={{ span: 24 }}>
              <Radio.Group name="radiogroup" defaultValue={1}>
                <Radio name="seat" value={1}>
                  Baby Seat
                </Radio>
                <Radio name="seat" value={2}>
                  Sunroof
                </Radio>
                <Radio name="seat" value={3}>
                  Bluetooth
                </Radio>
                <Radio name="seat" value={4}>
                  GPS
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Dragger style={{ background: "#E6E7F4", color: "#000b92" }} {...props}>
          <p className="ant-upload-drag-icon">
            <AiOutlineCloudUpload style={{ fontSize: "30px" }} />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </Form>
      <div style={{ marginTop: "20px" }}>
        <p>1.Upload car license</p>
        <p>2.Upload car insurance Policy</p>
        <p>4.upload circulation card</p>
        <p>5.upload car invoice</p>
        <p>6.upload REPUVE (non theft report)</p>
      </div>
    </div>
  );
};

export default CarKycForm;
