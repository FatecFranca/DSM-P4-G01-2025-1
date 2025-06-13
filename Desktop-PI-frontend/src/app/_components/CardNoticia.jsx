/* eslint-disable @next/next/no-img-element */
import React from 'react'

const CardNoticia = ({ titulo, link, imagem }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col md:flex-row bg-white bg-opacity-10 hover:bg-opacity-25 transition duration-300 rounded-lg shadow-md shadow-black px-4 pt-4 pb-2 gap-3 items-center md:items-start"
      aria-label={`Abrir notícia: ${titulo}`}
    >
      <img
        src={imagem}
        alt={titulo}
        className="w-full md:w-40 h-28 md:h-24 object-cover rounded-md flex-shrink-0 shadow"
        loading="lazy"
        draggable={false}
      />
      <div className="flex flex-col justify-between flex-1">
        <h3 className="text-white font-semibold text-base md:text-base line-clamp-3">
          {titulo}
        </h3>
        <span className="mt-1 text-blue-400 hover:text-blue-500 font-medium text-sm transition">
          Leia mais &rarr;
        </span>
      </div>
    </a>
  )
}

export default CardNoticia
