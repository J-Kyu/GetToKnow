import React, {useRef, useEffect} from 'react';
import styled, { keyframes } from 'styled-components';
import BottomSheetHeader from './BottomSheetHeader';
import { useBottomSheet } from './useBottomSheet';
import {TEST_VALUE, BOTTOM_SHEET_HEIGHT,BOTTOM_SHEET_DTOP_GAP} from 'configs/constants';



const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: fixed;
  z-index: 1;
  top: ${BOTTOM_SHEET_DTOP_GAP}%;
  bottom: 10px;
  left: 0;
  right: 0;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: black;

  height: ${BOTTOM_SHEET_HEIGHT}%;
  transform: translateY(0px);
`;



const BottomSheet = () => {

    const {sheetRef} = useBottomSheet();

    return (
        <>
            <Wrapper ref={sheetRef}>
                <BottomSheetHeader/>
            </Wrapper>
        </>
    );
};

export default BottomSheet;