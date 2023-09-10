import { Button, Table, Typography } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { MdRestore } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useSelector } from "react-redux";
const { Title, Text } = Typography;

const TrashDataTable = () => {
  const { allUsers, pagination } = useSelector((state) => state.AllUser);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const bannedUser = allUsers.filter((user) => user.isBanned === "trash");

  const data = bannedUser.map((filterUser) => {
    return {
      name: filterUser.fullName,
      email: filterUser.email,
      contact: filterUser.phoneNumber,
      joiningDate: moment(filterUser.createdAt).format("YYYY-MM-DD"),
      ine: 20,
      actions: filterUser,
    };
  });

  const trashDataDelete = (id) => {
    console.log("DeleteTrash", id);
  };

  const trashDataRestore = (id) => {
    console.log("RestoreTrash", id);
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
    },
    {
      title: "CONTACT",
      dataIndex: "contact",
      key: "contact",
      responsive: ["lg"],
    },
    {
      title: "JOINING DATE",
      dataIndex: "joiningDate",
      key: "joiningDate",
    },
    {
      title: "INE",
      dataIndex: "ine",
      key: "ine",
      responsive: ["md"],
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      responsive: ["lg"],
      render: (_, record) => (
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={() => trashDataDelete(record.actions._id)}
            type="text"
            style={{ marginRight: "10px" }}
          >
            <RiDeleteBin5Line style={{ fontSize: "25px", color: "#fb6a6a" }} />
          </Button>
          <Button
            onClick={() => trashDataRestore(record.actions._id)}
            type="text"
          >
            <MdRestore style={{ fontSize: "25px", color: "#999999" }} />
          </Button>
        </div>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize,
          showSizeChanger: false,
          total: bannedUser?.length,
          current: currentPage,
          onChange: handlePageChange,
        }}
      />
    </div>
  );
};

export default TrashDataTable;
