import { createSlice } from '@reduxjs/toolkit';

export const  ROOM_TICKET_LIST_REQUEST = 'roomTicketListState/ROOM_TICKET_LIST_REQUEST';
export const  ROOM_TICKET_LIST_SUCCESS = 'roomTicketListState/ROOM_TICKET_LIST_SUCCESS';
export const  ROOM_TICKET_LIST_FAILURE = 'roomTicketListState/ROOM_TICKET_LIST_FAILURE';





const initialState = {

    requestLoading: false, 
    requestDone: false,
    requestError: null,

    ticketList: null
};


const roomTicketListSlice = createSlice({
    name: 'roomTicketListState',
    initialState,
    reducers: {
        ROOM_TICKET_LIST_REQUEST: (state, action) => {RoomTicketListRequest(state)},
        ROOM_TICKET_LIST_SUCCESS: (state, action) => {RoomTicketListSuccess(state,action)},
        ROOM_TICKET_LIST_FAILURE: (state,action) => {RoomTicketListFailure(state, action)},
       
    },
});


//PUBLIC_QUESTIONS_REQUEST
function RoomTicketListRequest(state){
    state.requestLoading = true;
    state.requestDone = false;
}

//PUBLIC_QUESTIONS_SUCCESS
function RoomTicketListSuccess(state, action){
    state.requestLoading = false;
    state.requestnDone = true;
    state.ticketList = action.data

}


//PUBLIC_QUESTIONS_FAILURE
function RoomTicketListFailure(state, action){
    state.requestLoading = false;
    state.requestnDone = true;
    state.requestError = action.error;
    state.ticketList = null;
}


export default roomTicketListSlice.reducer; // 리듀서;