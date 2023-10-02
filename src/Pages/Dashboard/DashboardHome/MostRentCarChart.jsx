import { Pie } from "@ant-design/plots";
import React, { useEffect, useState } from "react";
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

  let cars = allCar.map((car) => {
    return {
      carModelName: car.carModelName,
    };
  });

  // Create an object to store car model frequencies
  let carModelFrequencies = {};

  // Count the occurrences of each car model
  for (let car of cars) {
    let modelName = car.carModelName;
    if (carModelFrequencies[modelName]) {
      carModelFrequencies[modelName]++;
    } else {
      carModelFrequencies[modelName] = 1;
    }
  }

  // Sort the car model frequencies in descending order
  let sortedCarModelFrequencies = Object.entries(carModelFrequencies).sort(
    (a, b) => b[1] - a[1]
  );

  // Get the top three most used car models
  let topThreeCarModels = sortedCarModelFrequencies.slice(0, 5);

  const data = [];

  for (let [carModel, frequency] of topThreeCarModels) {
    let percentage = (frequency / cars.length) * 100;
    data.push({
      type: carModel,
      value: percentage,
    });
  }

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 20,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} style={{ height: "300px" }} />;
};

export default MostRentCarChart;
