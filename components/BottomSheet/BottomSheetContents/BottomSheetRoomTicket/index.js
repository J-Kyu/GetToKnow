import React, {useEffect,useState} from 'react';
import styled from 'styled-components';
import { useQRCode } from 'next-qrcode';
import { useSelector, useDispatch } from 'react-redux';
import {UserOutlined} from '@ant-design/icons';
import {
    ROOM_INFO_REQUEST
} from 'store/modules/roomInfo';




const Wrapper = styled.div`
    color: white;


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


const BottomSheetRoomTicket = () => {

    const {Canvas} = useQRCode();
    const dispatch = useDispatch();
    const roomInfo = useSelector( ({roomInfo}) => roomInfo);

    const [totalUserNum, setTotalUserNum] = useState(0);
    const  [joinedUserNum, setJoinedUserNum] = useState(0);


    useEffect(() => {
        dispatch({type: ROOM_INFO_REQUEST})

    },[dispatch]);

    useEffect(()=>{
        console.log(roomInfo)
        if (roomInfo.info != null){
            setTotalUserNum(roomInfo.info.userMaxNum);
            setJoinedUserNum(roomInfo.info.joinedTicketNo.length);
        }

    },[roomInfo.info]);

    if (roomInfo.info == null){
        return(
        <>
            <div>NONE</div>
        </>
        );
    }
    else{

    return (
                <>
                    <Wrapper>
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
                            {/* Relase DATE */}
                            <ReleaseDateWrapper>{roomInfo.info.releaseDate} </ReleaseDateWrapper>
                            {/* Release TIME */}
                            <InMeetingTimeWrapper>
                                <ReleaseTimeWrapper>{roomInfo.info.releaseTime}~ </ReleaseTimeWrapper>
                                <EndTimeWrapper>{roomInfo.info.endTime}</EndTimeWrapper>

                            </InMeetingTimeWrapper>

                            {/* Room INFO */}
                            <InfoWrapper>
                                {/* TYPE */}
                                {roomInfo.info.roomState}

                                {/* ICONS */}
                                {function (){
                                    let userState = []
                                    // joined user
                                    for(let i = 0; i < joinedUserNum; i++){
                                        userState.push(<UserOutlined style={{color:"green"}}/>)
                                    }
                                    // left user
                                    for(let i = 0; i < totalUserNum-joinedUserNum; i++){
                                        userState.push(<UserOutlined style={{color:"gray"}}/>)
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