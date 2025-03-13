import { createSlice } from '@reduxjs/toolkit'

interface initialStateInterface {
  user: unknown,
  loading: boolean
}

const initialState: initialStateInterface = {
  user: null,
  loading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signin: () => {
    },
    
    signinSuccess: () => {
    },
    
    signinFailure: () => {
    },
    
    signup: (state) => {
      state.loading = true
    },
    
    signupSuccess: (state, action) => {
      state.user = action.payload
      state.loading = false
    },

    signupFailure: (state, action) => {
      alert(action.payload)
      state.loading = false
    },

    signout: () => {
      // console.log('Passou no userSlice signout')
    }
  }
})

export const {
  signin,
  signout,
  signup
} = userSlice.actions

export default userSlice.reducer