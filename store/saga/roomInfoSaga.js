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
  form.append('releaseDateTime', data.releaseDateTime);


  return axios.post(
      '/room/new',
      form,
      {withCredentials: true}
    );
}



//Request Room Info
function requestRoomInfoAxios(roomCode){
  return axios.get(
      '/room/'+roomCode+'/find',
      {withCredentials: true}
    );
}


function* CreateRoomRequest(action) {
  try {
    console.log('saga Create Room room info');
    //axios request
    let result = yield call(createRoomAxios, action.data);

    console.log(result);
    //Response Success
    yield put({
      type: ROOM_GEN_SUCCESS,
      data: result.data
    });

    //Request Public Questions
    yield put({
      type: PUBLIC_QUESTIONS_REQUEST,
      roomCode: result.data.result[0]
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
    const result = yield call(requestRoomInfoAxios,action.roomCode);

    switch(result.data.code){
      case 200:{
        //Response Success
        yield put({
          type: ROOM_INFO_SUCCESS,
          data: result.data,
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
      type: ROOM_INFO_FAILURE,
      error: err.data,
    });

    yield put({
      type: ALERT_ERROR,
      message: "Wrong Room Code: "+action.roomCode,
      description: "Room code "+action.roomCode+ " does not exist. Please check again."
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