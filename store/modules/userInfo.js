import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    logInLoading: false, // 로그인 시도중
    logInDone: false,
    logInError: null,

    logOutLoading: false, // 로그아웃 시도중
    logOutDone: false,
    logOutError: null,

    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,
    signUpError: null,

    me: null,
    signUpData: {},
    loginData: {},
};


const dummyUser = (data) => ({
    ...data,
    nickname: 'Test User',
    id: 1
});


export const LOG_IN_REQUEST = 'userInfo/LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'userInfo/LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'userInfo/LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'userInfo/LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'userInfo/LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'userInfo/LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'userInfo/SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'userInfo/SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'userInfo/SIGN_UP_FAILURE';


// export const loginRequestAction = (data) => ({
//     type: LOG_IN_REQUEST,
//     data,
//   });
  


const userSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        LOG_IN_REQUEST: (state, action) => {LogInRequest(state);},
        LOG_IN_SUCCESS: (state, action) => {LogInSuccess(state, action); console.log("Log In Success")},
        LOG_IN_FAILURE: (state, action) => {LogInFailure(state,action);},

        LOG_OUT_REQUEST: (state, action) => {LogOutRequest(state)},
        LOG_OUT_SUCCESS: (state, action) => {LogOutSuccess(state)},
        LOG_OUT_FAILURE: (state, action) => {LogOutFailure(state,action)},



    },
});


//Log In
function LogInRequest(state){
    state.logInLoading = true;
}

function LogInSuccess(state, action){
    state.logInLoading = false;
    state.me = dummyUser(action.data);
}

function LogInFailure(state, action){
    state.logInLoading = false;
    state.logInError = action.error;
}

//Log Out
function LogOutRequest(state){
    state.logOutLoading = true;
    state.logOutError = null;
    state.logOutDone = false;
}

function LogOutSuccess(state){
    state.logOutLoading = false;
    state.logOutDone = true;
    state.me = null;
}

function LogOutFailure(state,action){
    state.logOutLoading = false;
    state.logOutError = action.error;
}

export default userSlice.reducer; // 리듀서;