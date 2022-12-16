import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';
import {BOTTOM_SHEET_ROOM_QUESTIONS} from 'store/modules/bottomSheetState';
import axios from "axios";

import {
    ROOM_INFO_REQUEST,
    ROOM_INFO_SUCCESS,
    ROOM_INFO_FAILURE,

    ROOM_GEN_REQUEST,
    ROOM_GEN_SUCCESS,
    ROOM_GEN_FAILURE
} from '../modules/roomInfo';


import {
  PUBLIC_QUESTIONS_REQUEST,
} from '../modules/publicQuestions';



//Request Creating Room 
function createRoomAxios(data){
  //form data
  let form = new FormData();
  form.append('roomType', data.roomType);
  form.append('maxNum', data.maxNum);

  return axios.post(
      '/room/new',
      form,
      {withCredentials: true}
    );
}


function* CreateRoomRequest(action) {
  try {
    console.log('saga Create Room room info');
    //axios request
    let result = yield call(createRoomAxios, action.data);

    //Response Success
    yield put({
      type: ROOM_GEN_SUCCESS,
      data: result.data
    });

    //Request Public Questions
    yield put({
      type: PUBLIC_QUESTIONS_REQUEST,
      data: result.data.result[0]
    });

  
  } catch (err) {
    console.error(err);
    yield put({
      type: ROOM_GEN_FAILURE,
      error: err.response.data,
    });
  }
}




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
      type: ROOM_INFO_FAILURE,
      error: err.data,
    });
  }
}

function* watchRoomInfoRequest() {
    yield takeLatest(ROOM_INFO_REQUEST, RoomInfoRequest);
}


function* watchCreateRoomRequest() {
  yield takeLatest(ROOM_GEN_REQUEST, CreateRoomRequest);
}


export default function* roomInfoSaga() {
    yield all([
      fork(watchRoomInfoRequest),
      fork(watchCreateRoomRequest),
    ]);
  }