import React from 'react';
import styled from 'styled-components';

const MainWrapper = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    
    background-color: gray;
    font-size: 12px;
`
const SubTitleWrapper = styled.div`
    position: absolute;
    left: 5vw;
    top: 5vw;
    display: block;
    font-size: 10vw;
    color: white;
`
const MainTitleWrapper = styled.div`
    
    position: absolute;
    display: block;

    top: 20vh;

    text-align: center;
    font-size: 18vw;
`

const Main = () => {
    return (
        <>
            <MainWrapper>
                <SubTitleWrapper>
                    H154
                </SubTitleWrapper>
                <MainTitleWrapper>
                    Get To Know
                </MainTitleWrapper>
            </MainWrapper>
        </>
    );
};

export default Main;