import Head from 'next/head'
import { AppWrapper } from '../context/state'

export default function Layout({ children }) {
  return (
    <AppWrapper>
      <>
        <Head>
          <title>Fan Am Airways</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <main >{children}</main>
      </>
    </AppWrapper>
  )
}
