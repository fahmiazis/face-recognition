import {combineReducers} from 'redux'
import { persistReducer } from "redux-persist";

import auth from './auth'

export default combineReducers({
  auth
})
