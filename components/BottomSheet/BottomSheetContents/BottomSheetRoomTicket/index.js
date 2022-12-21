import React, {useEffect,useState} from 'react';
import styled from 'styled-components';
import { useQRCode } from 'next-qrcode';
import { useSelector, useDispatch } from 'react-redux';
import {UserOutlined} from '@ant-design/icons';
import {
    ROOM_INFO_REQUEST
} from 'store/modules/roomInfo';

import BottomSheetLoading from '../BottomSheetLoading';



const Wrapper = styled.div`
    color: white;
`;

const RoomCodeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1vh;
    
`;


const QRWrapper = styled.div`
display: flex;
justify-content: center;
    
`;

const TicketInfoWrapper = styled.div`
display: flex;
flex-direction: column;
margin-top: 1vh;


`;

const ReleaseDateWrapper = styled.div`
    font-size: 1.5rem;
`;
const InMeetingTimeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`;

const ReleaseTimeWrapper = styled.div`
    font-size: 3.0rem;
`;
const EndTimeWrapper = styled.div`
    font-size: 1.5rem;
`;
const InfoWrapper = styled.div`
    display: flex;
    font-size: 1.2rem;
    flex-direction: row;
    align-items: center;
`;

const WarningWrapper = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1vh;

    background-color: #D3D3D3;
    border-radius: 3%;


    margin-top: 2vh;
    margin-bottom: 5vh;

    font-size: 1rem;


    color: black;
    text-align: center;
`;




//npm install @svgr/webpack


const BottomSheetRoomTicket = ({roomCode}) => {

    const {Canvas} = useQRCode();
    const dispatch = useDispatch();

    const roomInfo = useSelector( ({roomInfo}) => roomInfo);

    const [releaseDate,setReleaseDate] = useState("");
    const [releaseTime,setReleaseTime] = useState("");

    useEffect(() => {
        // request room info
        dispatch({
            type: ROOM_INFO_REQUEST,
            roomCode: roomCode
        })

    },[dispatch]);


    useEffect(() => {

        if (roomInfo.info == null){
            return;
        }


        if (roomInfo.info.releaseDateTime != null){
            const dateTime = roomInfo.info.releaseDateTime.split('T');
            //Date
            const date = dateTime[0].split('-');
            setReleaseDate(date[0]+"년"+date[1]+"월"+date[2]+"일");

            //Time
            const time = dateTime[1].split(':');
            setReleaseTime(time[0]+"시"+time[1]+"분"); //Time

        }

    },[roomInfo.info]);


    //loading
    if (roomInfo.info == null){
        return(
        <>
            <BottomSheetLoading/>
        </>
        );
    }
    //Roo Ticket
    else{

        return (
                    <>
                        <Wrapper>
                            {/* Room Code  */}
                            <RoomCodeWrapper>
                                <div style={{fontSize: "1rem"}}>Room Code</div>
                                <div style={{fontSize: "1.5rem"}}>#{roomCode}</div>
                            </RoomCodeWrapper>

                            {/* QR Code */}
                            <QRWrapper>
                                <Canvas text={'https://google.com'}
                                    options={{
                                        level: 'm',
                                        margin: 2,
                                        scale: 4,
                                        width: 200,
                                        color: {
                                            dark: '#010599FF',
                                            light: '#FFBF60FF',
                                        },
                                    }}
                                />
                            </QRWrapper>

                            {/* INFO */}
                            <TicketInfoWrapper>
                                Release At
                                {/* Relase DATE */}
                                <ReleaseDateWrapper>{releaseDate}</ReleaseDateWrapper>
                                {/* Release TIME */}
                                <InMeetingTimeWrapper>
                                    <ReleaseTimeWrapper>{releaseTime}</ReleaseTimeWrapper>
                                    {/* <EndTimeWrapper>{roomInfo.info.endTime}</EndTimeWrapper> */}

                                </InMeetingTimeWrapper>

                                {/* Room INFO */}
                                <InfoWrapper>
                                    {/* TYPE */}
                                    <div style={{marginRight: "3vw"}}>{roomInfo.info.roomState}</div>

                                    {/* ICONS */}
                                    {function (){
                                        let userState = []
                                        let keyIndex = 0
                                        // joined user
                                        /*for(let i = 0; i < joinedUserNum; i++){
                                            userState.push(<UserOutlined style={{color:"green"}} key={keyIndex}/>)
                                            keyIndex += 1;
                                        }
                                        // left user
                                        for(let i = 0; i < totalUserNum-joinedUserNum; i++){
                                            userState.push(<UserOutlined style={{color:"gray"}}  key={keyIndex}/>)
                                            keyIndex += 1;
                                        }*/
                                        for(let i = 0; i < roomInfo.info.maxNum; i++){
                                            userState.push(<UserOutlined style={{color:"gray"}}  key={keyIndex}/>)
                                            keyIndex += 1;
                                        }
                                        return userState;
                                    }()}
                                </InfoWrapper>
                                {/* WARNING */}
                                <WarningWrapper>
                                    <div>* 주의 사항 1번은 다음과 같습니다.</div>
                                    <div>* 주의 사항 2번은 다음과 같습니다.</div>
                                    <div>* 주의 사항 3번은 다음과 같습니다.</div>
                                </WarningWrapper>
                            </TicketInfoWrapper>


                        </Wrapper>
                    </>
                );
    }
};

export default BottomSheetRoomTicket;