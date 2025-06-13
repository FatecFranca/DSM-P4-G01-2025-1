'use client'
import React, { useState } from 'react'
import CreateIcon from '@mui/icons-material/Create'
import LoadingSpinner from './LoadingSpiner'
import { addCity } from '../_service/user/postCity'
import { getCityWeather } from '../_service/hq-api/getCity'
import serializedApi from '../_serializer/serializarApi'
import { createPortal } from 'react-dom'

const ModalCity = ({ customer }) => {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchCity, setSearchCity] = useState('')

  const { _id, token } = customer

  const cityLocation = async () => {
    const cityApi = await getCityWeather(searchCity)
    const cityParse = serializedApi(cityApi?.response?.data)
    return cityParse?.city
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleAdd = async () => {
    const city = await cityLocation()
    await addCity(_id, city, token)
    setLoading(true)
    handleClose()
    window.location.reload()
  }

  return (
    <>
      {loading && <LoadingSpinner />}

      <button
        onClick={handleShow}
        className="text-white px-3 py-2 rounded flex items-center gap-2 hover:text-blue-500 transition-colors duration-300"
      >
        <CreateIcon fontSize="small" />
      </button>

      {show &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-gray-500 text-black rounded-xl shadow-2xl p-6 max-w-md w-full relative">
              {/* Botão de fechar */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
              >
                ×
              </button>

              <p className="text-lg mb-3 text-white">Qual a sua cidade?</p>
              <p className="text-xs mb-4 text-white">
                Obs: separe o estado por vírgula
              </p>

              <input
                className="mb-5 w-full p-2 rounded border placeholder:text-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setSearchCity(e.target.value)}
                value={searchCity}
                placeholder="Ex: Franca, SP"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

export default ModalCity
