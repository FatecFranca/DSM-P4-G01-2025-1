'use client'
import React, { useState, useEffect, useRef } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import Link from 'next/link'
import LoadingSpinner from './LoadingSpiner'
import ModalLogout from './ModalLogout'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const menuRef = useRef(null)

  const eventClick = () => {
    setIsOpen(false)
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const toggleNavbar = () => setIsOpen((prev) => !prev)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <>
      {loading && <LoadingSpinner />}
      <button
        onClick={toggleNavbar}
        className={`absolute top-4 left-4 z-40 text-white ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MenuIcon />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30"></div>
      )}

      <div
        ref={menuRef}
        className={`fixed h-full z-40 transition-all duration-300 top-0 left-0 rounded-e-xl ${isOpen ? 'w-[70%] md:w-[35%]' : 'w-0'} overflow-hidden`}
        style={{ backgroundColor: '#004983b3' }}
      >
        {isOpen && (
          <div className="p-4 h-full relative">
            <ul className="mt-28">
              <li
                className="border-b-2 border-white hover:border-blue-500 transition-colors duration-300"
                onClick={eventClick}
              >
                <Link href="/home/temps">
                  <p className="text-white text-left text-xl p-3 pl-8 cursor-pointer">
                    Temperatura
                  </p>
                </Link>
              </li>
              <li
                className="border-b-2 border-white hover:border-blue-500 transition-colors duration-300"
                onClick={eventClick}
              >
                <Link href="/home/live">
                  <p className="text-white text-left text-xl p-3 pl-8 cursor-pointer">
                    Live
                  </p>
                </Link>
              </li>
              <li
                className="border-b-2 border-white hover:border-blue-500 transition-colors duration-300"
                onClick={eventClick}
              >
                <Link href="/home/artig">
                  <p className="text-white text-left text-xl p-3 pl-8 cursor-pointer">
                    News
                  </p>
                </Link>
              </li>
              <li
                className="border-b-2 border-white hover:border-blue-500 transition-colors duration-300"
                onClick={eventClick}
              >
                <Link href="/home/dashboard">
                  <p className="text-white text-left text-xl p-3 pl-8 cursor-pointer">
                    Dashboard
                  </p>
                </Link>
              </li>
            </ul>
            <div className="absolute bottom-6 left-0 w-full flex flex-row gap-5 justify-around items-center">
              <p className="text-white text-md cursor-pointer ">
                <ModalLogout />
              </p>
              <Link href="/home/settings">
                <p
                  className="text-white text-md cursor-pointer hover:text-blue-500 transition-colors duration-300"
                  onClick={eventClick}
                >
                  <ManageAccountsIcon />
                </p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar
