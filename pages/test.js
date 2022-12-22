import React from 'react';
import { useDispatch } from 'react-redux';
import { Button} from 'antd';

import {SAVE_COOKIE, LOAD_COOKIE, REMOVE_COOKIE}from '@/store/modules/testState'
import styled from 'styled-components';

import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale);  


const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 2,
      data: [1, 2, 3, 4, 5],
    },
    {
      type: 'bar',
      label: 'Dataset 2',
      backgroundColor: 'rgb(255, 99, 132)',
      data: [1, 2, 3, 4, 5, 6],
      borderColor: 'red',
      borderWidth: 2,
    },
    {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: 'rgb(75, 192, 192)',
      data: [1, 2, 3, 4, 5, 6],
    },
  ],
};

const Chart = () => {
  return (
    <Container>
      <Doughnut data={data} />
    </Container>
  );
};


const Container = styled.div`
  width: 90vw;
  max-width: 900px;
`;


const test = () => {

    const dispatch = useDispatch();

    const SaveCookie = () => {
        dispatch({type: SAVE_COOKIE});
    };

    const LoadCookie = () => {
        dispatch({type: LOAD_COOKIE});
    };

    const RemoveCookie = () => {
        dispatch({type: REMOVE_COOKIE});
    };

    return (
        <>
            <Button type='primary' onClick={SaveCookie}>Save Cookie</Button>
            <Button type='primary' onClick={LoadCookie}>Load Cookie</Button>
            <Button type='primary' onClick={RemoveCookie}>Remove Cookie</Button>
            <Chart/>
        </>
    );
};

export default test;