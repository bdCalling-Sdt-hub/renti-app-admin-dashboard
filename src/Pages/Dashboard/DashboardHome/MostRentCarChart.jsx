import React, { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import axios from "../../../../Config";

const MostRentCarChart = () => {
  const [allCar, setAllCar] = useState([]);

  let token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("/api/car/all", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAllCar(res.data.cars);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(allCar);

  const data = allCar.map((car) => {
    return {
      type: car.carModelName,
      value: 10,
    };
  });

  console.log(data);

  // let cars = allCar.map((car) => {
  //   return {
  //     carModelName: car.carModelName,
  //   };
  // });

  // // Create an object to store car model frequencies
  // let carModelFrequencies = {};

  // // Count the occurrences of each car model
  // for (let car of cars) {
  //   let modelName = car.carModelName;
  //   if (carModelFrequencies[modelName]) {
  //     carModelFrequencies[modelName]++;
  //   } else {
  //     carModelFrequencies[modelName] = 1;
  //   }
  // }

  // // Sort the car model frequencies in descending order
  // let sortedCarModelFrequencies = Object.entries(carModelFrequencies).sort(
  //   (a, b) => b[1] - a[1]
  // );

  // // Get the top three most used car models
  // let topThreeCarModels = sortedCarModelFrequencies.slice(0, 5);

  // const data = [];

  // for (let [carModel, frequency] of topThreeCarModels) {
  //   let percentage = (frequency / cars.length) * 100;
  //   data.push({
  //     type: carModel,
  //     value: percentage,
  //   });
  // }

  // const config = {
  //   appendPadding: 10,
  //   data,
  //   angleField: "value",
  //   colorField: "type",
  //   radius: 0.9,
  //   label: {
  //     type: "inner",
  //     offset: "-30%",
  //     content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
  //     style: {
  //       fontSize: 20,
  //       textAlign: "center",
  //     },
  //   },
  //   interactions: [
  //     {
  //       type: "element-active",
  //     },
  //   ],
  // };

  const COLORS = [
    "#8884d8",
    "#83a6ed",
    "#8dd1e1",
    "#82ca9d",
    "#a4de6c",
    "#d0ed57",
  ];

  return (
    <div
      style={{
        width: "100%",
        border: "3px solid #000b90",
        borderRadius: "15px",
        padding: "20px",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ marginTop: "10px", marginBottom: "10px", color: "#000b90" }}>
        Most usages car
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={"100%"} height={"100%"}>
          <Pie
            width={600}
            height={200}
            dataKey="value"
            startAngle={360}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Legend nameKey="type" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MostRentCarChart;
