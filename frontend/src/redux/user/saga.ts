import api from "@/lib/axios"
import { all, takeLatest } from "redux-saga/effects"

function* signup() {
  console.log('saga sigup')
  yield api.post('/user',
    {
      first_name: "Henrique",
      last_name: "Santos",
      email: "henriquesantos@gmail.com",
      password: "senha1234"
    }
  )
    .then(response => console.log(response.data))
    .catch(error => console.log(error.message))
}

export default all([
  takeLatest('user/signup', signup)
])