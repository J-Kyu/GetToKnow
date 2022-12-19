import { createSlice } from '@reduxjs/toolkit';

export const  ENTER_ROOM_REQUEST = 'enterRoomState/ENTER_ROOM_REQUEST';

export const  ENTER_ROOM_SUCCESS = 'enterRoomState/ENTER_ROOM_SUCCESS';

export const  ENTER_ROOM_FAILURE = 'enterRoomState/ENTER_ROOM_FAILURE';

export const  ENTER_ROOM_RESET = 'enterRoomState/ENTER_ROOM_RESET';




const initialState = {

    requestLoading: false, 
    requestnDone: false,
    requestError: null,

    requestRoom: false,

    requestRoomCode: "",
};


const userSlice = createSlice({
    name: 'enterRoomState',
    initialState,
    reducers: {
        ENTER_ROOM_REQUEST: (state) => {EnterRoomRequest(state)},
        ENTER_ROOM_SUCCESS: (state, action) => {EnterRoomSuccess(state,action)},
        ENTER_ROOM_FAILURE: (state,action) => {EnterRoomFailure(state, action)},
       
    },
});


//PUBLIC_QUESTIONS_REQUEST
function EnterRoomRequest(state){
    state.requestLoading = true;
    state.requestnDone = false;

    state.requestRoom = false;
}

//PUBLIC_QUESTIONS_SUCCESS
function EnterRoomSuccess(state, action){
    state.requestLoading = false;
    state.requestnDone = true;

    if (action.isValidCode == true){
        state.requestRoom = true;
        state.requestRoomCode = action.roomCode;
    }
    else{
        state.requestRoom = false;
        state.requestRoomCode = "";
    }
}


//PUBLIC_QUESTIONS_FAILURE
function EnterRoomFailure(state, action){
    state.requestLoading = false;
    state.requestnDone = true;
    state.requestError = action.error;
    state.requestRoomCode = "";

    state.requestRoom = false;
}

//PUBLIC_QUESTIONS_FAILURE
function EnterRoomReset(state){
    state.requestLoading = false;
    state.requestnDone = false;
    state.requestError = null;
    state.requestRoomCode = "";
    state.requestRoom = false;
}

export default userSlice.reducer; // 리듀서;