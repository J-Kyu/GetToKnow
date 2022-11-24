import React, {useState, useRef, useEffect} from 'react';
import { Input } from 'antd';
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
    const plusBtnRef = useRef();

    //Add Private Question Input
    const AddPrivateQuestions = () =>{

        setPrivateQuestionsList(prev =>{
            return [
                ...prev,
                {
                    type: "text",
                    value: "",
                    key: 0
                }
            ];
        });
        

    };


    //Update Private Questions
    const handleInputChange = e => {
        
        e.preventDefault();

        const index = e.target.id;
        setPrivateQuestionsList(s => {
            const newArr = s.slice();
            newArr[index].value = e.target.value;
            newArr[index].key = index;

            return newArr;
        });

    };

    useEffect(() => {
        if (privateQuestionsList.length > 0){
            plusBtnRef.current.scrollIntoView();
        }
    },[privateQuestionsList]);

    return (
        <>
            <Wrapper>
                <div>궁금한 질문을 추가해주세요</div>
                {privateQuestionsList.map((item, i) => {
                    return  (
                                <Input 
                                    onChange={handleInputChange}
                                    value={item.value}
                                    id={i}
                                    key={i}
                                    placeholder="Basic usage"
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