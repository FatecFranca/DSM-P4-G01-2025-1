'use client'
import React, { useState, useEffect } from 'react'
import serializeruser from '../_serializer/serializeruser'
import { ButtonHomeRedirect } from '../_components/Buttons'

const Home = () => {
  const [customer, setCustomer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await JSON.parse(sessionStorage.getItem('user'))
        const customerSerialized = serializeruser(data)
        setCustomer(customerSerialized)
        localStorage.setItem('customer', JSON.stringify(customer))
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
        <p className="text-white text-base">Carregando...</p>
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
        <p
          className="text-white font-light text-5xl tracking-tight leading-tight"
          style={{
            textShadow: '3px 3px 12px rgba(0, 0, 0, 0.85)',
          }}
        >
          Bem-vindo {customer.user}
        </p>
      )}
    </div>
  )
}

export default Home
