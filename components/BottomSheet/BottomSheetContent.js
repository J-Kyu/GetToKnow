import React from 'react';
import styled from 'styled-components';
import {BOTTOM_SHEET_DBOTTOM_GAP} from 'configs/constants';

const Wrapper = styled.div`
    position: relative;
    margin-left: 5vw;
    margin-right: 5vw;


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
                <p>-----------DOWN----------------</p>


            </Wrapper>
        </>
    );
};

export default BottomSheetContent;