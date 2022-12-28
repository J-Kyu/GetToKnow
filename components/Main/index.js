import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';


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
                    userInfo.me !== null 
                    ? <div>Good</div>
                    : <div>Bad</div>
                }
                {/* <TicketSheet/> */}
            </MainWrapper> 
            
            {/* <RadarChart/> */}
        </>
    );
};

export default Main;