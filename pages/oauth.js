import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {LOG_IN_REQUEST} from 'store/modules/userInfo';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { useRouter } from 'next/router';

const oauth = () => {

    const router = useRouter();

    const dispatch = useDispatch();

    const userInfo =  useSelector(({userInfo}) => userInfo);

    // random nickname
    const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });

    const GenNickname = () => uniqueNamesGenerator({
        dictionaries: [colors,adjectives, animals], // colors can be omitted here as not used
        separator: ' ',
        style: 'capital'
      })


    function requestToken(code){

        const grant_type = "authorization_code";
        const client_id = "7a1c46fc786b5ec707331c14f8a4f95b";
        // const redirect_uri = "http://localhost:3000/oauth";
        const redirect_uri = "http://52.78.139.73:80/oauth";
        // const redirect_uri = "http://192.168.35.57:3000/oauth";


        const kakaoURL = "https://kauth.kakao.com/oauth/token?client_id=" + client_id +
        "&redirect_uri=" + redirect_uri + 
        "&grant_type=authorization_code" + 
        "&code="+ code;

        return axios.post(
                kakaoURL,
                {withCredentials: false}
            );
    
    }

    
    function RequestUserId(accessToken){


        if (accessToken == null){
            return;
        }


        axios.post(
            'https://kapi.kakao.com/v2/user/me',
            {withCrednetials: false},
            {headers: {
                // 'Host': 'kapi.kakao.com',
                'Authorization': 'Bearer '+accessToken,
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }
        ).then((res) => {
            //Log in to Back-end
            dispatch(
                {
                    type: LOG_IN_REQUEST, 
                    data: {
                        oauthType: "KAKAO",
                        nickname: GenNickname(),
                        uuid: res.data.id,
                        accessToken: accessToken
                    }
                });
            console.log("oAuth-", res);
        });

    };

    useEffect(()=> {
        const params = new URL(document.location.toString()).searchParams;
        const code = params.get("code"); // 인가코드 받는 부분
        const grant_type = "authorization_code";
        const client_id = "7a1c46fc786b5ec707331c14f8a4f95b";
        // const redirect_uri = "http://192.168.35.57:3000/oauth";
        const redirect_uri = "http://52.78.139.73:80/oauth";



        //인가 코드 받기
        requestToken(code)
        .then((res) => {
            console.log("->",res);
            RequestUserId(res.data.access_token);
        });
  
    }, []);

    useEffect(() => {

        if (userInfo.me == null){
            return;
        }

        console.log('-> ',userInfo.me);
        //Check User Info 
        router.push('/');

    },[userInfo.me]);
        
    return (
        <div>
            this is test!
        </div>
    );
};

export default oauth;