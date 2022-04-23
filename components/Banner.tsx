import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Movie } from '../lib/types'

interface Props {
  netflixOriginals: Movie[]
}

const Banner: React.FC<Props> = ({ netflixOriginals }) => {
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length - 1)]
    )
  }, [])

  return (
    <div className="relative flex h-[300px] flex-col justify-center text-white sm:h-[400px] md:h-[500px] lg:h-[600px]">
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt=""
        layout="fill"
        objectFit="cover"
      />

      <div className="absolute ml-6">
        <h1 className="pb-2 text-3xl font-bold md:text-5xl">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="my-2 space-x-3">
          <button className="btn">Play</button>
          <button className="btn">My List</button>
        </div>

        <h1 className="max-w-xs pt-4 text-sm line-clamp-3 sm:max-w-lg">
          {movie?.overview}
        </h1>
      </div>

      <div className="absolute bottom-0 z-20 h-32 w-full bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}

export default Banner
