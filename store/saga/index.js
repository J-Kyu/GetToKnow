import { all, fork } from 'redux-saga/effects';
//saga
import userSaga from './userSaga';
import pubicQuestionsSaga from 'store/saga/publicQuestionsSaga';
import roomInfoSaga from './roomInfoSaga';
import enterRoomSaga from './enterRoomSaga';
import publicAnswerSaga from './publicAnswerSaga';
import roomTicketListSaga from './roomTicketListSaga';
import roomResultSaga from './roomResultSaga';
import testSaga from './testSaga';


import axios from 'axios';
import { backurl } from '@/configs/backendConfig';

axios.defaults.baseURL = backurl;
// axios.defaults.withCredentials = true;

//saga 함수 등록
export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(pubicQuestionsSaga),
    fork(roomInfoSaga),
    fork(enterRoomSaga),
    fork(testSaga),
    fork(publicAnswerSaga),
    fork(roomTicketListSaga),
    fork(roomResultSaga)
  ]);
}