import React, { useEffect, useState } from 'react'
import MuiModal from '@mui/material/Modal'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/atoms'
import axios from '../axios'
import { Element } from '../lib/types'
import ReactPlayer from 'react-player/lazy'
import { XIcon } from '@heroicons/react/outline'
import { VolumeOffIcon, VolumeUpIcon } from '@heroicons/react/solid'
import { createPortal } from 'react-dom'

const TrailerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState(movieState)
  const [trailer, setTrailer] = useState<string>('')
  const [muted, setMuted] = useState<boolean>(false)

  useEffect(() => {
    async function fetchMovie() {
      const { data } = await axios.get(
        `/movie/${movie?.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      )
      const trailerIndex = data.results.findIndex(
        (res: Element) => res.type === 'Trailer'
      )

      if (trailerIndex !== -1) {
        setTrailer(data.results[trailerIndex].key)
      } else {
        setIsOpen(false)
        setMovie(null)
      }
    }

    fetchMovie()
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    setMovie(null)
  }

  return createPortal(
    <MuiModal
      open={isOpen}
      onClose={handleClose}
      className="fixed !top-28 z-50 mx-auto max-w-3xl 2xl:max-w-5xl"
    >
      <>
        <button
          className="transiiton-all absolute top-5 right-5 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-500/75 duration-150 hover:bg-[#e6e6e6]"
          onClick={handleClose}
        >
          <XIcon className="h-8 w-8 text-gray-900" />
        </button>
        <div className="relative pt-[56.25%]">
          <button className="transiiton-all absolute bottom-5 right-5 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-500/75 duration-150 hover:bg-[#e6e6e6]">
            {muted ? (
              <VolumeOffIcon
                className="h-7 w-7 text-gray-900"
                onClick={() => setMuted(false)}
              />
            ) : (
              <VolumeUpIcon
                className="h-7 w-7 text-gray-900"
                onClick={() => setMuted(true)}
              />
            )}
          </button>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
            playing
            muted={muted}
          />
        </div>
      </>
    </MuiModal>,
    document.getElementById('__modal')!
  )
}

export default TrailerModal
