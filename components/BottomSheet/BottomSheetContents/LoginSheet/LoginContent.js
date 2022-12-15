import React, {useEffect, useCallback} from 'react';
import {Button} from "antd";
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import KakaoLogin from './KakaoLogin';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1vh;
`;


const LoginContent = () => {

    const dispatch = useDispatch();
    const userInfo =  useSelector(({userInfo}) => userInfo);

 
    return (
        <>
            {
                userInfo.me !== null
                ? <div>GOOD</div>
                :   <Wrapper>
                        {/* <Button type="primary" onClick={testLogIn} loading={userInfo.logInLoading}>Kakao</Button> */}
                        <KakaoLogin/>
                    </Wrapper>
            }
        </>
    );
};

export default LoginContent;