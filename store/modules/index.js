import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import userInfo from './userInfo';
import bottomSheetState from "./bottomSheetState";
import publicQuestions from "./publicQuestions";
import roomInfo from "./roomInfo";


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

        // 여기에 추가
    })(state, action);
}

export default reducer;