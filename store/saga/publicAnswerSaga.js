import { all, delay, fork, put, takeLatest,call } from 'redux-saga/effects';

import {
    ANSWER_UPDATE_REQUEST,
    ANSWER_UPDATE_SUCCESS,
    ANSWER_UPDATE_FAILUTRE
} from "../modules/publicAnswerState";

import axios from 'axios';


//update answers which are followed by questiond Id
function UpdateAnswersAxios(data,roomCode){

    const body = []

    Object.keys(data).map((key) => {
        body.push({"questionId":key,"answerScore": data[key]});
    });

    console.log(roomCode);
    console.log(body);

    return axios.post(
        '/roomTicket/'+roomCode+'/updateAnswersScore',
        body,
        {withCredentials: true}
    )

}

function* requestUpdateAnswers(action){

    try{

        console.log('saga Update Answers');


        let result = yield call(UpdateAnswersAxios, action.data, action.roomCode);

        console.log(result);




        yield put({
            type: ANSWER_UPDATE_SUCCESS,
            data: result.data
        });
    }
    catch(err){

        yield put({
            type: ANSWER_UPDATE_FAILUTRE,
            data: result.data
        });

    }
}


function* watchUpdateAnswers(){
    yield takeLatest(ANSWER_UPDATE_REQUEST, requestUpdateAnswers);
  }


export default function* publicAnswerSaga() {
    yield all([
      fork(watchUpdateAnswers),
    ]);
  }