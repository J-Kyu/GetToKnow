import React, {useState,useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { Input, Button} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {ENTER_ROOM_REQUEST,ENTER_ROOM_RESET} from 'store/modules/enterRoom';
import {BOTTOM_SHEET_ANSWER_QUESTIONS} from 'store/modules/bottomSheetState';
import BottomSheetLoading from '../BottomSheetLoading';



const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5vh;
    height: 100%;

    margin-top: 10vh;

    text-align: center;
    font-size: 1.4rem;
`;


const ButtonWrapper = styled.div`
    margin-top: 10vh;
    bottom: 0px;
`;


const BottomSheetEntertRoom = () => {

    //state
    const [roomCode, setRoomCode] = useState("");

    //dispatch
    const dispatch = useDispatch();

    //selector
    const enterRoomState = useSelector(({enterRoom}) => enterRoom);

    const inputHandler = (e) => {
        setRoomCode(e.target.value);
    };


    //move on to ANswer questions
    useEffect(()=>{

        if(enterRoomState.requestRoom == true){
            dispatch({type: BOTTOM_SHEET_ANSWER_QUESTIONS});
            dispatch({type: ENTER_ROOM_RESET});

        }


    },[enterRoomState.requestRoom]);

    const connectHandler = useCallback(() => {
        dispatch({
            type: ENTER_ROOM_REQUEST,
            roomCode: roomCode
        });
    });

    //loading
    if (enterRoomState.requestRoom == false && enterRoomState.requestLoading == true){
        return(<BottomSheetLoading/>);
    }
    //Room Code
    else {
        return (
            <>
                <Wrapper>
                    <div>Room Code</div>
                    <Input 
                        value={roomCode}
                        placeholder="Romm Code"
                        onChange={inputHandler}
                    /> 
                    <ButtonWrapper>
                        <Button type="primary" size="large"  onClick={connectHandler} >접속</Button>
                    </ButtonWrapper>
                </Wrapper>
            </>
        );
    }
};

export default BottomSheetEntertRoom;