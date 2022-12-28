import React from 'react';
import { useDispatch } from 'react-redux';
import { Button} from 'antd';

import {SAVE_COOKIE, LOAD_COOKIE, REMOVE_COOKIE}from '@/store/modules/testState'
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
  labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
  datasets: [
    {
      label: '# of Votes',
      data: [2, 9, 3, 5, 2, 3],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
    {
      label: '# of Votes',
      data: [3, 5, 7, 1, 7, 2],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const Chart = () => {
  return (
    <Container>
      <Radar data={data} />
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