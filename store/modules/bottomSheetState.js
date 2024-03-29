import { createSlice } from '@reduxjs/toolkit';

//sheet state
export const  BOTTOM_SHEET_LOGIN = 'bottomSheetState/BOTTOM_SHEET_LOGIN';

export const  BOTTOM_SHEET_ROOM_LOBBY = 'bottomSheetState/BOTTOM_SHEET_ROOM_LOBBY';

export const  BOTTOM_SHEET_GENERATE_ROOM = 'bottomSheetState/BOTTOM_SHEET_GENERATE_ROOM';

export const  BOTTOM_SHEET_ENTER_ROOM = 'bottomSheetState/BOTTOM_SHEET_ENTER_ROOM';

export const  BOTTOM_SHEET_LOADING = 'bottomSheetState/BOTTOM_SHEET_LOADING';

export const  BOTTOM_SHEET_ROOM_QUESTIONS = 'bottomSheetState/BOTTOM_SHEET_ROOM_QUESTIONS';

export const  BOTTOM_SHEET_ROOM_TICKET = 'bottomSheetState/BOTTOM_SHEET_ROOM_TICKET';

export const  BOTTOM_SHEET_ANSWER_QUESTIONS = 'bottomSheetState/BOTTOM_SHEET_ANSWER_QUESTIONS';

export const  BOTTOM_SHEET_RESULT = 'bottomSheetState/BOTTOM_SHEET_RESULT';



//sheet On or Off
export const  BOTTOM_SHEET_ON = 'bottomSheetState/BOTTOM_SHEET_ON';
export const  BOTTOM_SHEET_OFF = 'bottomSheetState/BOTTOM_SHEET_OFF';





export const  BOTTOM_SHEET_TEST = 'bottomSheetState/BOTTOM_SHEET_TEST';



const initialState = {
    sheetState: BOTTOM_SHEET_LOGIN,
    sheetOpen: false,
    data: null,
 };

const userSlice = createSlice({
    name: 'bottomSheetState',
    initialState,
    reducers: {
        //state
        BOTTOM_SHEET_LOGIN: (state, action) => {BottomSheetLogin(state)},
        BOTTOM_SHEET_ROOM_LOBBY: (state, action) => {BottomSheetRoomLobby(state)},
        BOTTOM_SHEET_GENERATE_ROOM: (state, action) => {BottomSheetGenerateRoom(state)},
        BOTTOM_SHEET_ENTER_ROOM: (state, action) => {BottomSheetEnterRoom(state)},
        BOTTOM_SHEET_LOADING: (state, action) => {BottomSheetLoading(state)},
        BOTTOM_SHEET_ROOM_QUESTIONS: (state, action) => {BottomSheetRoomQuestions(state,action)},
        BOTTOM_SHEET_ROOM_TICKET: (state, action) => {BottomSheetRoomTicket(state,action)},
        BOTTOM_SHEET_ANSWER_QUESTIONS: (state, action) => {BottomSheetAnswerQuestions(state,action)},

        //result
        BOTTOM_SHEET_RESULT: (state,action) => {BottomSheetResult(state,action)},

        //sheet open 
        BOTTOM_SHEET_ON: (state, action) => {BottomSheetOn(state)},
        BOTTOM_SHEET_OFF: (state, action) => {BottomSheetOff(state)},




        BOTTOM_SHEET_TEST: (state, action) => {BottomSheetTest(state)},
        
    },
});


//BOTTOM_SHEET_LOGIN
function BottomSheetLogin(state){
    state.sheetState = BOTTOM_SHEET_LOGIN;
}
//BOTTOM_SHEET_ROOM_LOBBY
function BottomSheetRoomLobby(state){
    state.sheetState = BOTTOM_SHEET_ROOM_LOBBY;
}
//BOTTOM_SHEET_GENERATE_ROOM
function BottomSheetGenerateRoom(state){
    state.sheetState = BOTTOM_SHEET_GENERATE_ROOM;
}

//BOTTOM_SHEET_ENTER_ROOM
function BottomSheetEnterRoom(state){
    state.sheetState = BOTTOM_SHEET_ENTER_ROOM;
}

//BOTTOM_SHEET_LOADING
function BottomSheetLoading(state){
    state.sheetState = BOTTOM_SHEET_LOADING;
}

//BOTTOM_SHEET_ROOM_QUESTIONS
function BottomSheetRoomQuestions(state, action){
    state.sheetState = BOTTOM_SHEET_ROOM_QUESTIONS;
}

//BOTTOM_SHEET_ROOM_TICKET
function BottomSheetRoomTicket(state, action){
    state.sheetState = BOTTOM_SHEET_ROOM_TICKET;
    state.data = action.data;
}

//BOTTOM_SHEET_ANSWER_QUESTIONS
function BottomSheetAnswerQuestions(state, action){
    state.sheetState = BOTTOM_SHEET_ANSWER_QUESTIONS;
    state.data = action.data
}


//BOTTOM_SHEET_ANSWER_QUESTIONS
function BottomSheetResult(state, action){
    state.sheetState = BOTTOM_SHEET_RESULT;
    state.data = action.data
}


//BOTTOM_SHEET_ON
function BottomSheetOn(state){
    state.sheetOpen = true;
}

//BOTTOM_SHEET_OFF
function BottomSheetOff(state){
    state.sheetOpen = false;
}

//BOTTOM_SHEET_TEST
function BottomSheetTest(state){
    state.sheetState = BOTTOM_SHEET_TEST;
}


export default userSlice.reducer; // 리듀서;