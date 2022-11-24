import React, {useEffect, useCallback} from 'react';
import {Button} from "antd";
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1vh;
`;


const LoginContent = () => {

    const dispatch = useDispatch();
    const userInfo =  useSelector(({userInfo}) => userInfo);

    const testLogIn = useCallback((e) => {
        dispatch({type: 'userInfo/LOG_IN_REQUEST'});
    }, [dispatch]);
    

    return (
        <>
            {
                userInfo.me !== null
                ? <div>GOOD</div>
                :   <Wrapper>
                        <Button type="primary" onClick={testLogIn} loading={userInfo.logInLoading}>Kakao</Button>
                        <Button type="primary" onClick={testLogIn} loading={userInfo.logInLoading}>Google</Button>
                    </Wrapper>
            }
        </>
    );
};

export default LoginContent;