import React, { useMemo } from 'react'
import { Sun, Cloud } from 'lucide-react'

const LoadingSpinner = () => {
  const isSun = useMemo(() => Math.random() < 0.5, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-blue-200/30 to-white/10 backdrop-blur-sm">
      {isSun ? (
        <Sun className="w-12 h-12 text-yellow-400 animate-spin" />
      ) : (
        <div className="relative flex flex-col items-center">
          <Cloud className="w-14 h-14 text-blue-500 animate-pulse" />
          <div className="mt-1 flex gap-1 animate-bounce">
            <div className="w-1.5 h-3 rounded-full bg-blue-400"></div>
            <div className="w-1.5 h-3 rounded-full bg-blue-400 delay-100"></div>
            <div className="w-1.5 h-3 rounded-full bg-blue-400 delay-200"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoadingSpinner
