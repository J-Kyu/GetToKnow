import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
    color: "white";
    display: flex;
    flex-direction: column;
    // justify-content: center;
    gap: 5vh;
`;

const QuestionWrapper = styled.div`
    text-align: center;
    font-size: 1.5rem;
`;




const QuestionsList = ({questions}) => {

    const listRender = [];
    for (let i = 0; i < questions.length; i++){
        listRender.push(<QuestionWrapper key={i}>Q{i+1}. {questions[i]}</QuestionWrapper>)
    }


    return (
        <>
            <Wrapper>
                {listRender}
            </Wrapper>
        </>
    );
};

QuestionsList.protoTypes ={
    questions: PropTypes.array,
};

export default QuestionsList;