import {
  ButtonLoginRedirect,
  ButtonRegisterRedirect,
} from './_components/Buttons.jsx'
import dotenv from 'dotenv'
dotenv.config({ path: '.env ' })

export default function Home() {
  return (
    <div className="bg-cover bg-center min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col gap-10  h-96 justify-center items-center">
        <p className="text-white text-center font-bold text-3xl">
          Seja bem vindo ao portal clima!
        </p>
        <div className="flex gap-5 ">
          <ButtonLoginRedirect />
          <ButtonRegisterRedirect />
        </div>
      </div>
    </div>
  )
}
