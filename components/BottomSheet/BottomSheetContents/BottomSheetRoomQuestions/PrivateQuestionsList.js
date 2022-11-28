import React, {useState, useRef, useEffect, useCallback} from 'react';
import { Input, Button } from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    
    margin-top: 10vh;
    margin-bottom: 5vh;
    margin-left: 5vw;
    margin-right: 5vw;

    gap: 1vh;
`;



const PrivateQuestionsList = () => {

    const [privateQuestionsList, setPrivateQuestionsList] = useState([]);
    const [privateQuestionIndex, setPrivateQuestionIndex] = useState(0);
    const plusBtnRef = useRef();


    //Add Private Question Input
    const AddPrivateQuestions = () =>{

        setPrivateQuestionsList(prev =>{
            return [
                ...prev,
                {
                    type: "text",
                    value: "",
                    key: privateQuestionIndex
                }
            ];
        });
        setPrivateQuestionIndex(privateQuestionIndex+1);

    };


    //Update Private Questions
    const inputChangeHandler = e => {
        
        e.preventDefault();

        const index = e.target.getAttribute('index'); //get custom tag from DOM

        setPrivateQuestionsList(s => {
            const newArr = s.slice();
            newArr[index].value = e.target.value;

            return newArr;
        });
    };

    //focus on bottom
    useEffect(() => {
        if (privateQuestionsList.length > 0){
            plusBtnRef.current.scrollIntoView();
        }
    },[privateQuestionsList]);


    const deleteQuestionButtonHandler = (id) => {
        setPrivateQuestionsList(privateQuestionsList.filter((item) => 
            item.key !== id
        ));
    };

    return (
        <>
            <Wrapper>
                <div>궁금한 질문을 추가해주세요</div>
                {privateQuestionsList.map((item, i) => {
                    return  (  
                                <QuestionArea item={item} inputChangeHandler={inputChangeHandler}  deleteHandler={deleteQuestionButtonHandler}
                                key={i}
                                index = {i}
                                />
                            );
                    })
                }
                <PlusCircleOutlined ref={plusBtnRef} style={{fontSize: '2em'}} onClick={AddPrivateQuestions}/>
            </Wrapper>
        </>
    );
};

export default PrivateQuestionsList;




const QuestionWrapper = styled.div`
    display: flex;
`;
const QuestionArea = ({item,inputChangeHandler, deleteHandler, index}) => {

    return (
        <>
            <QuestionWrapper>
                <Input 
                    onChange={inputChangeHandler}
                    value={item.value}
                    id={item.key}
                    placeholder="질문을 적어주세요"
                    index={index}
                /> 

                <Button type="primary" size="large" onClick={() => deleteHandler(item.key)}  style={{borderTopRightRadius: " 80px 80px", borderBottomRightRadius: " 80px 80px"}}>
                     삭제
                </Button>
                
            </QuestionWrapper> 
        </>
    );
    
};


//onClick={deleteHandler(item.key)}