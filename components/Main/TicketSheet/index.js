import React, {CSSProperties,useState,useEffect} from 'react';
import styled from 'styled-components';
import Avatar, { genConfig } from 'react-nice-avatar'
import {Button} from 'antd';
import Countdown from "react-countdown";
import {UserOutlined} from '@ant-design/icons';



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



const TicketSheet = () => {

    const config = genConfig() 

    return (
        <>
            <SheetWrapper>
                <TicketElementList ticketList={mockData}/>
            </SheetWrapper>

        </>
    );
};


const TicketElementList= ({ticketList}) => {
    const listRender = [];

    for (let i = 0; i < ticketList.length; i++){
        listRender.push(<TicketElement key={i} ticketInfo={ticketList[i]}/>)
    }

    return(
        <>
            {listRender}
        </>
    );
};



const TicketElement = ({ticketInfo}) => {
    
    const config = genConfig(ticketInfo.roomCode) ;
    const releaseTime = new Date(ticketInfo.releaseDate).getTime(); 
    
    const [clientRender, setClientRender] = useState(false);

    useEffect(() => {
        setClientRender(true);
    },[]);

    if (clientRender === false){
        return (<></>);
    }

    return(
        <>
            <TicketWrapper>
                <IconWrapper>
                    <Avatar style={{ width: '15vh', height: '15vh' }} {...config}/>
                </IconWrapper>
                <InfoWrapper>
                    <div style={{fontSize: "2rem"}}>
                        #{ticketInfo.roomCode}
                    </div>
                    <div>
                        {ticketInfo.roomType}
                    </div>
                    <div>
                        {ticketInfo.roomState}
                    </div>
                    <div>
                    {/* User Max Num */}
                    {function (){
                        let userState = []
                        let keyIndex = 0
                        for(let i = 0; i < ticketInfo.maxNum; i++){
                            userState.push(<UserOutlined style={{color:"gray"}}  key={keyIndex}/>)
                            keyIndex += 1;
                        }
                        return userState;
                        }()
                    }
                    </div>
                    <Button type='primary'>
                        <Countdown date={releaseTime} renderer={renderer} />
                    </Button>
                </InfoWrapper>

            </TicketWrapper>
        </>
    );
}


// Renderer callback with condition
const renderer = ({days, hours, minutes, seconds, completed }) => {
    
    // let h = (hours == 0) ? "00" : hours;
    // let m = (minutes == 0) ? "00" : minutes;
    // let s = (seconds == 0) ? "00" : seconds;

    const h = ("0" + hours).slice(-2);
    const m = ("0" + minutes).slice(-2);
    const s = ("0" + seconds).slice(-2);
    const d = ("0" + days).slice(-2);




    if (completed) {
      // Render a complete state
      return (<>Enter Room</>);
    } else {
      // Render a countdown
      return (
        <>
            D-{d} {h}:{m}:{s}
        </>
      );
    }
  };


export default TicketSheet;