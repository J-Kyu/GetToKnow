import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import {BOTTOM_SHEET_RESULT} from "@/store/modules/bottomSheetState";
import {ROOM_TICKET_LIST_REQUEST} from "@/store/modules/roomTicketListState";

import {
    LOG_OUT_REQUEST
} from "@/store/modules/userInfo";

import TicketSheet from './TicketSheet';
import {Button} from 'antd';
import { useRouter } from 'next/router';



const MainWrapper = styled.div`
    display: flex;
    height: 10vh;
    width: 100%;
    align-items: center;
    flex-direction: column;
    
    // background-color: gray;
    font-size: 12px;
`

const SubTitleWrapper = styled.div`
    font-size: 1rem;
    color: white;
`
const MainTitleWrapper = styled.div`
    text-align: center;
    font-size: 2rem;
`


const Main = () => {

    const userInfo =  useSelector(({userInfo}) => userInfo);
    const roomTicketList =  useSelector(({roomTicketListState}) => roomTicketListState);

    //redux dispatch
    const dispatch = useDispatch();

    //router
    const router = useRouter();

    useEffect( () => {

        if(userInfo.me !== null){
            dispatch({type: ROOM_TICKET_LIST_REQUEST});
        }

    },[userInfo.me]);

    const logOut = () => {

        switch(userInfo.me.oauthType){
            case "KAKAO":{

                // const redirect_uri = "http://localhost:3000/";
                const redirect_uri = "http://52.78.139.73:80/";

                const client_id = "7a1c46fc786b5ec707331c14f8a4f95b";
                const KAKAO_LOG_OUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${client_id}&logout_redirect_uri=${redirect_uri}`;
                console.log("KAKAO Log Out");
                dispatch({type: LOG_OUT_REQUEST});

                window.location.replace(KAKAO_LOG_OUT_URL);

                break;
            }
            case "GOOGLE":{

                break;
            }
            case "DEFAULT":{

                dispatch({type: LOG_OUT_REQUEST});
                router.push('/');
                break;
            }
            default: {

            }
        }

    };

    return (
        <>
            <MainWrapper>
                <SubTitleWrapper>
                    H154
                </SubTitleWrapper>

                {
                    userInfo.me !== null
                    ? <Button type="primary" onClick={logOut}>Sign Out</Button>
                    : <></>

                }
                    

                <MainTitleWrapper>
                    Get To Know
                </MainTitleWrapper> 
                {
                    roomTicketList.ticketList !== null 
                    ? <TicketSheet ticketList={roomTicketList.ticketList}/>
                    : <div>NONE</div>
                }
            </MainWrapper> 
            
        </>
    );
};

export default Main;