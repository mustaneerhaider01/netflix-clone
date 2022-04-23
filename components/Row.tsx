import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import React, { useRef, useState } from 'react'
import { Movie } from '../lib/types'
import Thumbnail from './Thumbnail'

interface Props {
  title: string
  movies: Movie[]
}

const Row: React.FC<Props> = ({ title, movies }) => {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState<boolean>(false)

  function handleClick(direction: 'left' | 'right') {
    setIsMoved(true)
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <div className="ml-5 text-white">
      <h1 className="text-3xl font-semibold">{title}</h1>

      <div className="relative">
        <ChevronLeftIcon
          className={`scrollBtn absolute inset-y-0 left-2 
        my-auto ${!isMoved && 'hidden'}`}
          onClick={() => handleClick('left')}
        />

        <div
          className="-ml-2 flex items-center space-x-2.5 overflow-x-scroll p-2 scrollbar-hide md:p-4"
          ref={rowRef}
        >
          {movies.map((movie) => (
            <Thumbnail
              key={movie.id}
              movie={movie}
              title={movie.name || movie.original_name}
              source={`https://image.tmdb.org/t/p/original/${
                movie.backdrop_path || movie.poster_path
              }`}
            />
          ))}
        </div>

        <ChevronRightIcon
          className="scrollBtn absolute inset-y-0 right-2 my-auto"
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  )
}

export default Row
