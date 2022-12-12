import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import userInfo from './userInfo';
import bottomSheetState from "./bottomSheetState";
import publicQuestions from "./publicQuestions";
import roomInfo from "./roomInfo";
import enterRoom from "./enterRoom";
import alertState from "./alertState";
import testState from "./testState";


const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        return {
            ...state,
            ...action.payload
        };
    }
    return combineReducers({
        userInfo,
        bottomSheetState,
        publicQuestions,
        roomInfo,
        enterRoom,
        alertState,
        testState

        // 여기에 추가
    })(state, action);
}

export default reducer;