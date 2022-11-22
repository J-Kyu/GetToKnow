import React from 'react';
import {Button, Radio} from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10vw;
`;



const index = () => {
    return (
        <>
            <Wrapper>
               <Radio.Button value="default" size="large">방 만들기</Radio.Button>
                <Radio.Button value="default" size="large">방 들어가기</Radio.Button>
            </Wrapper>
        </>
    );
};

export default index;