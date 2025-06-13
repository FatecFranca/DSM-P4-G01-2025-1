'use client'
import React, { useState, useEffect } from 'react'
import serializeruser from '../../_serializer/serializeruser'
import { ButtonHomeRedirect } from '../../_components/Buttons'
import Backgroud from '@/app/_components/Backgroud'
import { getCityWeather } from '@/app/_service/hq-api/getCity'
import { getUser } from '@/app/_service/user/getUser'
import serializedApi from '@/app/_serializer/serializarApi'

const Temps = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [customer, setCustomer] = useState()
  const [weather, setWeather] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await JSON.parse(sessionStorage.getItem('user'))
        const customerSerialized = serializeruser(data)
        setCustomer(customerSerialized)

        const profileResponse = await getUser(
          customerSerialized.email,
          customerSerialized.token,
        )
        const city = profileResponse.response.data.user.city
        const cityWeather = await getCityWeather(city)

        const weatherParse = serializedApi(cityWeather?.response?.data)

        setWeather(weatherParse)
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
      <div className="min-h-screen flex justify-center items-center p-4">
        <Backgroud>
          <div className="flex items-center justify-center min-h-screen">
            <div className="h-full w-full animate-pulse flex flex-col gap-3 p-3">
              <div className="h-16 bg-white/10 rounded-lg"></div>
              <div className="h-12 bg-white/10 rounded-lg"></div>
              <div className="flex-1 bg-white/10 rounded-lg min-h-[120px]"></div>
            </div>
          </div>
        </Backgroud>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      {!customer?._id ? (
        <div className="bg-cover bg-center min-h-screen flex flex-col justify-center items-center">
          <div className="flex flex-col gap-8 h-full justify-center items-center p-8">
            <p className="text-white text-center font-semibold text-lg">
              Faça login para continuar!
            </p>
            <div className="flex flex-col gap-5">
              <ButtonHomeRedirect />
            </div>
          </div>
        </div>
      ) : (
        <Backgroud>
          <div className="flex flex-col h-full w-full p-3">
            {/* Current Weather Section */}
            <div className="text-white text-center mb-4">
              <p className="text-xl font-medium opacity-90 mb-1">
                {weather?.forecast?.[0]?.weekday}
              </p>
              <p className="text-xl opacity-75 font-normal mb-2">
                {weather?.city}
              </p>
              <div className="mb-2">
                <p className="text-5xl font-normal">{weather?.temp}°</p>
              </div>
              <p className="text-lg capitalize opacity-90">{weather?.desc}</p>
            </div>

            {/* Weather Details - Horizontal Layout */}
            <div className="grid grid-cols-3 gap-2 mb-4 px-1">
              <div className="bg-white/5 rounded-lg p-2 border border-white/10 text-center">
                <div className="text-white/70 text-xs mb-1">Umidade</div>
                <div className="text-white font-medium text-lg">
                  {weather?.humidity}%
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-2 border border-white/10 text-center">
                <div className="text-white/70 text-xs mb-1">Min / Max</div>
                <div className="text-white font-medium text-lg">
                  {weather?.forecast?.[0]?.min}° - {weather?.forecast?.[0]?.max}
                  °
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-2 border border-white/10 text-center">
                <div className="text-white/70 text-xs mb-1">Chuva</div>
                <div className="text-white font-medium text-lg">
                  {weather?.rain}%
                </div>
              </div>
            </div>

            {/* 7-Day Forecast - Compact */}
            <div className="bg-white/5 rounded-lg border border-white/10 flex-1 ">
              <h3 className="text-white font-medium p-3 pb-2 text-center text-lg">
                Próximos dias
              </h3>

              <div className="px-3 pb-3 space-y-1">
                {weather?.forecast?.slice(1, 7).map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-white/5 transition-colors duration-200"
                  >
                    <span className="text-white font-light text-base w-12 truncate">
                      {day.weekday}
                    </span>

                    <div className="flex items-center gap-2 flex-1 justify-end">
                      <span className="text-white/60 text-base min-w-[24px] text-right">
                        {day.min}°
                      </span>

                      <div className="w-80 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-orange-400 rounded-full"
                          style={{
                            width: `${Math.max(20, Math.min(100, ((day.max - day.min) / 25) * 100))}%`,
                          }}
                        ></div>
                      </div>

                      <span className="text-white font-medium text-base min-w-[24px] text-right">
                        {day.max}°
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Backgroud>
      )}
    </div>
  )
}

export default Temps
