import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import { Signin } from "./pages/signin"
import { Signup } from "./pages/signup"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
