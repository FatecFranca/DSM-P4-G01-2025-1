'use client'
import React from 'react'
import { motion } from 'framer-motion'

const ErrorForms = ({ message }) => {
  if (!message) return null

  return (
    <motion.div
      className="bg-red-500 rounded-md p-6 px-12 text-white"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      {message}
    </motion.div>
  )
}

export default ErrorForms
