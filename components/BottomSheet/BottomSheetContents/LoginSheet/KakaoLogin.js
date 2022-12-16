import React from 'react';
import styled from 'styled-components';
import {Button} from 'antd';


const KakaoBtnImg = styled.div`
    background-image: url("../src/img/kakao_login_medium_narrow.png");
    background-position: center;
    border-style: solid;
    border-Color: blue;

    background-repeat: no-repeat;
    background-size : contain;
    width: 300px;
    height: 70px;
    z-index: 3;
    // margin: auto;
`;

const CLIENT_ID = "	7a1c46fc786b5ec707331c14f8a4f95b";
const REDIRECT_URI =  "http://localhost:3000/oauth";
// const REDIRECT_URI =  "http://192.168.35.57:3000/oauth";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const KakaoLogin = () => {

    const Login = () => {
       window.location.replace(KAKAO_AUTH_URL);
    };

    return (
            <>
               <Button type="primary" onClick={Login}>Kakao</Button>
            </>
        );
};

export default KakaoLogin;