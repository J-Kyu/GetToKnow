import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import {Col, Row, Select, Rate,Slider, TimePicker, DatePicker, Radio} from 'antd';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import {BOTTOM_SHEET_ROOM_QUESTIONS} from "store/modules/bottomSheetState";

const Wrapper = styled.div`
    color: white;
    text-align: center;
`;

const ContentsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5vh;
    padding: 5vw;
`;

const TitleWrapper = styled.div`
    font-size: 2rem;
    padding: 5vw;
`;

const SubmitWrapper = styled.div`
    margin: 5vh;
`;

const GenerateRoomContent = () => {

    const [size, setSize] = useState('middle');
    //types
    const options = [];
    for (let i = 10; i < 36; i++) {
      options.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
      });
    }

    //number
    const customIcons = {
        1: <FrownOutlined />,
        2: <FrownOutlined />,
        3: <MehOutlined />,
        4: <SmileOutlined />,
        5: <SmileOutlined />,
    };

    //Depth
    const marks = {
        1: '얕게',
        5: {
            style: {
              color: '#C0D8F8',
            },
            label: <strong>그저 그렇게</strong>,
          },
        10: {
          style: {
            color: '#f50',
          },
          label: <strong>깊게</strong>,
        },
      };

    //date format
    const format = 'HH:mm';

    //dispatch
    const dispatch = useDispatch();

    //Room Submit Handler
    const GenerateRoomHandler = useCallback(() => {
        dispatch({type: BOTTOM_SHEET_ROOM_QUESTIONS})
    });


    return (
        <>
           
            <Wrapper>
                {/* Title */}
                <TitleWrapper>
                    Room Code
                </TitleWrapper>

                {/* Contents */}
                <ContentsWrapper>
                    {/* Type */}
                    <Row gutter={[8, 16]}>
                        <Col span={8}>
                            유형
                        </Col>
                        <Col span={16}>
                            <Select
                                size={size}
                                defaultValue="a1"
                                // onChange={handleChange}
                                style={{
                                width: 200,
                                }}
                                options={options}
                            />
                        </Col>
                    </Row>

                    {/* Numb */}
                    <Row gutter={[8, 16]}>
                        <Col span={8}>
                            인원
                        </Col>
                        <Col span={16}>
                            <Rate defaultValue={2} character={({ index }) => index + 1} />
                        </Col>
                    </Row>

                    {/* Deth */}
                    <Row gutter={[8, 16]}>
                        <Col span={8}>
                            깊이
                        </Col>
                        <Col span={16}>
                            <Slider marks={marks}min={1} max={10} defaultValue={5} />
                        </Col>
                    </Row>

                    {/* Date */}
                    <Row gutter={[8, 16]}>
                        <Col span={8}>
                            날짜
                        </Col>
                        <Col span={8}>
                            <DatePicker/>
                        </Col>
                        <Col span={8}>
                            <TimePicker format={format} />
                        </Col>
                    </Row>
                </ContentsWrapper>

                {/* Buttons */}
                <SubmitWrapper>
                    <Radio.Button onClick={GenerateRoomHandler} value="default" size="large">방 만들기</Radio.Button>
                </SubmitWrapper>
            </Wrapper>

        </>
    );
};

export default GenerateRoomContent;