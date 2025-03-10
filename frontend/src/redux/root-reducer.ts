import { combineReducers } from 'redux'
import userSlice from "./user/slice";

export const rootReducer =  combineReducers({
  user: userSlice
})

export default rootReducer