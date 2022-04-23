import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ProgressBar from '@badrap/bar-of-progress'
import Router from 'next/router'
import AuthProvider from '../hooks/useAuth'
import { RecoilRoot } from 'recoil'

const progressBar = new ProgressBar({
  size: 4,
  color: '#e50914',
  className: 'z-50',
  delay: 100,
})

Router.events.on('routeChangeStart', progressBar.start)
Router.events.on('routeChangeComplete', progressBar.finish)
Router.events.on('routeChangeError', progressBar.finish)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  )
}

export default MyApp
