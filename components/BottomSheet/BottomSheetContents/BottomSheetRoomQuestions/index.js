import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Radio } from 'antd';
import {PUBLIC_QUESTIONS_REQUEST} from 'store/modules/publicQuestions';
import QuestionsList from './PublicQuestionsList';
import PrivateQuestionsList from './PrivateQuestionsList';

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

    useEffect(() => {
        dispatch({type: PUBLIC_QUESTIONS_REQUEST});
    },[]);

    useEffect(() => {
        console.log(publicQuestionsState);

    },[publicQuestionsState]);


    return (
        <>
            <Wrapper>
                
                {
                    publicQuestionsState.publicQuestions == null
                    ? <div>BottomSheetRoomQuestions</div>
                    :   <>
                            <QuestionsList questions={publicQuestionsState.publicQuestions.questions} />
                            <PrivateQuestionsList/>
                            <SubmitWrapper>
                                <Radio.Button value="default" size="large">방 생성</Radio.Button>
                            </SubmitWrapper>
                        </>
      
                }
            </Wrapper>
            
        </>
    );
};

export default BottomSheetRoomQuestions;