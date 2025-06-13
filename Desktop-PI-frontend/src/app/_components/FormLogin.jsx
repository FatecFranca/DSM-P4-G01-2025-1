'use client'
import React from 'react'
import { ButtonLoginSubmit } from './Buttons.jsx'
import { useState } from 'react'
import { authLogin } from '../_service/authentication/auth-login.js'
import { useRouter } from 'next/navigation'
import ErrorForms from './ErrorForms.jsx'
import errorhandling from '../_serializer/menssage-error.js'

const FormLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState(null)
  const router = useRouter()

  const handleRedirect = () => {
    router.push('/home')
  }

  const handlerSubmit = async (e) => {
    e.preventDefault()

    const response = await authLogin(email, password)

    if (!response.success) {
      setErrorMessage(response.message)
      setMessage(errorhandling(errorMessage))

      return
    }
    sessionStorage.setItem('user', JSON.stringify(response))
    return handleRedirect()
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="mb-10 mt-2">
        {errorMessage && <ErrorForms message={message} />}
      </div>
      <form
        className="flex flex-col gap-5  w-[80%] items-center"
        onSubmit={handlerSubmit}
      >
        <div className="flex justify-start items-start md:w-[40%] lg:w-[40%] xl:w-[40%]">
          <label htmlFor="login" className="text-white ">
            E-mail
          </label>
        </div>
        <input
          type="text"
          id="login"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
          className={`rounded-md w-[80%] md:w-[40%] lg:w-[40%] xl:w-[40%] px-2 py-2 border-2 ${message ? 'border-red-500' : 'border-gray-300'}`}
        />

        <div className="flex justify-start items-start md:w-[40%] lg:w-[40%] xl:w-[40%]">
          <label htmlFor="password" className="text-white ">
            Senha
          </label>
        </div>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          className={`rounded-md w-[80%] md:w-[40%] lg:w-[40%] xl:w-[40%] px-2 py-2 border-2 ${message ? 'border-red-500' : 'border-gray-300'}`}
        />

        <div className="mt-8">
          <ButtonLoginSubmit />
        </div>
      </form>
    </div>
  )
}

export default FormLogin
