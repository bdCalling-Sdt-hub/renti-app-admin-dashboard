import { Button, Drawer, Space, Table, Typography } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { TbTrashOff } from "react-icons/tb";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import baseAxios from "../../../../Config";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import Delete from "../../../icons/Delete";
import Eye from "../../../icons/Eye";
const { Title, Text } = Typography;

const CarInfoTable = ({ carDataByPagination, setReload }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { cars, pagination } = useSelector((state) => state.carsData.carsData);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [carDetailsData, setCarDetailsData] = useState(null);

  console.log("car activeoi", cars);

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setCarDetailsData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setCarDetailsData(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    carDataByPagination(page);
  };

  const token = localStorage.token;

  const handleCarDelete = (id) => {
    Swal.fire({
      title: "Are you sure!",
      text: "You want to delete car",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000B90",
      cancelButtonColor: "#d33333",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        baseAxios
          .delete(
            `api/user/delete-car/${id}`,

            {
              headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            if (res.data) {
              Swal.fire({
                icon: "success",
                title: "Successfully!",
                text: res.data.message,
              });
              setReload((prev) => prev + 1);
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: "warning",
              title: "Sorry!",
              text: err.response.data.message,
            });
          });
      }
    });
  };

  const data = cars?.map((car) => {
    return {
      key: car._id,
      carModel: car.carModelName,
      licenseNo: car.carLicenseNumber,
      registerDate: moment(car?.createAt).format("llll"),
      owner: car.carOwner?.fullName,
      status:
        car.tripStatus === "Start" ? (
          <div
            style={{
              background: "#FBE9EC",
              color: "#D7263D",
              padding: "5px",
              fontSize: "11px",
              borderRadius: "4px",
              textAlign: "center",
            }}
          >
            Reserved
          </div>
        ) : (
          <div
            style={{
              background: "#E6F6F4",
              color: "#00A991",
              padding: "5px",
              fontSize: "11px",
              borderRadius: "4px",
              textAlign: "center",
            }}
          >
            Active
          </div>
        ),
      printView: car,
    };
  });

  const columns = [
    {
      title: "Car Model",
      dataIndex: "carModel",
      key: "carModel",
    },
    {
      title: "License No",
      dataIndex: "licenseNo",
      key: "licenseNo",
      responsive: ["md"],
    },
    {
      title: "Register Date",
      dataIndex: "registerDate",
      key: "registerDate",
      responsive: ["lg"],
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      responsive: ["md"],
    },

    {
      title: "PRINT/VIEW",
      dataIndex: "printView",
      key: "printView",
      responsive: ["lg"],
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button onClick={() => showDrawer(record)} type="text">
            <Eye />
          </Button>
          {record?.printView?.tripStatus == "Start" ? (
            <div
              type="text"
              style={{ marginLeft: "20px", cursor: "not-allowed" }}
            >
              <TbTrashOff style={{ fontSize: "20px", color: "#595959" }} />
            </div>
          ) : (
            <Button type="text" onClick={() => handleCarDelete(record.key)}>
              <Delete />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize,
          showSizeChanger: false,
          total: pagination?.totalDocuments,
          current: currentPage,
          onChange: handlePageChange,
        }}
      />
      <Drawer
        title={
          <div>
            <Typography>
              <Title style={{ color: "#333333" }} level={5} strong>
                Car Details
              </Title>
              <Text style={{ color: "gray" }}>
                See all information about selected car
              </Text>
            </Typography>
          </div>
        }
        headerStyle={{ background: "#E6E7F4" }}
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={600}
        closable={false}
        extra={
          <Space>
            <Button
              style={{
                borderRadius: "100%",
                backgroundColor: "white",
                color: "red",
                height: "40px",
                width: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={closeDrawer}
            >
              <AiOutlineClose />
            </Button>
          </Space>
        }
      >
        {carDetailsData && (
          <DrawerPage
            carDetails={carDetailsData}
            setReload={setReload}
            setIsDrawerVisible={setIsDrawerVisible}
          />
        )}
      </Drawer>
    </div>
  );
};
export default CarInfoTable;
