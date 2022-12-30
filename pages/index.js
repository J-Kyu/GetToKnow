import React, {useEffect} from 'react';
import Main from '../components/Main';
import BottomSheet from '../components/BottomSheet';
import styled from 'styled-components';
import AlertMessage from '@/components/AlertMessage';
import {wrapper} from 'store/';
import { END } from 'redux-saga';
import axios from 'axios';


import {
    LOAD_USER_INFO_REQUEST
} from 'store/modules/userInfo';

import AppLayout from '@/components/AppLayout';


const Home = () => {

    return (
        <>
            <AlertMessage/>

            <AppLayout>
                <Main/>
            </AppLayout>
            <BottomSheet/>
        </>

    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (context) => async ({store, req, res, ...etc}) => {

        //get cookie info
        const cookie = req ? req.headers.cookie : '';
        axios.defaults.headers.Cookie = ''; //reset cookie

        if (req && cookie) {
          axios.defaults.headers.Cookie = cookie;
        }

    
        context.dispatch({
            type:LOAD_USER_INFO_REQUEST
        });

        context.dispatch(END);
        await context.sagaTask.toPromise();
    }
);

export default Home;