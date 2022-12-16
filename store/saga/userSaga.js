import axios from 'axios';
import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';

import {

    LOG_IN_SUCCESS,
    LOG_IN_REQUEST,
    LOG_IN_FAILURE,

    LOAD_USER_INFO_REQUEST,
    LOAD_USER_INFO_SUCCESS,
    LOAD_USER_INFO_FAILURE,

    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,

    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
} from '../modules/userInfo';


import {
  BOTTOM_SHEET_LOGIN,
  BOTTOM_SHEET_ROOM_LOBBY
} from 'store/modules/bottomSheetState';




function getUserInfo(userId){
  return axios.get(`/user/${userId}/find`);
}




function thirdPartyLoginAxios(data){
  
  let form = new FormData();
  form.append('nickname', data.nickname);
  form.append('uuid',data.uuid);
  form.append('oAuthType', "KAKAO");

  return axios.post(
      '/user/logIn',
      form,
      {withCredentials: true}
    );
}


function loadUserInfoAxios(){
  return axios.get(
    '/user/load',
    {withCredentials: true}
  )

}


function* loadUserInfo(){


  try {

    const result = yield call(loadUserInfoAxios);
    //User Info Update
    yield put({
      type: LOAD_USER_INFO_SUCCESS,
      data: result.data,
    });

    //Room State to Lobby
    yield put({
      type: BOTTOM_SHEET_ROOM_LOBBY,
    });

  } catch (err) {

    console.error(err);
    yield put({
      type: LOAD_USER_INFO_FAILURE,
      error: err.message,
    });

    //Room State to Login
    yield put({
      type: BOTTOM_SHEET_LOGIN,
    });
  }
}

function* logIn(action) {
    try {
      let result = null;
      
      // Third Party Log In
      switch(action.data.oauthType){
        case "KAKAO": {
          //default log in
          console.log('saga kakao logIn');
          result = yield call(thirdPartyLoginAxios, action.data);
          console.log('-->',result);
          break
        };
        case "GOOGLE": {

          break;
        };
        default: {
          //default log in
          console.log('saga default logIn');
          throw new Error("Wrong oAuth Type Error: "+action.data.oauthType);
          break;
        };
      }
      
      console.log("------->",result);
      yield put({
        type: LOG_IN_SUCCESS,
        data: result.data
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: LOG_IN_FAILURE,
        error: err.message,
      });
    }
}


function* logOut(action) {
  try {
    console.log('saga log out');
    // const result = yield call(logInAPI);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.message,
    });
  }
}

function* watchLoadUserInfo(){
  yield takeLatest(LOAD_USER_INFO_REQUEST, loadUserInfo);
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}



export default function* userSaga() {
    yield all([
      fork(watchLogIn),
      fork(watchLogOut),
      fork(watchLoadUserInfo),

    ]);
  }