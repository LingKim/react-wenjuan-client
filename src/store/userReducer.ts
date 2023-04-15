import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserStateType {
  username: string
  nickname: string
}

const INIT_STATE: UserStateType = {
  nickname: '11',
  username: '22',
}

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    loginReducer(state: UserStateType, action: PayloadAction<UserStateType>) {
      return action.payload
    },
    logoutReducer: () => INIT_STATE,
  },
})

export const { loginReducer, logoutReducer } = userSlice.actions

export default userSlice.reducer
