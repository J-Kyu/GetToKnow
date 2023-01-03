import React, {useState, useRef, useCallback, useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {ArrowLeftOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import {
    BOTTOM_SHEET_LOGIN,
    BOTTOM_SHEET_ROOM_LOBBY, 
    BOTTOM_SHEET_GENERATE_ROOM, 
    BOTTOM_SHEET_TEST, 
    BOTTOM_SHEET_ANSWER_QUESTIONS,
    BOTTOM_SHEET_ROOM_QUESTIONS, 
    BOTTOM_SHEET_ROOM_TICKET,
    BOTTOM_SHEET_ENTER_ROOM,
    BOTTOM_SHEET_LOADING,
    BOTTOM_SHEET_RESULT,
    BOTTOM_SHEET_ON,
    BOTTOM_SHEET_OFF
  } from 'store/modules/bottomSheetState';
  

const Wrapper = styled.div`
    color: white;
    transition: font-size 1s ease-out;
    marginRight: 1vw;
`;

//ref={optionButtonRef}
const BottomSheetOptionButton = () => {

    //state
    const [prevSheetState, setPrevSheetState] = useState("");
    const [optionBtnVisibility, setOptionBtnVisibility] = useState(false);


    //Selector
    const bottomSheetState = useSelector(({bottomSheetState}) => bottomSheetState);

    //saga
    const optionButtonRef = useRef();
    const dispatch = useDispatch();


    //set prev state & est option button visibility
    useEffect(() => {

        switch(bottomSheetState.sheetState){
            case BOTTOM_SHEET_LOGIN:{
                setPrevSheetState("NONE");
                setOptionBtnVisibility(false);
                break;
            }
            case BOTTOM_SHEET_LOADING:{
                setPrevSheetState("NONE");
                setOptionBtnVisibility(false);
                break;
            }
            case BOTTOM_SHEET_ROOM_LOBBY:{
                setPrevSheetState("NONE");
                setOptionBtnVisibility(false);
                break;
            }
            case BOTTOM_SHEET_ENTER_ROOM:{
                setPrevSheetState(BOTTOM_SHEET_ROOM_LOBBY);
                setOptionBtnVisibility(true);
                break;
            }
            case BOTTOM_SHEET_GENERATE_ROOM:{
                setPrevSheetState(BOTTOM_SHEET_ROOM_LOBBY);
                setOptionBtnVisibility(true);
                break;
            }
            case BOTTOM_SHEET_ROOM_QUESTIONS:{
                setPrevSheetState(BOTTOM_SHEET_GENERATE_ROOM);
                setOptionBtnVisibility(true);
                break;
            }
            case BOTTOM_SHEET_ANSWER_QUESTIONS:{
                setPrevSheetState(BOTTOM_SHEET_ENTER_ROOM);
                setOptionBtnVisibility(true);
                break;
            }
            case BOTTOM_SHEET_ROOM_TICKET:{
                setPrevSheetState(BOTTOM_SHEET_ROOM_LOBBY);
                setOptionBtnVisibility(true);
                break;
            }
            case BOTTOM_SHEET_RESULT:{
                setPrevSheetState(BOTTOM_SHEET_ROOM_LOBBY);
                setOptionBtnVisibility(true);
                break;
            }
            default:{
                setPrevSheetState("NONE");
                setOptionBtnVisibility(false);
                break;
            }


        }

    },[bottomSheetState.sheetState]);

    //hide and show option button
    useEffect(() => {
        if (optionBtnVisibility == true && bottomSheetState.sheetOpen == true){
            //hide option button 
            optionButtonRef.current.style.setProperty('font-size', `1.5rem`);
        }
        else if (optionBtnVisibility == false || bottomSheetState.sheetOpen == false){
            //open option button
            optionButtonRef.current.style.setProperty('font-size', `0rem`);
        }

    },[optionBtnVisibility, bottomSheetState.sheetOpen]);

   

    const OptionButtonHandler = useCallback(() => {
        dispatch({type: prevSheetState});
    });

    return (
        <>
            <Wrapper>
                <ArrowLeftOutlined onClick={OptionButtonHandler} ref={optionButtonRef} />
            </Wrapper>
        </>
    );
};

export default BottomSheetOptionButton;