import React, {useCallback, useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { useBottomSheet } from './useBottomSheet';
import {Col, Row} from 'antd';
import {UpOutlined} from '@ant-design/icons';
import {BOTTOM_SHEET_HEIGHT,BOTTOM_SHEET_DBOTTOM_GAP,LOGIN_TRANSLATE_Y,ROOM_SELECT_TRANSLATE_Y, TEST_VALUE,BOTTOM_SHEET_MAX_HEIGHT} from 'configs/constants';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import {BOTTOM_SHEET_LOGIN,BOTTOM_SHEET_ROOM_LOBBY, BOTTOM_SHEET_GENERATE_ROOM, BOTTOM_SHEET_TEST, BOTTOM_SHEET_ROOM_QUESTIONS} from 'store/modules/bottomSheetState';


const Wrapper = styled.div`
  min-height: ${BOTTOM_SHEET_DBOTTOM_GAP}vh;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: relative;

`;

const Handle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 15vw;
  height: 1vh;
  border-radius: 2px;
  background-color: #d0d0d0;

`;

const HCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
`;


const BottomSheetHeader = ({sheetRef,bottomSheetOpen, setBottomSheetOpen, dirButtonRef }) => {

  //redux
  const userInfo =  useSelector(({userInfo}) => userInfo);
  const bottomSheetState = useSelector(({bottomSheetState}) => bottomSheetState);

  const downButtonRef = useRef();

  const maxTransY = 0
  const [minTransY, setMinTransY] = useState(0);
  const [headerTitle, setHeaderTitle] = useState("로그인을 해주세요");


  // init: set login height
  useEffect(() =>{ 
    setMinTransY(-window.innerHeight*(LOGIN_TRANSLATE_Y)/100);
  },[]);

  //set roomSelect
  useEffect(() => {

    switch (bottomSheetState.sheetState){
      case BOTTOM_SHEET_LOGIN: {
        setMinTransY(-window.innerHeight*(LOGIN_TRANSLATE_Y)/100);
        break;
      }
      case BOTTOM_SHEET_ROOM_LOBBY: {
        //set roomSelect hegiht on Bottom Sheet Height 
        setMinTransY(-window.innerHeight*(ROOM_SELECT_TRANSLATE_Y)/100);
        sheetRef.current.style.setProperty('transform', `translateY(${minTransY}px)`);

        
        //Update Header Title
        const title = userInfo.me.nickname + "님, 반갑습니다.";
        setHeaderTitle(title);
        break;
          
      }
      case BOTTOM_SHEET_GENERATE_ROOM: {
        //set roomSelect hegiht on Bottom Sheet Height 
        setMinTransY(-window.innerHeight*(BOTTOM_SHEET_MAX_HEIGHT)/100);
        sheetRef.current.style.setProperty('transform', `translateY(${minTransY}px)`);

      }      
      case BOTTOM_SHEET_ROOM_QUESTIONS: {
        //set roomSelect hegiht on Bottom Sheet Height 
        setMinTransY(-window.innerHeight*(BOTTOM_SHEET_MAX_HEIGHT)/100);
        sheetRef.current.style.setProperty('transform', `translateY(${minTransY}px)`);

      }
      case BOTTOM_SHEET_TEST: {
        //set roomSelect hegiht on Bottom Sheet Height 
        setMinTransY(-window.innerHeight*(TEST_VALUE)/100);
        sheetRef.current.style.setProperty('transform', `translateY(${minTransY}px)`);

        //Update Header Title
        const title = "THIS IS TEST";
        setHeaderTitle(title);

      }
      default: {
        //set roomSelect hegiht on Bottom Sheet Height 
        setMinTransY(-window.innerHeight*(TEST_VALUE)/100);
        sheetRef.current.style.setProperty('transform', `translateY(${minTransY}px)`);

        //Update Header Title
        const title = "NONE";
        setHeaderTitle(title);
      };
  }


    /*
    if(bottomSheetState.sheetState == BOTTOM_SHEET_LOGIN){
      //set login height on bottom sheet
      setMinTransY(-window.innerHeight*(LOGIN_TRANSLATE_Y)/100);
    }
    else if(bottomSheetState.sheetState == BOTTOM_SHEET_ROOM_LOBBY){
      //set roomSelect hegiht on Bottom Sheet Height 
      setMinTransY(-window.innerHeight*(ROOM_SELECT_TRANSLATE_Y)/100);
      sheetRef.current.style.setProperty('transform', `translateY(${minTransY}px)`);

      
      //Update Header Title
      const title = userInfo.me.nickname + "님, 반갑습니다.";
      setHeaderTitle(title);
    }
    //BOTTOM_SHEET_TEST
    else if(bottomSheetState.sheetState == BOTTOM_SHEET_TEST){
      //set roomSelect hegiht on Bottom Sheet Height 
      setMinTransY(-window.innerHeight*(TEST_VALUE)/100);
      sheetRef.current.style.setProperty('transform', `translateY(${minTransY}px)`);

      //Update Header Title
      const title = "THIS IS TEST";
      setHeaderTitle(title);
    }
    else{
      setMinTransY(-window.innerHeight*(BOTTOM_SHEET_HEIGHT - BOTTOM_SHEET_DBOTTOM_GAP)/100);
      sheetRef.current.style.setProperty('transform', `translateY(${minTransY}px)`);
    }
    */

  },[bottomSheetState,minTransY]);


  const handleSheetHeader = useCallback((e) => {   

    //decrease bottom sheet
    if (bottomSheetOpen == true){
      dirButtonRef.current.style.setProperty('transform', `rotate(0turn)`);
      sheetRef.current.style.setProperty('transform', `translateY(${maxTransY}px)`);
    }
    // increase bottom sheet
    else{
      dirButtonRef.current.style.setProperty('transform', `rotate(0.5turn)`);
      sheetRef.current.style.setProperty('transform', `translateY(${minTransY}px)`);
    }

    setBottomSheetOpen(!bottomSheetOpen);

  },[bottomSheetOpen,minTransY]);

    return (
        <>
            <Wrapper>
              <Row style={{height: "100%"}}>
                <HCol span={16} style={{justifyContent: "left", paddingLeft: "10vw"}}>
                  <div style={{fontSize: "1.2rem" , color: "white"}}>{headerTitle}</div>
                </HCol>
                <HCol span={8} >
                  <UpOutlined ref={dirButtonRef} onClick={handleSheetHeader} style={{color: "white", fontSize: '250%'}} />
                </HCol>
              </Row>
            </Wrapper>
        </>
    );
};


BottomSheetHeader.protoTypes ={
  sheetRef: PropTypes.object,
};

export default BottomSheetHeader;