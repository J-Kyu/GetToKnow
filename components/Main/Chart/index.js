import React from 'react';
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
  
export const data = {
    labels: ['능동형', '외향형', '공동체', '계획형', '사고형'],
    datasets: [
        /*
        {
            label: 'Default',
            data: [5, 5, 5, 5, 5],
            backgroundColor: 'rgba(255, 255, 132, 0.2)',
            borderColor: 'rgba(255, 255, 132, 1)',
            borderWidth: 1,
        },
        */
        {
            label: 'Case 1',
            data: [3, 5, 2, 1, 3],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        },
        {
            label: 'Case 3',
            data: [2, 0, 2, 3, 4],
            backgroundColor: 'rgba(120, 23, 12, 0.2)',
            borderColor: 'rgba(120, 23, 12, 1)',
            borderWidth: 1,
        },
    ],
};
  
const Chart = () => {

    const options =  {
        scale: {
            ticks: {
                callback: function() {return ""},
                backdropColor: "rgba(0, 0, 0, 0)"
            }
        }
    };

    return (
        <Radar 
            data={data} 
            options={{

                scales: {
                    r: {
                      ticks: {
                        display: false,
                        color: 'red'
                      },
                      pointLabels: {
                        font: {
                            size: 16,
                            weight: "bold"
                        },
                        color: "black"
                      }
                    }
                }
            }}
        />
    );
};


const RadarChart = () => {
    return (
        <>
            <Chart/>
        </>
    );
};

export default RadarChart;