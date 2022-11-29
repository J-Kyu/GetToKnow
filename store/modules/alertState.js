import { createSlice } from '@reduxjs/toolkit';

export const  ALERT_SUCCESS = 'alertState/ALERT_SUCCESS';

export const  ALERT_INFO = 'alertState/ALERT_INFO';

export const  ALERT_WARNING = 'alertState/ALERT_WARNING';

export const  ALERT_ERROR = 'alertState/ALERT_ERROR';



const initialState = {
    alertSuccess: null,
    alertWarning: null,
    alertError: null,
    alertInfo: null,


};

class Message {
    constructor(type, message, description) {
        this.type= type;
        this.message= message;
        this.description= description;
    }
};

const userSlice = createSlice({
    name: 'alertState',
    initialState,
    reducers: {
        ALERT_SUCCESS: (state, action) => {AlertSuccess(state, action)},
        ALERT_INFO: (state, action) => {AlertInfo(state,action)},
        ALERT_WARNING: (state, action) => {AlertWarning(state, action)},
        ALERT_ERROR: (state, action) => {AlertError(state, action)},
    },
});


//ALERT_SUCCESS
function AlertSuccess(state,action){
    state.alertSuccess = new Message(ALERT_SUCCESS,action.message,action.description);
}

//ALERT_INFO
function AlertInfo(state,action){
    state.alertInfo = new Message(ALERT_INFO,action.message,action.description);
}

//ALERT_WARNING
function AlertWarning(state,action){
    state.alertWarning = new Message(ALERT_WARNING,action.message,action.description);
}


//ALERT_ERROR
function AlertError(state,action){
    state.alertError = new Message(ALERT_ERROR,action.message,action.description);

}

export default userSlice.reducer; // 리듀서;