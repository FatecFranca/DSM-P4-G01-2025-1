import React from 'react'

const Backgroud = ({ children }) => {
  return (
    <div className="bg-black/50 backdrop-blur-sm h-[85vh] w-[85%] max-w-7xl mx-auto rounded-lg shadow-lg shadow-black/30 flex flex-col overflow-y-auto overflow-x-hidden">
      {children}
    </div>
  )
}

export default Backgroud
