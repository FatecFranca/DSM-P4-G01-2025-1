'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ButtonHomeRedirect } from '@/app/_components/Buttons'

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-3xl font-bold text-white"
      >
        Cadastro realizado com sucesso! ✅
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6"
      >
        <ButtonHomeRedirect />
      </motion.div>
    </div>
  )
}

export default Success
