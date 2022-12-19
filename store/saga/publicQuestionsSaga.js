import { all, delay, fork, put, takeLatest,call } from 'redux-saga/effects';

import axios from 'axios';

import {
    PUBLIC_QUESTIONS_REQUEST,
    PUBLIC_QUESTIONS_SUCCESS,
    PUBLIC_QUESTIONS_FAILURE
} from '../modules/publicQuestions';

import {
  BOTTOM_SHEET_LOADING
} from '../modules/bottomSheetState';

function getPublicQuestionAxios(roomCode){
  return axios.get(
      '/room/'+roomCode+'/getPublicQuestions',
      {withCredentials: true}
    );
}



function* PublicQuestionsRequest(action) {
  try {
    console.log('saga request public question');

    const result = yield call(getPublicQuestionAxios,action.roomCode);

    yield put({
      type: PUBLIC_QUESTIONS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PUBLIC_QUESTIONS_FAILURE,
      error: err.data,
    });
  }
}

function* watchPublicQuestionsRequest() {
    yield takeLatest(PUBLIC_QUESTIONS_REQUEST, PublicQuestionsRequest);
}



export default function* publicQuestionsSaga() {
    yield all([
      fork(watchPublicQuestionsRequest),
    ]);
  }