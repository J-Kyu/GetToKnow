import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from "axios";

import {
    ROOM_RESULT_REQUEST,
    ROOM_RESULT_SUCCESS,
    ROOM_RESULT_FAILURE
} from "../modules/roomResultState";

   

//Request Creating Room 
function requestRoomResultAxios(roomCode){
  
    return axios.get(
        '/room/'+roomCode+'/getRoomResult',
        {withCredentials: true}
      );
}


function* RequestRoomResult(action) {
    try {

        console.log('saga Request Room Result');
        //axios request
        const result = yield call(requestRoomResultAxios, action.roomCode);

        console.log(result.data.result);

        //Response Success
        yield put({
            type: ROOM_RESULT_SUCCESS,
            data: result.data.result

            // data: result.data
        });
     
    } catch (err) {
        console.error(err);
        yield put({
            type: ROOM_RESULT_FAILURE,
            error: err.data,
        });
    }
}

  
function* watchRequestRoomResult() {
    yield takeLatest(ROOM_RESULT_REQUEST, RequestRoomResult);
}
  
  
  export default function* roomResultSaga() {
      yield all([
        fork(watchRequestRoomResult),
      ]);
}