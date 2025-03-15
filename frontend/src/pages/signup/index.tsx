import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppSelector } from "@/redux/hooks/redux-hook"
import { Eye, EyeOff, LoaderCircle, LogIn } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { useForm } from "react-hook-form"

import { signup } from "@/redux/user/slice"
import { useDispatch } from "react-redux"

const signupFormSchema = z.object({
  firstname: z.string()
    .nonempty("Field first name is required")
    .regex(/^[a-zA-z]+$/i, "Only letters are allowed"),
  secondname: z.string()
    .nonempty("Field second name is required")
    .regex(/^[a-zA-z]+$/i, "Only letters are allowed"),
  email: z.string()
    .nonempty("Field email is required")
    .email("Enter a valid email"),
  password: z.string()
    .nonempty("Field password name is required")
})

type Schema = z.infer<typeof signupFormSchema>

export const Signup = () => {
  const { loading, signupUserSuccess } = useAppSelector((rootReducer) => rootReducer.user)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [passwordVisibility, setPasswordVisibility] = useState('password')
  const handlePasswordVisibility = () => {
    if (passwordVisibility === 'password') {
      setPasswordVisibility('text')
    } else {
      setPasswordVisibility('password')
    }
  }

  const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
    resolver: zodResolver(signupFormSchema)
  })

  const onSubmit = async (data: Schema) => {
    dispatch(signup(data))
  }

  useEffect(() => {
    if (signupUserSuccess) {
      navigate('/', {replace: true})
    }
  }, [signupUserSuccess, navigate]);

  return (
    <main className="w-[1600px] m-auto h-screen gap-16 flex items-center justify-center bg-white">
      <div className="w-8/12 h-[800px] p-2">
        <div className="rounded-md bg-[url(/liberty.jpg)] flex items-end justify-center h-full bg-no-repeat bg-center bg-cover">
          <p className="mb-16 text-white text-xl font-semibold text-center">Financial freedom starts with control in your hands.</p>
        </div>
      </div>

      <div className="h-full flex items-center w-4/12 px-5 py-10">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <img src="/logo.png" alt="Logo" />

          <h1 className="text-5xl font-bold mb-2 mt-8 text-gray-700 w-full">Create an account</h1>

          <span className="text-center text-sm text-gray-400">
            Already an account? <Link to='/' className="font-bold underline">Sign In Here</Link>
          </span>

          <div className="flex gap-4 mt-10 mb-6">
            <div className="w-2/4">
              <Label htmlFor="firstname" className="mb-2 text-[#171717]">First name<span className="text-red-500">*</span></Label>
              <Input type="text" placeholder="Enter your first name" className="py-6" {...register("firstname")} />

              {errors.firstname && <p className="text-red-700 mt-1">*{errors.firstname.message}</p>}
            </div>

            <div className="w-2/4">
              <Label htmlFor="secondname" className="mb-2 text-[#171717]">Second name<span className="text-red-500">*</span></Label>
              <Input type="text" placeholder="Enter your second name" className="py-6" {...register("secondname")} />

              {errors.firstname && <p className="text-red-700 mt-1">*{errors.secondname?.message}</p>}
            </div>
          </div>

          <div className="mb-6">
            <Label htmlFor="email" className="mb-2 text-[#171717]">Email<span className="text-red-500">*</span></Label>
            <Input type="email" placeholder="Enter your email" className="py-6" {...register("email")} />

            {errors.email && <p className="text-red-700 mt-1">*{errors.email?.message}</p>}
          </div>

          <div className="mb-6">
            <Label htmlFor="password" className="mb-2 text-[#171717]">Password<span className="text-red-500">*</span></Label>
            <div className="flex items-center gap-2">
              <Input type={passwordVisibility} placeholder="Enter your password" className="py-6" {...register("password")} />

              <Button type="button" variant="outline" size="icon" className="p-2 cursor-pointer" onClick={() => handlePasswordVisibility()}>
                {passwordVisibility === 'password' ? (
                  <Eye className="cursor-pointer" />
                ) : (
                  <EyeOff className="cursor-pointer" />
                )}
              </Button>
            </div>
            {errors.password && <p className="text-red-700 mt-1">{errors.password?.message}</p>}
          </div>

          <Button className="cursor-pointer w-full py-6 mb-4" type="submit" disabled={loading}>
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <LogIn />
                Sign Up
              </>
            )}
          </Button>
        </form>
      </div>

    </main >
  )
}