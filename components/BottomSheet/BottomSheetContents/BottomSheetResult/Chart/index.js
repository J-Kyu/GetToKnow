import React, {useEffect, useState} from 'react';
import styled from 'styled-components';


import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

import { Radar } from 'react-chartjs-2';
  
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const ChartWrapper = styled.div`
  width: 50vw;
`;
 


const RadarChart = ({data}) => {
  
  // random rgb a
  const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
  

  // const [chartDataColor, setChartDataColor] = useState("");

  const chartData = {
    labels: ['능동형', '외향형', '공동체', '계획형', '사고형'],
    datasets: [],
  };

  //parsing result data to chart data
  data.forEach(element => {
      
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    //generate dataset
    const dataset = {  
      label: element.userNickname,
      data: [0,0,0,0,0],
      backgroundColor:  `rgba(${r},${g},${b}, 0.2)`,
      borderColor: `rgba(${r},${g},${b}, 1)`,
      borderWidth: 1
    }


    // Parsing category result DTO List 
    element.categoryResultDTOList.forEach(cr => {
      switch(cr.questionCategory){
        case "TYPE_ONE":{
          dataset.data[0] = cr.averageScore;
          break;
        }
        case "TYPE_TWO":{
          dataset.data[1] = cr.averageScore;
          break;
        }
        case "TYPE_THREE":{
          dataset.data[2] = cr.averageScore;
          break;
        }
        case "TYPE_FOUR":{
          dataset.data[3] = cr.averageScore;
          break;
        }
        case "TYPE_FIVE":{
          dataset.data[4] = cr.averageScore;
          break;
        }
        default:{
          console.error("WRONG Category TYPE: "+cr.questionCategroy);
          break;
        }
      }

    });
    chartData.datasets.push(dataset);
  });



  //radar chart options
  const options = {
    scales: {
        r: {
          beginAtZero: true,
          min: 0, 
          max: 5,
          ticks: {
            stepSize: 1,
            display: false,
            color: 'red'
          },
          pointLabels: {
            font: {
                size: 16,
                weight: "bold"
            },
            color: "white"
          },
          grid:{
            color: "rgba(236,236,236, 0.1)"
          },
          angleLines: {
            color: "rgba(236,236,236, 0.1)"
          }
        }
    }
  }

  return (
    <>
      <ChartWrapper>
        <Radar 
            data={chartData} 
            options={options}
        />
      </ChartWrapper>
    </>

  );



};

export default RadarChart;