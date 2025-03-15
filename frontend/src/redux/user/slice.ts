import { setToken } from '@/services/auth';
import { createSlice } from '@reduxjs/toolkit'

interface UserInterface {
  email: string;
  first_name: string;
  last_name: string;
}

export interface InitialStateInterface {
  user: UserInterface | null
  loading: boolean;
  signupUserSuccess: boolean;
  signinUserSuccess: boolean
}

const initialState: InitialStateInterface = {
  user: null,
  loading: false,
  signupUserSuccess: false,
  signinUserSuccess: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signin: (state, action) => {
      console.log("signin", action)
      state.loading = true
    },

    signinSuccess: (state, action) => {
      setToken(action.payload.data.token)
      console.log(action.payload.data.token)
      state.user = action.payload.data
      state.loading = false
      state.signinUserSuccess = true
    },

    signinFailure: (state, action) => {
      console.log(action.payload)
      console.log("erro no signin")
      state.loading = false
    },

    signup: (state, action) => {
      state.loading = true
      console.log(action)
    },

    signupSuccess: (state) => {
      console.log('signup efetuado com sucesso')
      state.loading = false
      state.signupUserSuccess = true
    },

    signupFailure: (state, action) => {
      alert(action.payload)
      state.signupUserSuccess = false
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
  signup,
  signupSuccess,
  signupFailure,
  signinFailure,
  signinSuccess
} = userSlice.actions

export default userSlice.reducer