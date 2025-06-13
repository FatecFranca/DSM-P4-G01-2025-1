'use client'
import React, { useState, useEffect } from 'react'
import {
  Thermometer,
  Droplets,
  Calendar,
  Clock,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'
import { getTemp } from '@/app/_service/temp/temp'
import serializeruser from '../../_serializer/serializeruser'

const ButtonHomeRedirect = () => (
  <button
    className="bg-gray-300 text-black font-light rounded-md py-3 px-8 shadow-md shadow-black 
                  transition-transform duration-150 active:scale-95"
  >
    Fazer Login
  </button>
)

const Backgroud = ({ children }) => (
  <div className="bg-black/50 backdrop-blur-sm h-[85vh] w-[85%] max-w-7xl mx-auto rounded-lg shadow-lg shadow-black/30 flex flex-col overflow-hidden">
    {children}
  </div>
)

const LoadingSkeleton = () => (
  <div className="animate-pulse p-3 sm:p-4 md:p-6">
    <div className="h-8 sm:h-10 md:h-12 bg-white/20 rounded-xl mb-6 sm:mb-8 w-60 sm:w-80 mx-auto"></div>
    <div className="bg-white/10 p-4 sm:p-6 md:p-10 rounded-3xl backdrop-blur-lg border border-white/20">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center space-y-3 sm:space-y-4"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full"></div>
            <div className="h-4 sm:h-6 bg-white/20 rounded w-20 sm:w-24"></div>
            <div className="h-6 sm:h-8 md:h-10 bg-white/20 rounded w-16 sm:w-20"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const DataCard = ({ icon: Icon, label, value, color, unit }) => (
  <div className="group relative">
    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/5 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
    <div className="relative bg-white/5 p-2 sm:p-3 md:p-4 lg:p-6 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-xl hover:shadow-white/10 hover:-translate-y-1">
      <div className="flex flex-col items-center text-center space-y-1 sm:space-y-2 md:space-y-3">
        <div
          className={`p-1.5 sm:p-2 md:p-3 rounded-full bg-gradient-to-br ${color} shadow-lg`}
        >
          <Icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white" />
        </div>
        <p className="text-white/70 text-[10px] sm:text-xs font-medium uppercase tracking-wider">
          {label}
        </p>
        <div className="flex items-baseline space-x-1">
          <p className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            {value}
          </p>
          {unit && (
            <span className="text-white/60 text-xs sm:text-sm md:text-base">
              {unit}
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
)

const Live = () => {
  const [customer, setCustomer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [dados, setDados] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = JSON.parse(sessionStorage.getItem('user'))
        const customerSerialized = serializeruser(data)
        setCustomer(customerSerialized)
        localStorage.setItem('customer', JSON.stringify(customerSerialized))

        const response = await getTemp()
        setDados(response)
        setLastUpdate(new Date())
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const refreshData = async () => {
    setIsLoading(true)
    try {
      const response = await getTemp()
      setDados(response)
      setLastUpdate(new Date())
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center p-2 sm:p-4">
        <Backgroud>
          <div className="flex items-center justify-center min-h-full">
            <div className="w-full max-w-4xl">
              <LoadingSkeleton />
            </div>
          </div>
        </Backgroud>
      </div>
    )
  }

  if (!customer?._id) {
    return (
      <div className="min-h-screen flex justify-center items-center p-2 sm:p-4">
        <Backgroud>
          <div className="flex flex-col items-center justify-center min-h-full space-y-6 sm:space-y-8 p-4 sm:p-6 md:p-8 text-center">
            <div className="p-4 sm:p-6 rounded-full bg-red-500/20 backdrop-blur-md border border-red-500/30">
              <AlertCircle className="w-8 h-8 sm:w-12 sm:h-12 text-red-400" />
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
                Acesso Restrito
              </h2>
              <p className="text-white/70 text-base sm:text-lg max-w-md">
                Você precisa estar logado para acessar os dados em tempo real
              </p>
            </div>
            <ButtonHomeRedirect />
          </div>
        </Backgroud>
      </div>
    )
  }
  console.log(dados.response.data.data)
  return (
    <div className="min-h-screen flex justify-center items-center p-2 sm:p-4">
      <Backgroud>
        <div className="flex flex-col h-full">
          {/* Header - Fixo no topo */}
          <div className="flex-shrink-0 text-center space-y-1 sm:space-y-2 p-1.5 sm:p-2 md:p-3 pb-0.5 sm:pb-1">
            <h1 className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Monitoramento em Tempo Real
            </h1>
            <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 text-white/60">
              <p className="text-[9px] sm:text-[20px]">
                Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')}
              </p>
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="p-0.5 sm:p-1 rounded-full hover:bg-white/10 transition-colors duration-200 disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${isLoading ? 'animate-spin' : ''}`}
                />
              </button>
            </div>
          </div>

          {/* Cards Grid - Área principal que cresce */}
          <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-6">
            <div className="w-full max-w-4xl mx-auto py-1 sm:py-2 md:py-4">
              <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4 lg:gap-6 ">
                <DataCard
                  icon={Calendar}
                  label="Data"
                  value={dados?.response?.data?.data}
                  color="from-blue-500 to-blue-600"
                />
                <DataCard
                  icon={Clock}
                  label="Horário"
                  value={dados?.response?.data?.hora}
                  color="from-green-500 to-green-600"
                />
                <DataCard
                  icon={Thermometer}
                  label="Temperatura"
                  value={dados?.response?.data?.temperatura?.replace('°C', '')}
                  unit="°C"
                  color="from-orange-500 to-red-500"
                />
                <DataCard
                  icon={Droplets}
                  label="Umidade"
                  value={dados?.response?.data?.umidade?.replace('%', '')}
                  unit="%"
                  color="from-cyan-500 to-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Status Bar - Fixo na parte inferior */}
          <div className="flex-shrink-0 flex justify-center p-1.5 sm:p-2 md:p-3 pt-0.5 sm:pt-1">
            <div className="bg-white/10 backdrop-blur-md rounded-full px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 border border-white/20">
              <div className="flex items-center justify-center space-x-1 sm:space-x-1.5">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-white/80 text-[9px] sm:text-[10px] md:text-xs font-medium">
                  Sistema Online
                </p>
              </div>
            </div>
          </div>
        </div>
      </Backgroud>
    </div>
  )
}

export default Live
