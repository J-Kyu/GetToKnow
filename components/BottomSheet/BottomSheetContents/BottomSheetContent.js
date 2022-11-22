import React,{useEffect} from 'react';
import styled from 'styled-components';
import LoginContent from './LoginContent';
import {BOTTOM_SHEET_DBOTTOM_GAP} from 'configs/constants';
import { useSelector, useDispatch } from 'react-redux';
import RoomButton from 'components/BottomSheet/BottomSheetContents/RoomButton';

import {BOTTOM_SHEET_LOGIN,BOTTOM_SHEET_ROOM_LOBBY} from 'store/modules/bottomSheetState';


const Wrapper = styled.div`
    position: relative;
    margin-left: 5vw;
    margin-right: 5vw;


    color: white;
    background-color: gray;
    overflow: auto; 

`;

const BottomSheetContent = ({contetRef}) => {

    //redux
    const userInfo =  useSelector(({userInfo}) => userInfo);
    const bottomSheetState = useSelector(({bottomSheetState}) => bottomSheetState);
    const dispatch = useDispatch();

    useEffect(() =>{
        
        if(userInfo.me == null){
            dispatch({type: BOTTOM_SHEET_LOGIN});
        }
        else{
            dispatch({type: BOTTOM_SHEET_ROOM_LOBBY});
        }


    }, [userInfo]);


    if (userInfo.me == null){
        return (
            <>
                <Wrapper ref = {contetRef}>
                    <LoginContent/>
                </Wrapper>
            </>
        );
    }
    else{

        return (
            <>
                <Wrapper ref = {contetRef}>
                    <RoomButton/>
                </Wrapper>
            </>
        );
    }
};

export default BottomSheetContent;