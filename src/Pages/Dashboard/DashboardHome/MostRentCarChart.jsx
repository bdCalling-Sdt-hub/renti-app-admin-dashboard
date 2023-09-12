import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import axios from '../../../../Config';

const MostRentCarChart = () => {

  const [allCar,setAllCar]=useState([])

  let token=localStorage.getItem("token")
  useEffect(()=>{
    axios.get("/api/car/all",{
      headers:{
        "authorization":`Bearer ${token}`
      }
    }).then(res=>{
      //console.log(res.data.cars)
      setAllCar(res.data.cars)
    }).catch(err=>console.log(err))
  },[])

  let cars=allCar.map((car)=>{
    return({
       "carModelName":car.carModelName
    })
  })
  console.log(cars)


  // let cars = [
  //   {"carModelName": "BMW"},
  //   {"carModelName": "toyota"},
  //   {"carModelName": "nissan"},
  //   {"carModelName": "marcedees"},
  //   {"carModelName": "BMW"},
  //   {"carModelName": "nissan"},
  //   {"carModelName": "nissan"},
  //   {"carModelName": "toyota"},
  //   {"carModelName": "BMW"},
  //   {"carModelName": "marcedees"},
  //   {"carModelName": "BMW"},
  //   {"carModelName": "nissan"},
  //   {"carModelName": "marcedees"},
  //   {"carModelName": "marcedees"},
  //   {"carModelName": "marcedees"},
  //   {"carModelName": "tesla"},
  //   {"carModelName": "tesla"},
  //   {"carModelName": "tesla"},
  //   {"carModelName": "tesla"}
    
  // ];
  
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
  let sortedCarModelFrequencies = Object.entries(carModelFrequencies).sort((a, b) => b[1] - a[1]);
  
  // Get the top three most used car models
  let topThreeCarModels = sortedCarModelFrequencies.slice(0, 5);
  
  // Calculate and display the percentage for the top three car models
  console.log("Top Three Most Used Car Models as Percentages:");

  const data=[];

  for (let [carModel, frequency] of topThreeCarModels) {
    let percentage = (frequency / cars.length) * 100;
    console.log(`${carModel}: ${percentage.toFixed(2)}%`);
    console.log(percentage)
    data.push({
      type:carModel,
      value:percentage
    })
  }

 
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 20,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} style={{height:"300px"}}/>;
};


export default MostRentCarChart;