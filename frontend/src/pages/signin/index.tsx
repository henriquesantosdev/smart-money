import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useEffect, useState } from "react"

import * as z from 'zod'
import { useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "@/redux/hooks/redux-hook"
import { signin } from "@/redux/user/slice"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast, Toaster } from "sonner"

const signinFormSchema = z.object({
  email: z.string()
    .nonempty("Field email is required")
    .email("Enter a valid email"),
  password: z.string()
    .nonempty("Field password name is required")
})

type Schema = z.infer<typeof signinFormSchema>

export const Signin = () => {
  const [passwordVisibility, setPasswordVisibility] = useState('password')
  const handlePasswordVisibility = () => {
    if (passwordVisibility === 'password') {
      setPasswordVisibility('text')
    } else {
      setPasswordVisibility('password')
    }
  }

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const { signupUserSuccess, signinUserSuccess } = useAppSelector(rootReducer => rootReducer.user)

  const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
    resolver: zodResolver(signinFormSchema)
  })

  const onSubmit = (data: Schema) => {
    dispatch(signin(data))
  }

  useEffect(() => {
    if (signupUserSuccess) {
      toast("User created", {
        description: "You can make login now!",
      })
    }
  }, [signupUserSuccess])

  useEffect(() => {
    if (signinUserSuccess) {
      navigate("/dashboard")
    }
  }, [signinUserSuccess, navigate])

  return (
    <main className="w-[1600px] m-auto h-screen gap-16 flex items-center justify-center bg-white">
      <Toaster position="top-right"/>
      <div className="w-8/12 h-[800px] p-2">
        <div className="rounded-md bg-[url(/liberty.jpg)] flex items-end justify-center h-full bg-no-repeat bg-center bg-cover">
          <p className="mb-16 text-white text-xl font-semibold text-center">Financial freedom starts with control in your hands.</p>
        </div>
      </div>

      <div className="h-full flex items-center w-4/12 px-5 py-10">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <img src="/logo.png" alt="Logo" />

          <h1 className="text-5xl font-bold mb-2 mt-8 text-gray-700 w-full">Welcome Back to Smart Money</h1>

          <span className="text-center text-sm text-gray-400">
            Not have an account? <Link to='/signup' className="font-bold underline">Sign Up Here</Link>
          </span>

          <div className="mb-6">
            <Label htmlFor="email" className="mb-2 mt-10 text-gray-600">Email<span className="text-red-500">*</span></Label>
            <Input {...register("email")} type="email" placeholder="Enter your email" className="py-6" />
            {errors.email && <p className="text-red-700 mt-1">*{errors.email.message}</p>}
          </div>

          <div className="mb-6">
            <Label htmlFor="password" className="mb-2 text-[#171717]">Password<span className="text-red-500">*</span></Label>
            <div className="flex items-center gap-2">
              <Input {...register("password")} type={passwordVisibility} placeholder="Enter your password" className="py-6" />
              
              <Button type="button" variant="outline" size="icon" className="p-2 cursor-pointer" onClick={() => handlePasswordVisibility()}>
                {passwordVisibility === 'password' ? (
                  <Eye className="cursor-pointer" />
                ) : (
                  <EyeOff className="cursor-pointer" />
                )}
              </Button>
            </div>
            {errors.password && <p className="text-red-700 mt-1">*{errors.password.message}</p>}

          </div>

          <Button className="cursor-pointer w-full py-6 mb-4" type="submit">
            <LogIn />
            Sign In
          </Button>
        </form>
      </div>

    </main>
  )
}