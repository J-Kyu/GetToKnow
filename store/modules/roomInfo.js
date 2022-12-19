import { createSlice } from '@reduxjs/toolkit';





export const  ROOM_INFO_REQUEST = 'roomInfo/ROOM_INFO_REQUEST';
export const  ROOM_INFO_SUCCESS = 'roomInfo/ROOM_INFO_SUCCESS';
export const  ROOM_INFO_FAILURE = 'roomInfo/ROOM_INFO_FAILURE';

export const  ROOM_GEN_REQUEST = 'roomInfo/ROOM_GEN_REQUEST';
export const  ROOM_GEN_SUCCESS = 'roomInfo/ROOM_GEN_SUCCESS';
export const  ROOM_GEN_FAILURE = 'roomInfo/ROOM_GEN_FAILURE';




const initialState = {

    roomInfoRequestLoading: false, // 로그인 시도중
    roomInfoRequestnDone: false,
    roomInfoRequestError: null,

    roomGenRequestLoading: false,
    roomGenRequestnDone: false,
    roomGenRequestError: null,

    roomCode: "",
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
    adminUserNo: 1,

});


const userSlice = createSlice({
    name: 'roomInfo',
    initialState,
    reducers: {
        ROOM_INFO_REQUEST: (state,action) => {RoomInfoRequest(state)},
        ROOM_INFO_SUCCESS: (state, action) => {RoomInfoSuccess(state, action)},
        ROOM_INFO_FAILURE: (state,action) => {RoomInfoFailure(state,action)},

        ROOM_GEN_REQUEST: (state,action) => {RoomGenRequest(state, action)},
        ROOM_GEN_SUCCESS: (state, action) => {RoomGenSuccess(state, action)},
        ROOM_GEN_FAILURE: (state,action) => {RoomGenFailure(state, action)}

    },
});



//ROOM_GEN_REQUEST
function RoomGenRequest(state, action){
    state.roomGenRequestLoading = true;
    state.roomGenRequestnDone = false;
    state.roomGenRequestError = null;
    state.info = action.data;
}

//ROOM_GEN_SUCCESS
function RoomGenSuccess(state, action){

    state.roomGenRequestLoading = false;
    state.roomGenRequestnDone = true;
    state.roomGenRequestError = null;
    state.roomCode = action.data.result[0];
}


//ROOM_GEN_FAILURE
function RoomGenFailure(state, action){
    state.roomGenRequestLoading = false;
    state.roomGenRequestnDone = false;
    state.roomGenRequestError = action.err;

}





//ROOM_INFO_REQUEST
function RoomInfoRequest(state){
    state.roomInfoRequestLoading = true;
    state.roomInfoRequestnDone = false;
    state.info = null;
}

//ROOM_INFO_SUCCESS
function RoomInfoSuccess(state, action){
    state.roomInfoRequestLoading = false;
    state.roomInfoRequestnDone = true;
    state.info =  action.data.result[0];

    console.log("Room Info Success: ",state.info);
}


//ROOM_INFO_FAILURE
function RoomInfoFailure(state, action){
    state.roomInfoRequestLoading = false;
    state.roomInfoRequestnDone = true;
    state.roomInfoRequestError = action.error;

    state.info = null;

}

export default userSlice.reducer; // 리듀서;