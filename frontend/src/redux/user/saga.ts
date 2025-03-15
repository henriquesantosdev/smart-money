import api from "@/lib/axios"
import { all, call, put, takeLatest } from "redux-saga/effects"
import { signinFailure, signinSuccess, signupFailure, signupSuccess } from "./slice"

interface SignupPayload {
  payload: {
    firstname: string;
    secondname: string;
    email: string;
    password: string;
  }
}

interface SigninPayload {
  payload: {
    email: string;
    password: string;
  }
}

function* signup(action: SignupPayload): Generator<void | unknown> {
  try {
    const { email, firstname, password, secondname } = action.payload

    yield call(api.post, '/user',
      {
        first_name: firstname,
        last_name: secondname,
        email: email,
        password: password
      }
    )

    yield put(signupSuccess())

  } catch {
    yield put(signupFailure("Unable to signup"))
  }
}

function* signin(action: SigninPayload): Generator<void | unknown> {
  try {
    const { email, password } = action.payload

    const response = yield call(api.post, '/auth/signin',
      {
        email: email,
        password: password
      },
    )
    yield put(signinSuccess(response))

  } catch {
    yield put(signinFailure("Unable to signin"))
  }
}

export default all([
  takeLatest('user/signup', signup),
  takeLatest('user/signin', signin)
])