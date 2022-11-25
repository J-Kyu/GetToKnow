import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';

import {
    PUBLIC_QUESTIONS_REQUEST,
    PUBLIC_QUESTIONS_SUCCESS,
    PUBLIC_QUESTIONS_FAILURE
} from '../modules/publicQuestions';


function* PublicQuestionsRequest(action) {
  try {
    console.log('saga request public question');
    // const result = yield call(logInAPI);
    yield delay(1000);
    yield put({
      type: PUBLIC_QUESTIONS_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PUBLIC_QUESTIONS_FAILURE,
      error: err.response.data,
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