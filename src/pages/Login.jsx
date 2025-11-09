import  { useState } from 'react'
import { loginSchema } from '../lib/validationSchmas/AuthSchema';
import { useForm } from "react-hook-form";
import {Button, DatePicker, Form, Input, Select, SelectItem} from "@heroui/react";
import { Link, useNavigate } from "react-router";
import  {zodResolver} from "@hookform/resolvers/zod"


export default function Login() {
  const [errorMSG,setErrorMsg]=useState("");
const [successMSG,setSuccessMsg]=useState("");
// const navigate = useNavigate()

  const {register , handleSubmit, formState:{errors , isSubmitting} } = useForm({
    resolver: zodResolver(loginSchema),
    mode:"all",
    defaultValues:{
      email:"",
      password:"",
    },
  });

  async function onSubmit(data) {
    setErrorMsg("")
    setSuccessMsg("")
    console.log(data);
    try{
      const response = await loginUser(data);
      console.log(response);
      setSuccessMsg(response.data.message)
      // navigate("/")
    }
    catch (error){
      setErrorMsg(error.response.data.error)
      setSuccessMsg(error.response.data.error)
    }
  }


  return (
    <form className="w-full max-w-4xl space-y-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-header">
        <h2 className="text-4xl font-bold mb-5">Welcome Back 👋🏼</h2>
        <p className="text-xl">login  your account</p>
      </div>
      <div className="input-form space-y-5">   
          <Input isInvalid={Boolean(errors.email)} errorMessage={errors.email?.message} {...register("email")} isRequired variant="faded" label="Email" placeholder="Enter your email" type="email" />
          <Input isInvalid={Boolean(errors.password)} errorMessage={errors.password?.message} {...register("password")} isRequired variant="faded" label="password" placeholder="Enter your password" type="password" />
          <div className="flex justify-between items-end">
            <Button  color="primary" type="submit">login</Button>
            <span>don't have an account? 
              <Link to='/register' className="font-bold ms-1 ">
                Sign in
              </Link>
            </span>
          </div>
      </div>
    </form>
  );
}
