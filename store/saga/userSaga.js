import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';

import {
    LOG_IN_SUCCESS,
    LOG_IN_REQUEST,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE
} from '../modules/userInfo';


function* logIn(action) {
    try {
      console.log('saga logIn');
      // const result = yield call(logInAPI);
      yield delay(1000);
      yield put({
        type: LOG_IN_SUCCESS,
        data: action.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: LOG_IN_FAILURE,
        error: err.response.data,
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

export default function* userSaga() {
    yield all([
      fork(watchLogIn),
      fork(watchLogOut),
    ]);
  }