'use client'
import InputElement from "@/components/InputElement";
import { LoginSchema, loginSchema } from "@/util/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormCard from "../forms/form-components/FormCard";
import { useState } from "react";
import { auth } from "@/lib/firebase/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import translateFirebaseError from "@/util/translateFirebaseError";
import { useRouter } from "next/navigation";


const Login = () => {

  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })
  const [loginError, setLoginError] = useState<string | null>('')

  const submit = async (data: LoginSchema) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.senha)
      if(userCredential){
        router.push("/list/listar-seminovo")
        setLoginError('')
      }
    } catch (error:any) {
      if(error?.code.includes("auth/")){
        setLoginError(translateFirebaseError(error.code))
      }else{
        setLoginError(error.message)
      }
      console.error(error)
    }
  }


  return (
    <div className="w-[90%] max-w-[600px] absolute top-15 left-[50vw] translate-x-[-50%]">
      <FormCard title="Login">
        <form onSubmit={handleSubmit(submit)}>
          <div className="mt-4">
            <InputElement label="E-mail" register={register} registerName="email" errorMessage={errors.email?.message} />
          </div>
          <div className="mt-4 mb-4">
            <InputElement type="password" label="Senha" register={register} registerName="senha" errorMessage={errors.senha?.message} />
          </div>
          <p className="text-danger mb-1">{loginError}</p>
          <button type="submit" className=" flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Login
          </button>
          
        </form>
      </FormCard>
    </div>
  );
}

export default Login;