import axios from 'axios';
import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';

import {

    SAVE_COOKIE,
    LOAD_COOKIE,
    REMOVE_COOKIE
} from '../modules/testState';



function saveCookie(){
  return axios.get(`/cookie/save`, {withCredentials: true});
}

function loadCookie(){
  return axios.get(`/cookie/load`, {withCredentials: true});
}

function removeCookie(){
    return axios.get(`/cookie/remove`, {withCredentials: true});
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


function* removeCookieSaga() {
    try {
      console.log('saga Remove Cookie');
  
      //log in
      const result = yield call(removeCookie);
      console.log(result);
   
    } catch (err) {
      console.error(err);
    }
  }





function* watchSaveCookie() {
  yield takeLatest(SAVE_COOKIE, saveCookieSaga);
}

function* watchLoadCookie() {
  yield takeLatest(LOAD_COOKIE, loadCookieSaga);
}

function* watchRemoveCookie() {
    yield takeLatest(REMOVE_COOKIE, removeCookieSaga);
  }
  

export default function* userSaga() {
    yield all([
      fork(watchSaveCookie),
      fork(watchLoadCookie),
      fork(watchRemoveCookie),
    ]);
  }