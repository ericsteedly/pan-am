import Head from 'next/head'
import { AppWrapper } from '../context/state'
import classes from "./layout.module.css"

export default function Layout({ children }) {
  return (
    <AppWrapper>
      <>
        <Head>
          <title>Pan-Am Airlines</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <main className={`${classes.main}`}>{children}</main>
      </>
    </AppWrapper>
  )
}