import { all, fork } from 'redux-saga/effects';
import userSaga from './userSaga';


//saga 함수 등록
export default function* rootSaga() {
  yield all([
    fork(userSaga),
  ]);
}