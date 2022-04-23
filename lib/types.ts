export interface Movie {
  backdrop_path: string
  first_air_date: Date
  genre_ids: number[]
  id: number
  name: string
  title: string
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number
}

export interface Element {
  type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette'
}
