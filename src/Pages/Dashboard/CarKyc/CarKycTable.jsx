import { Button, Drawer, Space, Table, Typography } from "antd";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import Eye from "../../../icons/Eye";
const { Title, Text } = Typography;

const CarKycTable = ({
  carDataGetByPagination,
  carDataGetBySearch,
  setReload,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { CarData, pagination } = useSelector((state) => state.CarInfoData);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [carKycData, setCarKycData] = useState();

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setCarKycData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setCarKycData(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    carDataGetByPagination(page);
    carDataGetBySearch(page);
  };

  const token = localStorage.token;

  // const handleCarDelete = (id) => {
  //   Swal.fire({
  //     title: "Are you sure!",
  //     text: "You want to block user",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#000B90",
  //     cancelButtonColor: "#d33333",
  //     confirmButtonText: "Yes, Block",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios
  //         .delete(
  //           `api/user/delete-car/${id}`,

  //           {
  //             headers: {
  //               "Content-type": "application/json",
  //               authorization: `Bearer ${token}`,
  //             },
  //           }
  //         )
  //         .then((res) => {
  //           if (res.data) {
  //             Swal.fire({
  //               icon: "success",
  //               title: "Successfully!",
  //               text: res.data.message,
  //             });
  //             setReload((prev) => prev + 1);
  //           }
  //         })
  //         .catch((err) => {
  //           Swal.fire({
  //             icon: "warning",
  //             title: "Sorry!",
  //             text: err.response.data.message,
  //           });
  //         });
  //     }
  //   });
  // };

  const data = CarData?.map((item) => {
    return {
      name: item?.carModelName,
      email: item?.carOwner?.email,
      contact: item?.carOwner?.phoneNumber,
      type: "pdf",
      status: item?.isCarActive,
      actions: item,
    };
  });

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
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      responsive: ["md"],
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      responsive: ["lg"],
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button onClick={() => showDrawer(record)} type="text">
            <Eye />
          </Button>
          {/* {record?.actions?.tripStatus == "Start" ? (
            <div
              type="text"
              style={{ marginLeft: "20px", cursor: "not-allowed" }}
            >
              <TbTrashOff style={{ fontSize: "20px", color: "#595959" }} />
            </div>
          ) : (
            <Button
              type="text"
              onClick={() => handleCarDelete(record.actions._id)}
            >
              <Delete />
            </Button>
          )} */}
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>
              <Title style={{ color: "#333333" }} level={5} strong>
                Invoice# Trip No.{carKycData?.tripNo}
              </Title>
              <Text style={{ color: "gray" }}>
                See all information about the trip no. 68656
              </Text>
            </Typography>
          </div>
        }
        headerStyle={{ background: "#E6E7F4" }}
        closable={false}
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={600}
        extra={
          <Space>
            <Button
              style={{
                borderRadius: "100%",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "red",
                height: "40px",
                width: "40px",
              }}
              onClick={closeDrawer}
            >
              <AiOutlineClose />
            </Button>
          </Space>
        }
      >
        {carKycData && <DrawerPage carKycData={carKycData} />}
      </Drawer>
    </div>
  );
};

export default CarKycTable;

// item?.isCarActive === "Pending" ? (
//         <div
//           style={{
//             background: "#FBE9EC",
//             color: "#D7263D",
//             padding: "5px",
//             fontSize: "11px",
//             borderRadius: "4px",
//             textAlign: "center",
//           }}
//         >
//           Pending
//         </div>
//       ) : (
//         <div
//           style={{
//             background: "#E6F6F4",
//             color: "#00A991",
//             padding: "5px",
//             fontSize: "11px",
//             borderRadius: "4px",
//             textAlign: "center",
//           }}
//         >
//           Active
//         </div>
//       ),
