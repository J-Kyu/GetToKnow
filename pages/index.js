import React from 'react';
import Main from '../components/Main';
import BottomSheet from '../components/BottomSheet';
import styled from 'styled-components';
import AlertMessage from '@/components/AlertMessage';

const Home = () => {

    return (
        <>
            <AlertMessage/>
            <Main style={{height: "100px",backgroundColor: "red"}}/>
            <BottomSheet/>
        </>

    );
};

export default Home;