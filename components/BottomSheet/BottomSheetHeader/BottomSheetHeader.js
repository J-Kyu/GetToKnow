import React, {useCallback, useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { useBottomSheet } from './useBottomSheet';
import {Col, Row} from 'antd';
import {UpOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import {BOTTOM_SHEET_HEIGHT,BOTTOM_SHEET_DBOTTOM_GAP,LOGIN_TRANSLATE_Y,ROOM_SELECT_TRANSLATE_Y, TEST_VALUE,BOTTOM_SHEET_MAX_HEIGHT} from 'configs/constants';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import BottomSheetOptionButton from './BottomSheetOptionButton';
import {
  BOTTOM_SHEET_LOGIN,
  BOTTOM_SHEET_ROOM_LOBBY, 
  BOTTOM_SHEET_GENERATE_ROOM, 
  BOTTOM_SHEET_TEST, 
  BOTTOM_SHEET_ROOM_QUESTIONS, 
  BOTTOM_SHEET_ROOM_TICKET,
  BOTTOM_SHEET_ENTER_ROOM,
  BOTTOM_SHEET_ANSWER_QUESTIONS,
  BOTTOM_SHEET_RESULT,
  BOTTOM_SHEET_ON,
  BOTTOM_SHEET_OFF
} from 'store/modules/bottomSheetState';


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



const BottomSheetHeader = ({sheetRef, setBottomSheetOpen, dirButtonRef }) => {

  //redux
  const userInfo =  useSelector(({userInfo}) => userInfo);
  const bottomSheetState = useSelector(({bottomSheetState}) => bottomSheetState);
  const roomInfo = useSelector( ({roomInfo}) => roomInfo);

  //saga
  const dispatch = useDispatch();

  const optionButtonRef = useRef();

  const maxTransY = 0
  const [minTransY, setMinTransY] = useState(0);
  const [headerTitle, setHeaderTitle] = useState("로그인을 해주세요");
  const [showOptionBtn, setShowOptionBtn] = useState(false);

  // init: set login height
  useEffect(() =>{ 
    setMinTransY(-window.innerHeight*(LOGIN_TRANSLATE_Y)/100);
  },[]);

  //set roomSelect
  useEffect(() => {

    switch (bottomSheetState.sheetState){
      case BOTTOM_SHEET_LOGIN: {
        setMinTransY(-window.innerHeight*(LOGIN_TRANSLATE_Y)/100);
        setHeaderTitle("로그인 해주세요");
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

        //setting title
        setHeaderTitle("방 만드는 중...");
        break;


      }      
      case BOTTOM_SHEET_ROOM_QUESTIONS: {
        //set roomSelect hegiht on Bottom Sheet Height 
        setMinTransY(-window.innerHeight*(BOTTOM_SHEET_MAX_HEIGHT)/100);
        sheetRef.current.style.setProperty('transform', `translateY(${minTransY}px)`);

        //setting title
        setHeaderTitle("방 만드는 중...");
        break;



      }
      case BOTTOM_SHEET_TEST: {
        //set roomSelect hegiht on Bottom Sheet Height 
        setMinTransY(-window.innerHeight*(TEST_VALUE)/100);
        sheetRef.current.style.setProperty('transform', `translateY(${minTransY}px)`);

        //Update Header Title
        const title = "THIS IS TEST";
        setHeaderTitle(title);
        break;

      }
    case BOTTOM_SHEET_ROOM_TICKET: {
      //set roomSelect hegiht on Bottom Sheet Height 
      setMinTransY(-window.innerHeight*(BOTTOM_SHEET_MAX_HEIGHT)/100);
      sheetRef.current.style.setProperty('transform', `translateY(${minTransY}px)`);

      //Update Header Title
      setHeaderTitle("Room Ticket");

      break;
    }
    case BOTTOM_SHEET_ENTER_ROOM: {
      //set roomSelect hegiht on Bottom Sheet Height 
      setMinTransY(-window.innerHeight*(BOTTOM_SHEET_MAX_HEIGHT)/100);
      sheetRef.current.style.setProperty('transform', `translateY(${minTransY}px)`);

      //Update Header Title
      setHeaderTitle("방 접속");

      break;
    }
    case BOTTOM_SHEET_ANSWER_QUESTIONS: {
      //set roomSelect hegiht on Bottom Sheet Height 
      setMinTransY(-window.innerHeight*(BOTTOM_SHEET_MAX_HEIGHT)/100);
      sheetRef.current.style.setProperty('transform', `translateY(${minTransY}px)`);

      //Update Header Title
      setHeaderTitle("답 하기");

      break;
    }
    case  BOTTOM_SHEET_RESULT:{
      setMinTransY(-window.innerHeight*(BOTTOM_SHEET_MAX_HEIGHT)/100);
      sheetRef.current.style.setProperty('transform', `translateY(${minTransY}px)`);

      //Update Header Title
      setHeaderTitle("결과");
      break;
    }
    default: {
      //set roomSelect hegiht on Bottom Sheet Height 
      setMinTransY(-window.innerHeight*(BOTTOM_SHEET_MAX_HEIGHT)/100);
      sheetRef.current.style.setProperty('transform', `translateY(${minTransY}px)`);

      //Update Header Title
      const title = "NONE";
      setHeaderTitle(title);
    };
  }


  },[bottomSheetState,minTransY]);


  // control bottom sheet open controll function
  useEffect(()=>{
    //decrease bottom sheet
    if (bottomSheetState.sheetOpen == false){
      //set button direction
      dirButtonRef.current.style.setProperty('transform', `rotate(0turn)`);
      //set bottom sheet max translate
      sheetRef.current.style.setProperty('transform', `translateY(${maxTransY}px)`);

    }
    // increase bottom sheet
    else{
      //set button direction
      dirButtonRef.current.style.setProperty('transform', `rotate(0.5turn)`);
      //set bottom sheet max translate
      sheetRef.current.style.setProperty('transform', `translateY(${minTransY}px)`);

    }


  },[bottomSheetState.sheetOpen]);
  
  //bottom open button handler
  const handleSheetHeader = useCallback((e) => {   
     //current sheet is closed
    if (bottomSheetState.sheetOpen == false){
      //Open Bottom Sheet
      dispatch({type: BOTTOM_SHEET_ON});
    }
    //current sheet is openned
    else{
      //Close Bottom Sheet
      dispatch({type: BOTTOM_SHEET_OFF});
    }
  },[bottomSheetState.sheetOpen]);


  return (
      <>
          <Wrapper>
            <Row style={{height: "100%"}}>
              <HCol span={16} style={{justifyContent: "left", paddingLeft: "5vw"}}>
                <BottomSheetOptionButton/>
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