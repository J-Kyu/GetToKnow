import React, {useEffect, useCallback} from 'react';
import {Button} from "antd";
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import KakaoLogin from './KakaoLogin';
import {
    LOG_IN_REQUEST
} from "@/store/modules/userInfo"

import {
    BOTTOM_SHEET_ROOM_LOBBY,
} from 'store/modules/bottomSheetState';


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1vh;
`;


const LoginContent = () => {

    const dispatch = useDispatch();
    const userInfo =  useSelector(({userInfo}) => userInfo);

    const AdminLogin = () => {

        dispatch({
            type: LOG_IN_REQUEST,
            data: {
                oauthType: "DEFAULT",
                nickname: "ADMIN",
                uuid: "ADMIN"
            }
         })
    };

    //skip login if already logged in
    useEffect(() => {
        if(userInfo.me !== null){
            dispatch({type: BOTTOM_SHEET_ROOM_LOBBY});
        }

    },[userInfo.me]);


    return(
        <>
            <Wrapper>
                    <KakaoLogin/>
                    <Button type='primary' onClick={AdminLogin}>
                        Admin Login
                    </Button>
            </Wrapper>
        </>
    );

};

export default LoginContent;