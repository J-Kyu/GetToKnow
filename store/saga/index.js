import { all, fork } from 'redux-saga/effects';
import userSaga from './userSaga';
import pubicQuestionsSaga from 'store/saga/publicQuestionsSaga';
import roomInfoSaga from './roomInfoSaga';

//saga 함수 등록
export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(pubicQuestionsSaga),
    fork(roomInfoSaga)
  ]);
}