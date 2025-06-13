import React from 'react'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import { useRouter } from 'next/navigation'

const BackArrow = () => {
  const router = useRouter()
  const backHome = () => {
    router.push('/')
  }
  return (
    <div className="flex w-[20%] justify-center h-screen absolute">
      <button onClick={backHome} className=" text-white">
        <FirstPageIcon className=" text-white text-5xl transition-transform duration-300 active:scale-150 " />
      </button>
    </div>
  )
}

export default BackArrow
