import axios from 'axios';
import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';

import {
    LOG_IN_SUCCESS,
    LOG_IN_REQUEST,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    SAVE_COOKIE,
    LOAD_COOKIE
} from '../modules/userInfo';


function saveCookie(){
  return axios.get(`/cookie/save`);
}

function loadCookie(){
  return axios.get(`/cookie/load`);
}


function getUserInfo(userId){
  return axios.get(`/user/${userId}/find`);
}


function* saveCookieSaga() {
  try {
    console.log('saga Save Cookie');

    //log in
    const result = yield call(saveCookie);
    console.log(result);
 
  } catch (err) {
    console.error(err);
  }
}

function* loadCookieSaga() {
  try {
    console.log('saga Load Cookie');

    //log in
    const result = yield call(loadCookie);
    console.log(result);
 
  } catch (err) {
    console.error(err);
  }
}



function* logIn(action) {
    try {
      console.log('saga logIn');

      //log in
      const result = yield call(getUserInfo, 1);
      console.log(result);
      // yield delay(1000);
      yield put({
        type: LOG_IN_SUCCESS,
        data: action.data,
        userInfo: result,
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
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSaveCookie() {
  yield takeLatest(SAVE_COOKIE, saveCookieSaga);
}

function* watchLoadCookie() {
  yield takeLatest(LOAD_COOKIE, loadCookieSaga);
}

export default function* userSaga() {
    yield all([
      fork(watchLogIn),
      fork(watchLogOut),
    ]);
  }