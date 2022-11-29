import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';

import {
    ENTER_ROOM_REQUEST,
    ENTER_ROOM_SUCCESS,
    ENTER_ROOM_FAILURE,
    ENTER_ROOM_RESET
} from '../modules/enterRoom';

import {
  ALERT_SUCCESS,
  ALERT_INFO,
  ALERT_WARNING,
  ALERT_ERROR,
  ALERT_SHIFT
} from "store/modules/alertState"




function* EnterRoomRequest(action) {
  try {
    console.log('saga request enter room');
   

    // const result = yield call(logInAPI);
    yield delay(1500);

    if (action.roomCode == "1234"){
      yield put({
        type: ENTER_ROOM_SUCCESS,
        isValidCode: true
      });

      //reset data before move onto ANSWER_QUESTIONS_SHEET
      // yield put({type: ENTER_ROOM_RESET});

    }
    else{

      yield put({
        type: ENTER_ROOM_SUCCESS,
        isValidCode: false
      });

      yield put({
        type: ALERT_ERROR,
        message: "Wrong Room Code: "+action.roomCode,
        description: "Room code "+action.roomCode+ " does not exist. Please check again."
      });

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