import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"

export const Signup = () => {
  return (
    <main className="h-screen flex items-center justify-center bg-[url(/bg03.jpg)] bg-no-repeat bg-center bg-cover">
      <div className="bg-white w-[500px] rounded-md px-10 py-10">

        <div className="mb-10">
          <h1 className="text-4xl mb-2 text-gray-700 w-full">Sign up and keep your finance organized</h1>
          <h3 className="mb-4 text-lg text-gray-400 w-full">Money in Check, Worries in Checkmate! 💰</h3>
        </div>

        <form>

          <Label htmlFor="first-name" className="mb-2 text-gray-600">First Name<span className="text-red-500">*</span></Label>
          <Input type="text" id='first-name' placeholder="Enter your first name" className="mb-6 py-6" />

          <Label htmlFor="last-name" className="mb-2 text-gray-600">Last Name<span className="text-red-500">*</span></Label>
          <Input type="text" id='last-name' placeholder="Enter your last name" className="mb-6 py-6" />

          <Label htmlFor="email" className="mb-2 text-gray-600">Email<span className="text-red-500">*</span></Label>
          <Input type="email" id='email' placeholder="Enter your email" className="mb-6 py-6" />

          <Label htmlFor="password" className="mb-2 text-gray-600">Password<span className="text-red-500">*</span></Label>
          <Input type="password" id='password' placeholder="Enter your password" className="mb-6 py-6" />

          <Button className="cursor-pointer w-full py-6 mb-4">Login with email</Button>

          <span className="text-center text-sm text-gray-500">
            Already have an account? <Link to='/' className="font-bold underline">Sign in Here</Link>
          </span>

        </form>

      </div>
    </main>
  )
}