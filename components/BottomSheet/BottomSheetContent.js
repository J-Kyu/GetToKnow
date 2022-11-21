import React from 'react';
import styled from 'styled-components';
import {BOTTOM_SHEET_DBOTTOM_GAP} from 'configs/constants';

const Wrapper = styled.div`
    // top: ${BOTTOM_SHEET_DBOTTOM_GAP}%;
    z-index: 3;
    height: 800px;
    width: 100%;
    color: white;
    background-color: gray;
    overflow: auto; 
    -webkit-overflow-scrolling: touch;
`;

const BottomSheetContent = ({contetRef}) => {
    return (
        <>
            <Wrapper ref = {contetRef}>
                <p>-------------TOP--------------</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>wow</p>
                <p>-----------DOWN----------------</p>


            </Wrapper>
        </>
    );
};

export default BottomSheetContent;