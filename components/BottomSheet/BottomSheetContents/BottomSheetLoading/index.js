import React from 'react';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import {BOTTOM_SHEET_MAX_HEIGHT} from 'configs/constants';

const Wrapper = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: ${BOTTOM_SHEET_MAX_HEIGHT}vh;
    justify-content: space-evenly;
`;



const BottomSheetLoading = () => {
    return (
        <>
            <Wrapper>
                <LoadingOutlined
                    style={{
                    fontSize: 150,
                    }}
                    spin
                />
                <div style={{fontSize: "1.5rem"}}>
                    Loading....
                </div>
            </Wrapper>
        </>
    );
};

export default BottomSheetLoading;