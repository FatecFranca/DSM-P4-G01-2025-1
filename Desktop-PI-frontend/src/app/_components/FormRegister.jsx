'use client'
import React from 'react'
import { ButtonRegisterSubmit } from './Buttons.jsx'
import { useState } from 'react'
import { authregister } from '../_service/authentication/auth-register.js'
import ErrorForms from './ErrorForms.jsx'
import errorhandling from '../_serializer/menssage-error.js'
import { useRouter } from 'next/navigation'

const FormRegister = () => {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [passWord, setPassWord] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState(null)
  const router = useRouter()

  const handleRedirect = () => {
    router.push('/auth/register/sucess')
  }

  const hadlerSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    const response = await authregister(
      user,
      email,
      passWord,
      confirmedPassword,
    )

    if (!response.success) {
      setErrorMessage(response.message)
      setMessage(errorhandling(errorMessage))

      return
    }
    handleRedirect()
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="mb-10 mt-2">
        {errorMessage && <ErrorForms message={message} />}
      </div>

      <form
        className="flex flex-col gap-5  w-[80%] items-center"
        onSubmit={hadlerSubmit}
      >
        <div className="flex justify-start items-start md:w-[40%] lg:w-[40%] xl:w-[40%]">
          <label htmlFor="username" className="text-white ">
            Como gostaria de ser chamado?
          </label>
        </div>
        <input
          type="text"
          id="username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className={`rounded-md w-[80%] md:w-[40%] lg:w-[40%] xl:w-[40%] px-2 py-2 border-2 ${message ? 'border-red-500' : 'border-gray-300'}`}
        />

        <div className="flex justify-start items-start md:w-[40%] lg:w-[40%] xl:w-[40%]">
          <label htmlFor="newEmail" className="text-white ">
            Qual o seu melhor e-mail?
          </label>
        </div>
        <input
          type="text"
          id="newEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`rounded-md w-[80%] md:w-[40%] lg:w-[40%] xl:w-[40%] px-2 py-2 border-2 ${message ? 'border-red-500' : 'border-gray-300'}`}
        />

        <div className="flex justify-start items-start md:w-[40%] lg:w-[40%] xl:w-[40%]">
          <label htmlFor="newPassWord" className="text-white ">
            Senha
          </label>
        </div>
        <input
          type="password"
          id="newPassWord"
          value={passWord}
          onChange={(e) => setPassWord(e.target.value)}
          className={`rounded-md w-[80%] md:w-[40%] lg:w-[40%] xl:w-[40%] px-2 py-2 border-2 ${message ? 'border-red-500' : 'border-gray-300'}`}
        />

        <div className="flex justify-start items-start md:w-[40%] lg:w-[40%] xl:w-[40%]">
          <label htmlFor="Confirmedpassword" className="text-white ">
            Senha
          </label>
        </div>
        <input
          type="password"
          id="Confirmedpassword"
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
          className={`rounded-md w-[80%] md:w-[40%] lg:w-[40%] xl:w-[40%] px-2 py-2 border-2 ${message ? 'border-red-500' : 'border-gray-300'}`}
        />

        <div className="mt-8">
          <ButtonRegisterSubmit />
        </div>
      </form>
    </div>
  )
}

export default FormRegister
