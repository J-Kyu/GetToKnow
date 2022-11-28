import React, {useCallback} from 'react';
import {Button, Radio} from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {BOTTOM_SHEET_GENERATE_ROOM, BOTTOM_SHEET_ENTER_ROOM} from "store/modules/bottomSheetState";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10vw;
`;


const index = () => {

    const dispatch = useDispatch();

    const GenerateRoomHandler = useCallback((e) => {
        dispatch({type: BOTTOM_SHEET_GENERATE_ROOM})
    });

    const EnterRoomHandler = useCallback((e) => {
        dispatch({type: BOTTOM_SHEET_ENTER_ROOM})
    });

    return (
        <>
            <Wrapper>
               <Radio.Button value="default" size="large" onClick={GenerateRoomHandler}>방 만들기</Radio.Button>
                <Radio.Button value="default" size="large" onClick={EnterRoomHandler}>방 들어가기</Radio.Button>
            </Wrapper>
        </>
    );
};

export default index;