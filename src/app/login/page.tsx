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
import httpClient from "@/infra/httpClient";
import baseUrl from "@/infra/back-end-connection";
import { verifyToken } from "@/infra/VerifyToken";
import Spinner from "@/components/common/Spinner";


const Login = () => {

  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })
  const [loginError, setLoginError] = useState<string | null>('')
  const [isLoading, setIsLoading] = useState(false)

  const submit = async (data: LoginSchema) => {
    try {
      setIsLoading(true)
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.senha)
      if (!!userCredential) {
        const token = await userCredential.user.getIdToken()
        console.log(token)
        document.cookie = `auth=${token}; path=/; max-age=86400`;
        await verifyToken(token)
        router.push("/list/listar-seminovo")
        setLoginError('')
        setIsLoading(false)
      }
    } catch (error: any) {
      setIsLoading(false)
      if (error?.code?.includes("auth/")) {
        setLoginError(translateFirebaseError(error.code))
      } else {
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
          <div className="flex justify-center">
            {isLoading && <Spinner size={30}/>}
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