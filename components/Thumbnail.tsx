import Image from 'next/image'
import React from 'react'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/atoms'
import { Movie } from '../lib/types'

interface Props {
  source: string
  title: string
  movie: Movie
}

const Thumbnail: React.FC<Props> = ({ source, title, movie }) => {
  const [, setIsOpen] = useRecoilState(modalState)
  const [_, setMovie] = useRecoilState(movieState)

  const handleClick = () => {
    setIsOpen(true)
    setMovie(movie)
  }

  return (
    <div
      className="relative h-28 min-w-[180px] transform cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={handleClick}
    >
      <Image
        src={source}
        alt={title}
        className=""
        objectFit="cover"
        layout="fill"
      />
    </div>
  )
}

export default Thumbnail
