import React, {useEffect, useCallback} from 'react';
import {Button} from "antd";
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import KakaoLogin from './KakaoLogin';
import {
    LOG_IN_REQUEST
} from "@/store/modules/userInfo"


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


 
    return (
        <>
            {
                userInfo.me !== null
                ? <div>GOOD</div>
                :   <Wrapper>
                        {/* <Button type="primary" onClick={testLogIn} loading={userInfo.logInLoading}>Kakao</Button> */}
                        <KakaoLogin/>
                        <Button type='primary' onClick={AdminLogin}>
                            Admin Login
                        </Button>
                    </Wrapper>
            }
        </>
    );
};

export default LoginContent;