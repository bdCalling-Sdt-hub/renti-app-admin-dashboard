import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axios from "../../../../Config";

const token = localStorage.token;

export default function IncomeRatioChart() {
  const [chartDatas, setChartDatas] = useState();
  useEffect(() => {
    axios
      .get("api/income/hourly-renti-payment", {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setChartDatas(res.data.hourlyPaymentCounts);
      })
      .catch((err) => console.log(err));
  }, []);

  const data = chartDatas?.map((chartData) => {
    return {
      time: chartData.hour,
      CountOfPeople: chartData.userPaymentCounts,
    };
  });

  return (
    <div
      style={{
        width: "100%",
        border: "1px solid #000b90",
        borderRadius: "15px",
        padding: "20px",
        backgroundColor: "#fff",
      }}
    >
      <h2
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          color: "#000b90",
          fontWeight: "normal",
        }}
      >
        Per Day Income Ratio
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={600}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            type="linear"
            dataKey="CountOfPeople"
            stroke="#000b90"
            fill="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
