'use client'
import React, { useState, useEffect } from 'react'
import serializeruser from '../../_serializer/serializeruser'
import { ButtonHomeRedirect } from '../../_components/Buttons'
import Backgroud from '@/app/_components/Backgroud'

const Dashboard = () => {
  const [customer, setCustomer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = JSON.parse(sessionStorage.getItem('user'))
        const customerSerialized = serializeruser(data)
        setCustomer(customerSerialized)
        localStorage.setItem('customer', JSON.stringify(customerSerialized))
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center p-4">
        <Backgroud>
          <div className="flex items-center justify-center h-full min-h-[400px]">
            <div className="w-full max-w-md rounded animate-pulse flex flex-col gap-4 p-4 relative">
              <div className="h-80 bg-white/10 rounded flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        </Backgroud>
      </div>
    )
  }

  // Not authenticated state
  if (!customer?._id) {
    return (
      <div className="min-h-screen flex justify-center items-center p-4">
        <Backgroud>
          <div className="flex flex-col gap-8 justify-center items-center h-full min-h-[400px] p-6">
            <p className="text-white text-center font-bold text-lg md:text-xl">
              Faça login para continuar!
            </p>
            <ButtonHomeRedirect />
          </div>
        </Backgroud>
      </div>
    )
  }

  // Main content
  return (
    <div className="min-h-screen flex justify-center items-center p-2 sm:p-4">
      <Backgroud>
        <div className="w-full h-full">
          <iframe
            className="w-full h-full"
            src="https://lookerstudio.google.com/embed/reporting/14699bb1-d3a1-44e4-8d66-d88243dbcd2c/page/nEsNF"
            frameBorder="0"
            allowFullScreen
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      </Backgroud>
    </div>
  )
}

export default Dashboard
