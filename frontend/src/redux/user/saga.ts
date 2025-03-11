import { all, takeLatest } from "redux-saga/effects"

function* signin() {
  yield console.log('passou no saga do user/signin')
}

export default all([
  takeLatest('user/signin', signin)
])