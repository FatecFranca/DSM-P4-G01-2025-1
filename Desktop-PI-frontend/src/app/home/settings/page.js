'use client'
import React, { useState, useEffect } from 'react'
import { ButtonHomeRedirect } from '../../_components/Buttons'
import Image from 'next/image'
import ModalCity from '@/app/_components/ModalCity'
import { getUser } from '@/app/_service/user/getUser'
import authPage from '@/app/utils/authpage'

const Settings = () => {
  const [customer, setCustomer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [city, setCity] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storage = await authPage()
        setCustomer(storage)
        setTimeout(async () => {
          const profile = await getUser(storage.email, storage.token)
          setCity(profile?.response?.data?.user?.city)
        }, 500)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-white">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="h-screen flex justify-center items-center">
      {!customer?._id ? (
        <div className="bg-cover bg-center min-h-screen flex flex-col justify-center items-center">
          <div className="flex flex-col gap-10  h-96 justify-center items-center">
            <p className="text-white text-center font-bold">
              Faça login para continuar!
            </p>
            <div className="flex flex-col gap-5 ">
              <ButtonHomeRedirect />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center p-12 bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-xl shadow-lg max-w-lg mx-auto backdrop-blur-md border border-slate-700/30">
          <div className="relative mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
              <Image
                src="/profile.svg"
                alt={`Foto de perfil de ${customer.user}`}
                width={80}
                height={80}
                className="text-white filter brightness-0 invert"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-800 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="w-full space-y-4">
            <div className="bg-slate-700/20 rounded-lg pl-2 p-1 backdrop-blur-sm border border-slate-600/20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="flex">
                  <p className="text-white text-lg font-light">Nome: </p>
                  <p className="text-white text-lg font-semibold pl-2">
                    {customer.user}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/20 rounded-lg pl-2 p-1 backdrop-blur-sm border border-slate-600/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <div className="flex">
                    <p className="text-white text-lg font-light">Cidade: </p>
                    <p className="text-white text-lg font-semibold pl-2">
                      {city || 'Carregando...'}
                    </p>
                  </div>
                </div>
                <ModalCity customer={customer} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
