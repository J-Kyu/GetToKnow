import React,{useEffect} from 'react';
import styled from 'styled-components';
import LoginContent from './LoginSheet/LoginContent';
import {BOTTOM_SHEET_DBOTTOM_GAP} from 'configs/constants';
import { useSelector, useDispatch } from 'react-redux';
import RoomButton from 'components/BottomSheet/BottomSheetContents/RoomButton';

import {BOTTOM_SHEET_LOGIN,BOTTOM_SHEET_ROOM_LOBBY,BOTTOM_SHEET_GENERATE_ROOM,BOTTOM_SHEET_TEST, BOTTOM_SHEET_LOADING,BOTTOM_SHEET_ROOM_QUESTIONS,BOTTOM_SHEET_ROOM_TICKET,BOTTOM_SHEET_ENTER_ROOM,BOTTOM_SHEET_ANSWER_QUESTIONS} from 'store/modules/bottomSheetState';

import GenerateRoomContent from 'components/BottomSheet/BottomSheetContents/GenerateRoomContent';

import BottomSheetLoading from 'components/BottomSheet/BottomSheetContents/BottomSheetLoading';

import BottomSheetRoomQuestions from 'components/BottomSheet/BottomSheetContents/BottomSheetRoomQuestions'

import BottomSheetRoomTicket from './BottomSheetRoomTicket';

import BottomSheetEntertRoom from './BottomSheetEntertRoom';

import BottomSheetAnswerQuestions from './BottomSheetAnswerQuestions';

const Wrapper = styled.div`
    position: relative;
    margin-left: 5vw;
    margin-right: 5vw;


    color: white;
    // background-color: gray;
    overflow-x: hidden; 

    overflow-y: auto; 

    height: 100%;

`;

const BottomSheetContent = ({contetRef}) => {

    //redux
    const userInfo =  useSelector(({userInfo}) => userInfo);
    const bottomSheetState = useSelector(({bottomSheetState}) => bottomSheetState);
    const dispatch = useDispatch();

    //BOTTOM_SHEET_ROOM_LOBBY
    switch (bottomSheetState.sheetState){
        case BOTTOM_SHEET_LOGIN: {
            return (
                <>
                    <Wrapper ref = {contetRef}>
                        <LoginContent/>
                    </Wrapper>
                </>
            );

        }
        case BOTTOM_SHEET_LOADING:{
            return (
                <>
                    <Wrapper ref = {contetRef}>
                        <BottomSheetLoading/>
                    </Wrapper>
                </>
            );
        }
        case BOTTOM_SHEET_ROOM_LOBBY: {
            return (
                <>
                    <Wrapper ref = {contetRef}>
                        <RoomButton/>
                    </Wrapper>
                </>
            );
            
        }
        case BOTTOM_SHEET_ENTER_ROOM: {
            return (
                <>
                    <Wrapper ref = {contetRef}>
                        <BottomSheetEntertRoom/>
                    </Wrapper>
                </>
            );
            
        }
        case BOTTOM_SHEET_ANSWER_QUESTIONS: {
            return (
                <>
                    <Wrapper ref = {contetRef}>
                        <BottomSheetAnswerQuestions roomCode={bottomSheetState.data}/>
                    </Wrapper>
                </>
            );
            
        }

        case BOTTOM_SHEET_GENERATE_ROOM: {
            return(
                <>
                    <Wrapper ref = {contetRef}>
                        <GenerateRoomContent/>
                    </Wrapper>
                </>
            );
        }
        // BOTTOM_SHEET_ROOM_QUESTIONS
        case BOTTOM_SHEET_ROOM_QUESTIONS: {
            return(
                <>
                    <Wrapper ref = {contetRef}>
                        <BottomSheetRoomQuestions/>
                    </Wrapper>
                </>
            );
        }
        // BottomSheetRoomTicket
        case BOTTOM_SHEET_ROOM_TICKET: {
            return(
                <>
                    <Wrapper ref = {contetRef}>
                        <BottomSheetRoomTicket roomCode={bottomSheetState.data}/>
                    </Wrapper>
                </>
            );
        }
        default: {
            return(
                <>
                    <div style={{color: "white"}}>NONE</div>
                </>
            );
        }
    }

   
};

export default BottomSheetContent;