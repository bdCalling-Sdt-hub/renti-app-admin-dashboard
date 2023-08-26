/* eslint-disable react/prop-types */
import { Button, Drawer, Dropdown, Typography } from "antd";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import img from "../../../Images/image 1.png";

const { Title, Text } = Typography;

const WalletCard = ({ cardBg }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [editedData, setEditedData] = useState(null);

  const simpleData = {
    name: "fahim",
    age: 20,
    account: "0521515154",
  };

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setEditedData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setEditedData(null);
  };
  const style = {
    card: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "20px",
      borderBottom: "1px solid #ebe6e6",
      paddingBottom: "30px",
    },
    cardType: {
      height: "150px",
      width: "250px",
      background: cardBg,
      borderRadius: "10px",
      position: "relative",
    },
    icon: {
      position: "absolute",
      bottom: "10px",
      left: "10px",
      background: "#fff",
      padding: "0 8px",
      paddingTop: "8px",
      borderRadius: "3px",
    },
    cardMenuBtn: {
      width: "100%",
      padding: "10px",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    title: {
      color: "#8d8d8d",
      marginBottom: "8px",
      fontWeight: "normal",
    },
  };

  const items = [
    {
      key: "1",
      label: (
        <Button
          type="text"
          onClick={() => showDrawer(simpleData)}
          style={style.cardMenuBtn}
        >
          <LiaEditSolid fontSize={16} />
          Edit Card
        </Button>
      ),
    },
    {
      key: "2",
      label: (
        <Button
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
          style={{ ...style.cardMenuBtn, color: "#D7263D" }}
        >
          <RiDeleteBin6Line fontSize={16} />
          Delete Card
        </Button>
      ),
    },
  ];

  return (
    <div style={style.card}>
      <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
        <div style={style.cardType}>
          <div style={style.icon}>
            <img src={img} alt="" />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "50px",
          }}
        >
          <div>
            <h3 style={style.title}>Valid Date</h3>
            <h3
              style={{
                fontWeight: "normal",
              }}
            >
              12/23
            </h3>
          </div>
          <div>
            <h3 style={style.title}>Card Holder</h3>
            <h3
              style={{
                fontWeight: "normal",
              }}
            >
              Sanchez Haro Manuel
            </h3>
          </div>
          <div>
            <h3 style={style.title}>Card Number</h3>
            <h3
              style={{
                fontWeight: "normal",
              }}
            >
              **********1234
            </h3>
          </div>
        </div>
      </div>
      <Dropdown
        overlay={
          <div
            style={{
              background: "#fff",
              borderRadius: "4px",
              boxShadow: "0 0 5px #e3e2e2",
              padding: "6px",
            }}
          >
            <Button
              type="text"
              onClick={() => showDrawer(simpleData)}
              style={style.cardMenuBtn}
            >
              <LiaEditSolid fontSize={16} />
              Edit Card
            </Button>
            <Button
              type="text"
              style={{ ...style.cardMenuBtn, color: "#D7263D" }}
            >
              <RiDeleteBin6Line fontSize={16} />
              Delete Card
            </Button>
          </div>
        }
        placement="bottomRight"
      >
        <Button type="text">
          <BsThreeDotsVertical style={{ fontSize: "20px" }} />
        </Button>
      </Dropdown>
      <Drawer
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>
              <Text>Edit Card</Text>
            </Typography>
            <Button type="text" onClick={closeDrawer}>
              <IoMdClose fontSize={25} />
            </Button>
          </div>
        }
        closable={false}
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={500}
      >
        {editedData && <DrawerPage editedData={editedData} />}
      </Drawer>
    </div>
  );
};

export default WalletCard;
