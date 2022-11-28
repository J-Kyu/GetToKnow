import React, {useState, useEffect, useCallback, useRef} from 'react';
import styled from 'styled-components';
import {Input,Button} from 'antd';
import BottomSheetLoading from '../BottomSheetLoading';
import { useSelector, useDispatch } from 'react-redux';
import {PUBLIC_QUESTIONS_REQUEST} from 'store/modules/publicQuestions';
import {BOTTOM_SHEET_ROOM_TICKET} from 'store/modules/bottomSheetState';


const Wrapper = styled.div`
    color: white;
    margin-top: 5vh;
    margin-bottom: 5vh;
`;

const ReadyButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 10vh;
    width: 100vw;
`;

const BottomSheetAnswerQuestions = () => {

    //redux
    const publicQuestionsState = useSelector(({publicQuestions}) => publicQuestions);
    const dispatch = useDispatch();
    
    //request questions
    useEffect(() => {
        if( publicQuestionsState.publicQuestions == null){
            dispatch({type: PUBLIC_QUESTIONS_REQUEST});
        }

    },[publicQuestionsState.publicQuestions]);
    
    //Ready Button -> Move to Room Ticket 
    const readyButtonHandler = () => {

        dispatch({type: BOTTOM_SHEET_ROOM_TICKET});



    };

    if (publicQuestionsState.publicQuestions == null){
        return (
            <BottomSheetLoading/>
        );
    }
    else{
        return (
            <>
                <Wrapper>
                    <QnAList questions={publicQuestionsState.publicQuestions.questions}/>
                    <ReadyButtonWrapper>
                        <Button type='primary' style={{  height: "100%", width: "100%"}} onClick={readyButtonHandler}>
                            준비 완료
                        </Button>
                    </ReadyButtonWrapper>
                    
                </Wrapper>
            </>
        );
    }
};

export default BottomSheetAnswerQuestions;


const QnAListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15vh;
    margin-bottom: 10vh;

`;

const QnAList = ({questions}) => {

    //questions and answers
    const listRender = [];

    for (let i = 0; i < questions.length; i++){
        listRender.push(<QuestionsAndAnswerForm index={i} question= {questions[i]}/>)
    }


    return (
        <>
            <QnAListWrapper>
                {listRender}
            </QnAListWrapper>
        </>
    );
};


const QnAWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3vh;

`;

const QuestionsWrapper = styled.div` 
    font-size: 2rem;
    text-align: center;
`;

const AnswerWrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: 10vh;
`;

const QuestionsAndAnswerForm = ({index, question}) => {

    //state
    const [answer, setAnswer] = useState("");

    //input ref
    const inputRef = useRef();

    const inputChangeHandler = e => {

        e.preventDefault();

        setAnswer(e.target.value);
    };

    const { TextArea } = Input;

    return (
        <>
            <QnAWrapper>
                <QuestionsWrapper ref={inputRef}>
                    <div>Q{index+1}. {question}</div>
                </QuestionsWrapper>
            
                <AnswerWrapper>
                    <TextArea  value={answer} onChange={inputChangeHandler}  onClick={()=>{inputRef.current.scrollIntoView({behavior: "smooth"})}} />
                    <Button type="primary" style={{height: "100%"}}>
                        저장
                    </Button>
                </AnswerWrapper>
            </QnAWrapper>
        </>
    );
};

