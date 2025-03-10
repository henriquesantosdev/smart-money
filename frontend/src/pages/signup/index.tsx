import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export const Signup = () => {

  const [passwordVisibility, setPasswordVisibility] = useState('password')

  const handlePasswordVisibility = () => {
    if (passwordVisibility === 'password') {
      setPasswordVisibility('text')
    } else {
      setPasswordVisibility('password')
    }
  }

  return (
    <main className="w-[1600px] m-auto h-screen gap-16 flex items-center justify-center bg-white">
      <div className="w-8/12 h-[800px] p-2">
        <div className="rounded-md bg-[url(/liberty.jpg)] flex items-end justify-center h-full bg-no-repeat bg-center bg-cover">
          <p className="mb-16 text-white text-xl font-semibold text-center">Financial freedom starts with control in your hands.</p>
        </div>
      </div>

      <div className="h-full flex items-center w-4/12 px-5 py-10">
        <form className="w-full">
          <img src="/logo.png" alt="Logo" />

          <h1 className="text-5xl font-bold mb-2 mt-8 text-gray-700 w-full">Create an account</h1>

          <span className="text-center text-sm text-gray-400">
            Already an account? <Link to='/' className="font-bold underline">Sign In Here</Link>
          </span>

          <div className="flex gap-4 mt-10">
            <div className="w-2/4">
              <Label htmlFor="first-name" className="mb-2 text-[#171717]">First name<span className="text-red-500">*</span></Label>
              <Input type="text" id='first-name' placeholder="Enter your first name" className="mb-6 py-6" />
            </div>

            <div className="w-2/4">
              <Label htmlFor="second-name" className="mb-2 text-[#171717]">Second name<span className="text-red-500">*</span></Label>
              <Input type="email" id='second-name' placeholder="Enter your second name" className="mb-6 py-6" />
            </div>
          </div>

          <Label htmlFor="email" className="mb-2 text-[#171717]">Email<span className="text-red-500">*</span></Label>
          <Input type="email" id='email' placeholder="Enter your email" className="mb-6 py-6" />

          <div className="mb-6">
            <Label htmlFor="password" className="mb-2 text-[#171717]">Password<span className="text-red-500">*</span></Label>
            <div className="flex items-center gap-2">
              <Input type={passwordVisibility} id='password' placeholder="Enter your password" className="py-6" />
              <Button type="button" variant="outline" size="icon" className="p-2 cursor-pointer" onClick={() => handlePasswordVisibility()}>
                {passwordVisibility === 'password' ? (
                  <Eye className="cursor-pointer" />
                ) : (
                  <EyeOff className="cursor-pointer" />
                )}
              </Button>
            </div>
          </div>

          <Button className="cursor-pointer w-full py-6 mb-4">
            <LogIn />
            Sign Up
          </Button>
        </form>
      </div>

    </main>
  )
}