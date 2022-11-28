import { createSlice } from '@reduxjs/toolkit';

export const  PUBLIC_QUESTIONS_REQUEST = 'publicQuestionsState/PUBLIC_QUESTIONS_REQUEST';

export const  PUBLIC_QUESTIONS_SUCCESS = 'publicQuestionsState/PUBLIC_QUESTIONS_SUCCESS';

export const  PUBLIC_QUESTIONS_FAILURE = 'publicQuestionsState/PUBLIC_QUESTIONS_FAILURE';




const initialState = {

    requestLoading: false, // 로그인 시도중
    requestnDone: false,
    requestError: null,

    publicQuestions: null,
    
};

const dummyQuestions = (data) => ({
    ...data,
    questions: ["This is Question 1","This is Question 2","This is Question 3", "This is Question 4", "This is Question 5", "This is Question 6", "This is Question 7", "This is Question 8", "This is Question 9", "This is Question 10"],
    id: 1,
});


const userSlice = createSlice({
    name: 'publicQuestionsState',
    initialState,
    reducers: {
        PUBLIC_QUESTIONS_REQUEST: (state) => {PublicQuestionsRequest(state)},
        PUBLIC_QUESTIONS_SUCCESS: (state, action) => {PublicQuestionsSuccess(state, action)},
        PUBLIC_QUESTIONS_FAILURE: (state,action) => {PublicQuestionsFailure(state, action)},

       
    },
});


//PUBLIC_QUESTIONS_REQUEST
function PublicQuestionsRequest(state){
    state.requestLoading = true;
    state.requestnDone = false;
    state.publicQuestions = null;
}

//PUBLIC_QUESTIONS_SUCCESS
function PublicQuestionsSuccess(state, action){
    state.requestLoading = false;
    state.requestnDone = true;
    state.publicQuestions = null;
    state.publicQuestions = dummyQuestions(action.data);
}


//PUBLIC_QUESTIONS_FAILURE
function PublicQuestionsFailure(state, action){
    state.requestLoading = false;
    state.requestnDone = true;
    state.publicQuestions = null;
    state.requestError = action.error;

}

export default userSlice.reducer; // 리듀서;