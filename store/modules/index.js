import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import userInfo from './userInfo';
import bottomSheetState from "./bottomSheetState";
import publicQuestions from "./publicQuestions";
import roomInfo from "./roomInfo";
import enterRoom from "./enterRoom";
import alertState from "./alertState";
import publicAnswerState from "./publicAnswerState";
import roomTicketListState from "./roomTicketListState";
import roomResultState from "./roomResultState";
import testState from "./testState";


const reducer = (state, action) => {

    switch(action.type){
        case HYDRATE: {
          return action.payload;
        }
        default: {
            const combinedReducer = combineReducers({
                userInfo,
                bottomSheetState,
                publicQuestions,
                roomInfo,
                enterRoom,
                alertState,
                publicAnswerState,
                roomTicketListState,
                roomResultState,
                testState
        
                // 여기에 추가
            });
            return combinedReducer(state, action);
        }
    }
}

export default reducer;