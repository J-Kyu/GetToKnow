import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';


import {ROOM_TICKET_LIST_REQUEST} from "@/store/modules/roomTicketListState";

import TicketSheet from './TicketSheet';
import RadarChart from './Chart';

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

    const dispatch = useDispatch();


    useEffect( () => {

        if(userInfo.me !== null){
            dispatch({type: ROOM_TICKET_LIST_REQUEST});
        }

    },[userInfo.me]);

    return (
        <>
            <MainWrapper>
                <SubTitleWrapper>
                    H154
                </SubTitleWrapper>
                <MainTitleWrapper>
                    Get To Know
                </MainTitleWrapper> 
                {
                    roomTicketList.ticketList !== null 
                    ? <TicketSheet ticketList={roomTicketList.ticketList}/>
                    : <div>NONE</div>
                }
                {/* <TicketSheet/> */}
            </MainWrapper> 
            
            {/* <RadarChart/> */}
        </>
    );
};

export default Main;