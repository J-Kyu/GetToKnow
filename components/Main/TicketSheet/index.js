import React, {useCallback,useState,useEffect} from 'react';
import styled from 'styled-components';
import Avatar, { genConfig } from 'react-nice-avatar'
import {Button} from 'antd';
import Countdown from "react-countdown";
import { useDispatch } from 'react-redux';
import {UserOutlined} from '@ant-design/icons';
import {BOTTOM_SHEET_ON,BOTTOM_SHEET_ANSWER_QUESTIONS} from '@/store/modules/bottomSheetState';


const SheetWrapper = styled.div` 
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 5vw;


    // background-color: white;
    // opacity: 0.7;
    // border-radius: 5vw;
`;


const TicketWrapper = styled.div`
    
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5vw;
    padding: 5vw;
    margin-bottom: 5vh;


    background-color: white;
    opacity: 0.7;
    border-radius: 5vw;
    width: 100%;
}
`;

const IconWrapper = styled.div``;

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    
    align-items: flex-start;
    justify-content: center;

`;


const mockData = [
    {
        roomCode: "jmpyuz",
        maxNum: 3,
        roomState: "PRE_MEETING",
        roomType: "Type_A",
        releaseDate: "2022-12-28 19:00:00"
    },
    {
        roomCode: "123xc",
        maxNum: 5,
        roomState: "PRE_MEETING",
        roomType: "Type_A",
        releaseDate: "2022-12-28 20:00:00"
    },
    {
        roomCode: "zxc321",
        maxNum: 2,
        roomState: "PRE_MEETING",
        roomType: "Type_A",
        releaseDate: "2022-12-29 19:00:00"
    }
    ,    {
        roomCode: "zxcva2",
        maxNum: 1,
        roomState: "PRE_MEETING",
        roomType: "Type_A",
        releaseDate: "2023-12-28 19:00:00"
    }
]



const TicketSheet = ({ticketList}) => {

    return (
        <>
            <SheetWrapper>
                <TicketElementList ticketList={ticketList}/>
            </SheetWrapper>

        </>
    );
};


const TicketElementList= ({ticketList}) => {
    console.log(ticketList);

    const listRender = [];

    for (let i = 0; i < ticketList.length; i++){
        listRender.push(<TicketElement key={i} roomInfo={ticketList[i].roomDTO} ticketState={ticketList[i].ticketState}/>)
    }

    return(
        <>
            {listRender}
        </>
    );
};



const TicketElement = ({roomInfo, ticketState}) => {


    const config = genConfig(roomInfo.code) ;
    const releaseTime = new Date(roomInfo.releaseDateTime).getTime(); 
    const dispatch = useDispatch();
    
    const [clientRender, setClientRender] = useState(false);

    //prevent hydration error
    useEffect(() => {
        setClientRender(true);
    },[]);

    if (clientRender === false){
        return (<></>);
    }

    if(ticketState == "READY"){
        return(
            <>
                <TicketWrapper>
                    <ReadyTicketElement roomInfo={roomInfo}/>
                </TicketWrapper>
            </>
        );
    }
    else if(ticketState == "DONE"){
        return(
            <>
                <TicketWrapper>
                    <DoneTicketElement roomInfo={roomInfo}/>
                </TicketWrapper>
            </>
        );
    }


 
}

const ReadyTicketElement = ({roomInfo}) => {

    const config = genConfig(roomInfo.code) ;
    const releaseTime = new Date(roomInfo.releaseDateTime).getTime(); 
    const dispatch = useDispatch();


    const ReadyButtonHandler = useCallback(() => {
        //go to answer question sheet
        dispatch({
            type: BOTTOM_SHEET_ANSWER_QUESTIONS,
            data: roomInfo.code
        });
        //open bottom sheet
        dispatch({type: BOTTOM_SHEET_ON });
    });

    return(
        <>
            <IconWrapper>
                <Avatar style={{ width: '15vh', height: '15vh' }} {...config}/>
            </IconWrapper>
            <InfoWrapper>
                <div style={{fontSize: "2rem"}}>
                    #{roomInfo.code}
                </div>
                <div>
                    {roomInfo.roomType}
                </div>
                <div>
                    {roomInfo.roomState}
                </div>
                <div>
                {/* User Max Num */}
                {function (){
                    let userState = []
                    let keyIndex = 0
                    for(let i = 0; i < roomInfo.maxNum; i++){
                        userState.push(<UserOutlined style={{color:"gray"}}  key={keyIndex}/>)
                        keyIndex += 1;
                    }
                    return userState;
                    }()
                }
                </div>
                <Button type='primary' onClick={ReadyButtonHandler}>
                    <Countdown date={releaseTime} renderer={renderer}/>
                </Button>

            </InfoWrapper>
        </>
    );
}

const DoneTicketElement = ({roomInfo}) => {

    const config = genConfig(roomInfo.code) ;
    const releaseTime = new Date(roomInfo.releaseDateTime).getTime(); 
    const dispatch = useDispatch();

    const [complete, setComplete] = useState(false);

    const DoneButtonHandler = useCallback(() => {
        //go to answer question sheet

        //open bottom sheet
        dispatch({type: BOTTOM_SHEET_ON });
    });

    return(
        <>
            <IconWrapper>
                <Avatar style={{ width: '15vh', height: '15vh' }} {...config}/>
            </IconWrapper>
            <InfoWrapper>
                <div style={{fontSize: "2rem"}}>
                    #{roomInfo.code}
                </div>
                <div>
                    {roomInfo.roomType}
                </div>
                <div>
                    {roomInfo.roomState}
                </div>
                <div>
                {/* User Max Num */}
                {function (){
                    let userState = []
                    let keyIndex = 0
                    for(let i = 0; i < roomInfo.maxNum; i++){
                        userState.push(<UserOutlined style={{color:"gray"}}  key={keyIndex}/>)
                        keyIndex += 1;
                    }
                    return userState;
                    }()
                }
                </div>
                <Button disabled={!complete} type='primary' onClick={DoneButtonHandler}>
                    <Countdown date={releaseTime} renderer={renderer} onComplete={()=>setComplete(true)}/>
                </Button>
            </InfoWrapper>
        </>
    );
}

// Renderer callback with condition
const renderer = ({days, hours, minutes, seconds, completed}) => {
    
    const h = ("0" + hours).slice(-2);
    const m = ("0" + minutes).slice(-2);
    const s = ("0" + seconds).slice(-2);
    const d = ("0" + days).slice(-2);


    if (completed) {
      // Render a complete state
      return (<>Show Result</>);
    } 
    // Render a countdown
    return (
        <>
            D-{d} {h}:{m}:{s}
        </>
    );

};


export default TicketSheet;