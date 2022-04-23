import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Row from '../components/Row'
import requests from '../lib/requests'
import axios from '../axios'
import { Movie } from '../lib/types'
import TrailerModal from '../components/TrailerModal'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atoms/atoms'

interface HomeProps {
  netflixOriginals: Movie[]
  trending: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  sciFiMovies: Movie[]
  documentaries: Movie[]
}

const Home: NextPage<HomeProps> = ({
  netflixOriginals,
  trending,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  sciFiMovies,
  documentaries,
}) => {
  const isOpen = useRecoilValue(modalState)

  return (
    <div>
      <Head>
        <title>Netflix Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isOpen && <TrailerModal />}
      <Header />

      <main>
        <Banner netflixOriginals={netflixOriginals} />
        <section className="mt-4 space-y-6">
          <Row title="Trending Now" movies={trending} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Movies" movies={actionMovies} />
          <Row title="Comedy Movies" movies={comedyMovies} />
          <Row title="Horror Movies" movies={horrorMovies} />
          <Row title="Sci-Fi Movies" movies={sciFiMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const [
    netflixOriginals,
    trending,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    sciFiMovies,
    documentaries,
  ] = await Promise.all(
    Object.values(requests).map(async (req) => await axios.get(req))
  )

  return {
    props: {
      netflixOriginals: netflixOriginals.data.results,
      trending: trending.data.results,
      topRated: topRated.data.results,
      actionMovies: actionMovies.data.results,
      comedyMovies: comedyMovies.data.results,
      horrorMovies: horrorMovies.data.results,
      sciFiMovies: sciFiMovies.data.results,
      documentaries: documentaries.data.results,
    },
  }
}

export default Home
