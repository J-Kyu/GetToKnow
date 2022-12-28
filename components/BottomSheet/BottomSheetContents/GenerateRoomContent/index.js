import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import {Col, Row, Select, Rate,Slider, TimePicker, DatePicker, Radio} from 'antd';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import {BOTTOM_SHEET_LOADING, BOTTOM_SHEET_ROOM_QUESTIONS} from "store/modules/bottomSheetState";

import {
    ROOM_GEN_REQUEST
} from 'store/modules/roomInfo';


const Wrapper = styled.div`
    color: white;
    text-align: center;
`;

const ContentsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3vh;
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

    const [roomType, setRoomType] = useState("TYPE_A");
    const [maxNum, setMaxNum] = useState(1);
    const [releaseDate, setReleaseDate] = useState("");
    const [releaseTime, setReleaseTime] = useState("");



    //types
    const options = [
        {value:"TYPE_A",label:"TYPE_A"},
        {value:"TYPE_B",label:"TYPE_B"},
        {value:"TYPE_C",label:"TYPE_C"},
        {value:"TYPE_D",label:"TYPE_D"}
    ];
   

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
    const timeFormat = 'HH:mm';
    const dateFormat = "yyyy-MM-DD";

    //time change function
    const onChangeTime = (time, timeString) => {
        console.log(timeString, typeof(timeString));
        setReleaseTime(timeString);

    };

    const onChangeDate = (date, dateString) => {
        console.log(dateString);
        setReleaseDate(dateString);
    };


    //dispatch
    const dispatch = useDispatch();

    //Room Submit Handler
    const GenerateRoomHandler = useCallback(() => {
        dispatch({type: BOTTOM_SHEET_ROOM_QUESTIONS})

        const releaseDateTime = releaseDate+"T"+releaseTime;
        console.log(releaseDateTime);
        dispatch({type: ROOM_GEN_REQUEST, 
            data: {
                roomType: roomType,
                maxNum: maxNum,
                releaseDateTime: releaseDateTime
            }
        });

    },[roomType,maxNum,releaseDate,releaseTime]);


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
                                defaultValue="TYPE_A"
                                onChange={(value)=>{setRoomType(value)}}
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
                            <Rate 
                                defaultValue={1} 
                                character={({ index }) => index + 1} 
                                onChange={(value)=>{setMaxNum(value)}}
                            />
                        </Col>
                    </Row>

                    {/* Deth */}
                    {/* <Row gutter={[8, 16]}>
                        <Col span={8}>
                            깊이
                        </Col>
                        <Col span={16}>
                            <Slider marks={marks}min={1} max={10} defaultValue={5} />
                        </Col>
                    </Row> */}

                    {/* Date */}
                    <Row gutter={[8, 16]}>
                        <Col span={8}>
                            날짜
                        </Col>
                        <Col span={8}>
                            <DatePicker format={dateFormat} onChange={onChangeDate}/>
                        </Col>
                        <Col span={8}>
                            <TimePicker format={timeFormat}  onChange={onChangeTime}/>
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