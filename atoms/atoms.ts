import { atom } from 'recoil'
import { Movie } from '../lib/types'

const movieState = atom<Movie | null>({
  key: ' movie',
  default: null,
})

const modalState = atom<boolean>({
  key: 'modal',
  default: false,
})

export { movieState, modalState }
