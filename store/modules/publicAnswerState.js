import { createSlice } from '@reduxjs/toolkit';

export const ANSWER_UPDATE_REQUEST = 'answerState/ANSWER_UPDATE_REQUEST';

export const ANSWER_UPDATE_SUCCESS = 'answerState/ANSWER_UPDATE_SUCCESS';

export const ANSWER_UPDATE_FAILUTRE = 'answerState/ANSWER_UPDATE_FAILUTRE';




const initialState = {
    answerUpdateSuccess: false,
    answerUpdating: false,
    answerUpdateDone: false,
    answerUpdateError: null,

}


const answerStateSlice = createSlice({
    name: 'answerState',
    initialState,
    reducers: {
        ANSWER_UPDATE_REQUEST: (state,action) => {AnswerUpdateRequest(state, action)},
        ANSWER_UPDATE_SUCCESS: (state,action) => {AnswerUpdateSuccess(state, action)},
        ANSWER_UPDATE_FAILUTRE: (state,action) => {AnswerUpdateFailure(state, action)},
        
    }
});


function AnswerUpdateRequest(state, action){
    state.answerUpdateSuccess = false;
    state.answerUpdating = true;
    state.answerUpdateDone = false;
    state.answerUpdateError = null;
}

function AnswerUpdateSuccess(state, action){
    state.answerUpdateSuccess = true;
    state.answerUpdating = false;
    state.answerUpdateDone = true;
    state.answerUpdateError = null;
}

function AnswerUpdateFailure(state, action){
    state.answerUpdateSuccess = false;
    state.answerUpdating = false;
    state.answerUpdateDone = true;
    state.answerUpdateError = action.err;
}

export default answerStateSlice.reducer; // 리듀서;
