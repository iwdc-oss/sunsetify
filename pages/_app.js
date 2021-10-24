import 'tailwindcss/tailwind.css'
import { store } from '@/src/app/store'
import { Provider } from 'react-redux'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Sunsetify Calc</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
