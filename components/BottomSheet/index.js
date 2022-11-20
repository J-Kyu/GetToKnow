import React, {useRef, useState, useEffect} from 'react';
import styled, { keyframes, css } from 'styled-components';
import BottomSheetHeader from './BottomSheetHeader';
import { useBottomSheet } from './useBottomSheet';
import { BOTTOM_SHEET_DBOTTOM_GAP, BOTTOM_SHEET_HEIGHT,BOTTOM_SHEET_DTOP_GAP} from 'configs/constants';

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
    transition: 1s;
`;



const BottomSheet = () => {

    const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
    const dirButtonRef = useRef();

    const {sheetRef} = useBottomSheet(dirButtonRef, bottomSheetOpen,setBottomSheetOpen);

    return (
        <>
            <Wrapper ref={sheetRef}>
                <BottomSheetHeader sheetRef={sheetRef} bottomSheetOpen={bottomSheetOpen} setBottomSheetOpen={setBottomSheetOpen} dirButtonRef={dirButtonRef} />
            </Wrapper>
        </>
    );
};

export default BottomSheet;