import { createSlice } from '@reduxjs/toolkit'

interface initialStateInterface {
  user: null
}

const initialState: initialStateInterface = {
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signin: () => {
      console.log('Passou no userSlice signin')
    },

    signout: () => {
      console.log('Passou no userSlice signout')
    }
  }
})

export const {
  signin,
  signout
} = userSlice.actions

export default userSlice.reducer