import React, {useState,useEffect, useCallback} from 'react';
import RadarChart from './Chart';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { faker } from '@faker-js/faker';

import {
    ROOM_RESULT_REQUEST
} from '@/store/modules/roomResultState';


import BottomSheetLoading from '@/components/BottomSheet/BottomSheetContents/BottomSheetLoading';


const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

`;



const TitleWrapper = styled.div`
    font-size: 2rem;
    color: white;
`;

const ContextWrapper = styled.div`
    
    background-color: white;
    opacity: 0.7;
    border-radius: 5vw;
    width: 100%;
    color: black;
    padding: 1rem;

    margin-bottom: 5vh;
    margin-top: 5vh;

}
`;



const BottomSheetResult = ({roomCode}) => {


    //dispatch
    const dispatch = useDispatch();

    //redux state
    const roomResultState = useSelector(({roomResultState}) => roomResultState);


    useEffect(() => {
        console.log(roomCode);
        dispatch({
            type: ROOM_RESULT_REQUEST,
            roomCode: roomCode
        });
    },[roomCode]);

    console.log(roomResultState);

    if(roomResultState.roomResult == null){
        return(<BottomSheetLoading/>);

    }
    else{
        return (
            <>
                <MainWrapper>
                    <RadarChart data={roomResultState.roomResult}/>
                    <TitleWrapper>
                        {faker.address.streetName()}
                    </TitleWrapper>
                    <ContextWrapper>
                        {faker.lorem.paragraph()}
                    </ContextWrapper>

                </MainWrapper>
            </>
        );
    }
};

export default BottomSheetResult;