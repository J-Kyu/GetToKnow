import { createSlice } from '@reduxjs/toolkit';

export const  ROOM_INFO_REQUEST = 'roomInfo/ROOM_INFO_REQUEST';

export const  ROOM_INFO_SUCCESS = 'roomInfo/ROOM_INFO_SUCCESS';

export const  ROOM_INFO_FAILURE = 'roomInfo/ROOM_INFO_FAILURE';





const initialState = {

    requestLoading: false, // 로그인 시도중
    requestnDone: false,
    requestError: null,

    info: null,
    
};

const dummyRoomInfo = (data) => ({
    ...data,
    id: 77,
    roomCode: "A8C9Z0",
    roomState: "새섬 파트너",
    userMaxNum: 2,
    genDate: "2022-11-25",
    releaseDate: "11/28(화)",
    releaseTime: "19:30",
    endTime: "20:30",
    publicQuestionsNo: 12,
    privateQuestionsNo: 13,
    joinedTicketNo: [18],
    bottariNo: 0,
    adminUserNo: 1,

});


const userSlice = createSlice({
    name: 'roomInfo',
    initialState,
    reducers: {
        ROOM_INFO_REQUEST: (state) => {RoomInfoRequest(state)},
        ROOM_INFO_SUCCESS: (state, action) => {RoomInfoSuccess(state, action)},
        ROOM_INFO_FAILURE: (state,action) => {RoomInfoFailure(state,action)},
    },
});


//ROOM_INFO_REQUEST
function RoomInfoRequest(state){
    state.requestLoading = true;
    state.requestnDone = false;
    state.info = null;
}

//ROOM_INFO_SUCCESS
function RoomInfoSuccess(state, action){
    state.requestLoading = false;
    state.requestnDone = true;
    state.info = dummyRoomInfo(action.data);
}


//ROOM_INFO_FAILURE
function RoomInfoFailure(state, action){
    state.requestLoading = false;
    state.requestnDone = true;
    state.info = null;
    state.requestError = action.error;

}

export default userSlice.reducer; // 리듀서;