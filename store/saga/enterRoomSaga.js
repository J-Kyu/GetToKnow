import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';

import {
    ENTER_ROOM_REQUEST,
    ENTER_ROOM_SUCCESS,
    ENTER_ROOM_FAILURE
} from '../modules/enterRoom';

import axios from 'axios';

import {
  ALERT_SUCCESS,
  ALERT_INFO,
  ALERT_WARNING,
  ALERT_ERROR,
  ALERT_SHIFT
} from "store/modules/alertState"
import { ROOM_INFO_REQUEST } from '../modules/roomInfo';


//Request Room Info
function requestRoomInfoAxios(roomCode){
  return axios.get(
      '/room/'+roomCode+'/find',
      {withCredentials: true}
    );
}


//Request Room Info
function requestRoomTicketAxios(roomCode){
  return axios.get(
      '/roomTicket/'+roomCode+'/find',
      {withCredentials: true}
    );
}


function* EnterRoomRequest(action) {
  try {
    console.log('saga request enter room -> Request Room Ticket');

    const result = yield call(requestRoomTicketAxios,action.roomCode);

    switch(result.data.code){
      case 200:{
        //Response Success
        yield put({
          type: ENTER_ROOM_SUCCESS,
          roomCode: action.roomCode,
          isValidCode: true,
          data: result.data.result[0]
        });       
        break;
      }
      case 400:{
       throw new errr("400-ERROR");
        break;
      }
      default:{
        break;
      }
    }


  } catch (err) {
    console.error(err);
    yield put({
      type: ENTER_ROOM_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchEnterRoomRequest() {
    yield takeLatest(ENTER_ROOM_REQUEST, EnterRoomRequest);
}



export default function* enterRoomSaga() {
    yield all([
      fork(watchEnterRoomRequest),
    ]);
  }