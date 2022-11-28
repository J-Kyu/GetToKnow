import React, {useRef, useState, useEffect} from 'react';
import styled, { keyframes, css } from 'styled-components';
import BottomSheetHeader from './BottomSheetHeader/BottomSheetHeader';
import { useBottomSheet } from './BottomSheetHeader/useBottomSheet';
import { BOTTOM_SHEET_DBOTTOM_GAP, BOTTOM_SHEET_HEIGHT,BOTTOM_SHEET_DTOP_GAP} from 'configs/constants';
import BottomSheetContent from './BottomSheetContents/BottomSheetContent';


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    position: fixed;
    z-index: 1;
    top: ${BOTTOM_SHEET_DTOP_GAP}%;
    // top: 0%;

    // bottom: 10px;
    left: 0;
    right: 0;

    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: black;

    height: ${BOTTOM_SHEET_HEIGHT}%;
    transition: transform 1s ease-out;;
`;



const BottomSheet = () => {

    // redux
    const [bottomSheetOpen, setBottomSheetOpen] = useState(false);


    const dirButtonRef = useRef(); //header direction button reference

    const {sheetRef, contentRef} = useBottomSheet(dirButtonRef, bottomSheetOpen,setBottomSheetOpen);

    return (
        <>
            <Wrapper ref={sheetRef}>
                <BottomSheetHeader sheetRef={sheetRef} bottomSheetOpen={bottomSheetOpen} dirButtonRef={dirButtonRef} />
                <BottomSheetContent contetRef={contentRef}/>
            </Wrapper>
        </>
    );
};

export default BottomSheet;