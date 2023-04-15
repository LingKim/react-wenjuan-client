import { configureStore } from '@reduxjs/toolkit'
import useReducer, { UserStateType } from './userReducer'

export interface StateType {
  user: UserStateType
}

export default configureStore({
  reducer: {
    user: useReducer,
  },
})
