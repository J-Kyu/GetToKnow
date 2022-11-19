import React from 'react';
import Main from '../components/Main';
import BottomSheet from '../components/BottomSheet';
import styled from 'styled-components';
import {TEST_VALUE,BOTTOM_SHEET_DTOP_GAP} from 'configs/constants';

const Home = () => {

    return (
        <>
            <Main style={{height: "100px",backgroundColor: "red"}}/>
            <BottomSheet/>
        </>

    );
};

export default Home;