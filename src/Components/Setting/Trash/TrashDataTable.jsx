import { Button, Table, Typography } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { MdRestore } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "../../../../Config";
const { Title, Text } = Typography;

const TrashDataTable = ({ setReload }) => {
  const { allUsers, pagination } = useSelector((state) => state.AllUser);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

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

  const token = localStorage.token;

  const trashDataDelete = async (id) => {
    const res = await axios.delete(`api/user/delete-user/${id}`, {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    if (res.data.message !== "") {
      Swal.fire({
        icon: "success",
        title: "Wow!",
        text: res.data.message,
      });

      setReload((p) => p + 1);
    }
  };

  const trashDataRestore = (id) => {
    axios
      .post(
        `api/user/banned/${id}`,
        { isApprove: "approve", approved: true },
        {
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            text: "User restore successfully",
          });
        }
        setReload((p) => p + 1);
      });
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
