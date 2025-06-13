'use client'
import React, { useState, useEffect } from 'react'
import serializeruser from '../../_serializer/serializeruser'
import { ButtonHomeRedirect } from '../../_components/Buttons'
import Backgroud from '@/app/_components/Backgroud'
import { getNews } from '@/app/_service/news/getNews'
import CardNoticia from '@/app/_components/CardNoticia'

const Artig = () => {
  const [customer, setCustomer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [news, setNews] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = JSON.parse(sessionStorage.getItem('user'))
        const customerSerialized = serializeruser(data)
        setCustomer(customerSerialized)
        localStorage.setItem('customer', JSON.stringify(customerSerialized))

        const newsResult = await getNews()
        if (newsResult.success) {
          setNews(newsResult.response.data)
          console.log(newsResult.response.data)
        } else {
          console.error(newsResult.message)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center p-4">
        <Backgroud>
          <div className="flex items-center justify-center h-full min-h-[400px]">
            <div className="w-full max-w-md rounded animate-pulse flex flex-col gap-4 p-4">
              <div className="h-20 bg-white/10 rounded"></div>
              <div className="h-20 bg-white/10 rounded"></div>
              <div className="h-20 bg-white/10 rounded"></div>
              <div className="h-16 bg-white/10 rounded"></div>
            </div>
          </div>
        </Backgroud>
      </div>
    )
  }

  // Not authenticated state
  if (!customer?._id) {
    return (
      <div className="min-h-screen flex justify-center items-center p-4">
        <Backgroud>
          <div className="flex flex-col gap-8 justify-center items-center h-full min-h-[400px] p-6">
            <p className="text-white text-center font-bold text-lg md:text-xl">
              Faça login para continuar!
            </p>
            <ButtonHomeRedirect />
          </div>
        </Backgroud>
      </div>
    )
  }

  // Main content
  return (
    <div className="min-h-screen flex justify-center items-center p-2 sm:p-4">
      <Backgroud>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="flex-shrink-0 p-4 sm:p-6">
            <h1 className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl text-center">
              Notícias
            </h1>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto px-2 sm:px-4 pb-4">
            {news?.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {news.map((noticia, index) => (
                  <CardNoticia
                    key={noticia.id || index}
                    titulo={noticia.titulo}
                    link={noticia.link}
                    imagem={noticia.imagem}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[200px]">
                <p className="text-white/70 text-center text-lg">
                  Nenhuma notícia disponível no momento.
                </p>
              </div>
            )}
          </div>
        </div>
      </Backgroud>
    </div>
  )
}

export default Artig
