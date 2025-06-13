'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import LogoutIcon from '@mui/icons-material/Logout'
import LoadingSpinner from './LoadingSpiner'

const ModalLogout = () => {
  const [show, setShow] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleLogout = () => {
    sessionStorage.removeItem('user')
    setShow(false)
    setShowSuccess(true)

    setTimeout(() => {
      router.push('/')
    }, 1000)
  }

  return (
    <>
      <button
        onClick={handleShow}
        className=" text-white px-3 py-2 rounded flex items-center gap-2 hover:text-blue-500 transition-colors duration-300"
      >
        <LogoutIcon fontSize="small" />
        <span>Sair</span>
      </button>

      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* Modal box */}
          <div className="bg-gray-600 rounded-lg shadow-lg max-w-sm w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Tem certeza?</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </div>
            <p className="mb-6">Você tem certeza que deseja sair?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-300 hover:text-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && <LoadingSpinner />}
    </>
  )
}

export default ModalLogout
