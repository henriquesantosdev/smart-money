import user from './user/saga'
import { all, Effect } from 'redux-saga/effects'

export default function* rootSaga(): Generator<Effect | void | unknown> {
  return yield all([
    user
  ])
}