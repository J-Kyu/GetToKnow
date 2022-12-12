import React from 'react';
import { useDispatch } from 'react-redux';
import { Button} from 'antd';

import {SAVE_COOKIE, LOAD_COOKIE, REMOVE_COOKIE}from '@/store/modules/testState'

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
        </>
    );
};

export default test;