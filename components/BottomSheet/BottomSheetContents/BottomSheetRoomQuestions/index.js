import React, {useEffect,useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Radio } from 'antd';
import {PUBLIC_QUESTIONS_REQUEST} from 'store/modules/publicQuestions';
import {BOTTOM_SHEET_ROOM_TICKET} from 'store/modules/bottomSheetState';
import QuestionsList from './PublicQuestionsList';
import PrivateQuestionsList from './PrivateQuestionsList';
import BottomSheetLoading from '../BottomSheetLoading';

const Wrapper = styled.div`
    color-white;
`;

const SubmitWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 5vh;

`;

const BottomSheetRoomQuestions = () => {

    const publicQuestionsState = useSelector(({publicQuestions}) => publicQuestions);
    
    const dispatch = useDispatch();

    //init function
    /*
    useEffect(() => {
        if( publicQuestionsState.publicQuestions == null){
            dispatch({type: PUBLIC_QUESTIONS_REQUEST});
        }
    },[publicQuestionsState.publicQuestions]);
    */

    //generate room handler
    const GenerateRoomHandler = useCallback(() => {
        dispatch({type: BOTTOM_SHEET_ROOM_TICKET});
    },[dispatch]);

    useEffect(() => {console.log(publicQuestionsState.publicQuestions);},[publicQuestionsState.publicQuestions]) ;


    if (publicQuestionsState.publicQuestions == null){
        return (
            <> 
                <Wrapper>
                    <BottomSheetLoading/>
                </Wrapper>
            </>
        );
    }
    else{
        return (
            <>
                <Wrapper>
                 <>
                    <QuestionsList questions={publicQuestionsState.publicQuestions} />
                    <PrivateQuestionsList/>
                    <SubmitWrapper>
                        <Radio.Button onClick={GenerateRoomHandler} value="default" size="large">방 생성</Radio.Button>
                    </SubmitWrapper>
                    </>
                </Wrapper>
            </>
        );
    }


  
};

export default BottomSheetRoomQuestions;