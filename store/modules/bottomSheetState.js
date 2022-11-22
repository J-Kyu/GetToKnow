import { createSlice } from '@reduxjs/toolkit';

export const  BOTTOM_SHEET_LOGIN = 'bottomSheetState/BOTTOM_SHEET_LOGIN';
export const  BOTTOM_SHEET_ROOM_LOBBY = 'bottomSheetState/BOTTOM_SHEET_ROOM_LOBBY';
export const  BOTTOM_SHEET_GENERATE_ROOM = 'bottomSheetState/BOTTOM_SHEET_GENERATE_ROOM';
export const  BOTTOM_SHEET_ENTER_ROOM = 'bottomSheetState/BOTTOM_SHEET_ENTER_ROOM';


const initialState = {
    sheetState: BOTTOM_SHEET_LOGIN,
 };

const userSlice = createSlice({
    name: 'bottomSheetState',
    initialState,
    reducers: {
        BOTTOM_SHEET_LOGIN: (state) => {BottomSheetLogin(state)},
        BOTTOM_SHEET_ROOM_LOBBY: (state) => {BottomSheetRoomLobby(state)},
        BOTTOM_SHEET_GENERATE_ROOM: (state) => {BottomSheetGenerateRoom(state)},
        BOTTOM_SHEET_ENTER_ROOM: (state) => {BottomSheetEnterRoom(state)},
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
    state.sheetState = BOTTOM_SHEET_GENERATE_ROOM
}

//BOTTOM_SHEET_ENTER_ROOM
function BottomSheetEnterRoom(state){
    state.sheetState = BOTTOM_SHEET_ENTER_ROOM
}


export default userSlice.reducer; // 리듀서;