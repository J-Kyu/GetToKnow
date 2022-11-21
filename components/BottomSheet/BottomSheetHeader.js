import React, {useCallback, useState, useRef} from 'react';
import styled from 'styled-components';
import { useBottomSheet } from './useBottomSheet';
import {Col, Row} from 'antd';
import {UpOutlined} from '@ant-design/icons';
import {BOTTOM_SHEET_HEIGHT,BOTTOM_SHEET_DBOTTOM_GAP} from 'configs/constants';
import PropTypes from 'prop-types';

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

  const downButtonRef = useRef();

  const handleSheetHeader = useCallback((e) => {

    const maxTransY = 0
    const minTransY = -window.innerHeight*(BOTTOM_SHEET_HEIGHT-BOTTOM_SHEET_DBOTTOM_GAP)/100;

    
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

  },[bottomSheetOpen]);

    return (
        <>
            <Wrapper>
              <Row style={{height: "100%"}}>
                <HCol span={16} style={{justifyContent: "left", paddingLeft: "10vw"}}>
                  <div style={{fontSize: "1.2rem" , color: "white"}}>로그인을 해주세요</div>
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