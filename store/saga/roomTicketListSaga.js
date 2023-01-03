import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from "axios";

import {
    ROOM_TICKET_LIST_REQUEST,
    ROOM_TICKET_LIST_SUCCESS,
    ROOM_TICKET_LIST_FAILURE

} from "../modules/roomTicketListState";


//Request Creating Room 
function requestRoomTicketListAxios(){
  
    return axios.get(
        '/roomTicketList/findAll',
        {withCredentials: true}
      );
}


function* RequestRoomTicketList(action) {
    try {
      console.log('saga Request Room Ticket List');
      //axios request
      let result = yield call(requestRoomTicketListAxios);
  
      console.log(result);
      //Response Success
      yield put({
        type: ROOM_TICKET_LIST_SUCCESS,
        data: result.data.result
      });
  
    
    } catch (err) {
      console.error(err);
      yield put({
        type: ROOM_TICKET_LIST_FAILURE,
        error: err.data,
      });
    }
}
  
  
function* watchCreateRequestRoomTicketList() {
    yield takeLatest(ROOM_TICKET_LIST_REQUEST, RequestRoomTicketList);
}
  
  
  export default function* roomTicketListSaga() {
      yield all([
        fork(watchCreateRequestRoomTicketList),
      ]);
}