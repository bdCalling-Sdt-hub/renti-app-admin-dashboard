import { Button, Table, Typography } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { MdRestore } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";
import axios from "../../../../Config";
const { Title, Text } = Typography;

const TrashCarTable = ({ setCarReload, trashCar, trashCarPagination }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  console.log("trashcar table", trashCar);

  const data = trashCar.map((filterUser) => {
    return {
      image: (
        <img
          src={filterUser.image[0]}
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          alt=""
        />
      ),
      name: filterUser.carModelName,
      license: filterUser.carLicenseNumber,
      joiningDate: moment(filterUser.createdAt).format("YYYY-MM-DD"),
      actions: filterUser,
    };
  });

  const token = localStorage.token;

  const trashDataDelete = async (id) => {
    const res = await axios.delete(`api/car/delete/${id}`, {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    if (res.data.message !== "") {
      Swal.fire({
        icon: "success",
        title: "Successfully",
        text: res.data.message,
      });

      setCarReload((p) => p + 1);
    }
  };

  const trashDataRestore = (id) => {
    axios
      .post(
        `api/car/banned/${id}`,
        { isCarActive: "Active" },
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
            title: "Restored successfully",
            text: "Saved",
          });
        }
        setCarReload((p) => p + 1);
      });
  };

  const columns = [
    {
      title: "IMAGE",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "LICENSE",
      dataIndex: "license",
      key: "license",
      responsive: ["lg"],
    },
    {
      title: "JOINING DATE",
      dataIndex: "joiningDate",
      key: "joiningDate",
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
        pagination={false}
        // pagination={{
        //   pageSize,
        //   showSizeChanger: false,
        //   total: trashCarPagination?.totalDocuments,
        //   current: currentPage,
        //   onChange: handlePageChange,
        // }}
      />
    </div>
  );
};

export default TrashCarTable;
