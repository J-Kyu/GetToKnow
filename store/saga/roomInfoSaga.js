import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {BOTTOM_SHEET_ROOM_QUESTIONS} from 'store/modules/bottomSheetState';

import {
    ROOM_INFO_REQUEST,
    ROOM_INFO_SUCCESS,
    ROOM_INFO_FAILURE
} from '../modules/roomInfo';


function* RoomInfoRequest(action) {
  try {
    console.log('saga request room info');
    // const result = yield call(logInAPI);

    //Delay
    yield delay(2000);

    //Response Success
    yield put({
      type: ROOM_INFO_SUCCESS,
      data: action.data,
    });       
  } catch (err) {
    console.error(err);
    yield put({
      type: BOTTOM_SHEET_ROOM_QUESTIONS,
      error: err.response.data,
    });
  }
}

function* watchPublicRoomInfoRequest() {
    yield takeLatest(ROOM_INFO_REQUEST, RoomInfoRequest);
}





export default function* roomInfoSaga() {
    yield all([
      fork(watchPublicRoomInfoRequest),
    ]);
  }