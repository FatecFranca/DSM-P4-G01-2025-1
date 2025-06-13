import React from 'react'

const DefaultAllpages = ({ customer }) => {
  return (
    <div className="bg-[rgba(0,0,0,0.5)] h-[80%] w-[80%] rounded-md shadow-md shadow-black flex-col">
      <p className="text-white font-extrabold text-xl mt-4 ml-4">
        Seja bem vindo {customer.user}
      </p>
      <div className="text-white mt-4 ml-4 flex">
        <p>temperatura em Franca </p>
        <p className="font-black">: 24°C 🌡️</p>
      </div>
    </div>
  )
}

export default DefaultAllpages
