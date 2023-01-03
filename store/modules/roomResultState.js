import { createSlice } from '@reduxjs/toolkit';


export const  ROOM_RESULT_REQUEST = 'roomResult/ROOM_RESULT_REQUEST';
export const  ROOM_RESULT_SUCCESS = 'roomResult/ROOM_RESULT_SUCCESS';
export const  ROOM_RESULT_FAILURE = 'roomResult/ROOM_RESULT_FAILURE';







const initialState = {

    roomResultRequest: false, // 로그인 시도중
    roomResultRequestDone: false,
    roomResultRequestError: null,

    roomResult: null
};


const roomResultSlice = createSlice({
    name: 'roomResult',
    initialState,
    reducers: {
        ROOM_RESULT_REQUEST: (state,action) => {RoomResultRequest(state)},
        ROOM_RESULT_SUCCESS: (state, action) => {RoomResultSuccess(state, action)},
        ROOM_RESULT_FAILURE: (state,action) => {RoomResultFailure(state,action)}
    },
});




//ROOM_RESULT_REQUEST
function RoomResultRequest(state,action){
    state.roomResultRequest = true;
    state.roomResultRequestDone = false;
    state.roomResultRequestError = null;

}

//ROOM_RESULT_SUCCESS
function RoomResultSuccess(state,action){
    state.roomResultRequest = false;
    state.roomResultRequestDone = true;
    state.roomResultRequestError = null;
    state.roomResult = action.data;

}
//ROOM_RESULT_FAILURE
function RoomResultFailure(state,action){
    state.roomResultRequest = false;
    state.roomResultRequestDone = true;
    state.roomResultRequestError = action.err;
    state.roomResult = null;
}


export default roomResultSlice.reducer; // 리듀서;