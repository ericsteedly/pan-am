import CssBaseline from '@mui/material/CssBaseline';

export default function PanAm({ Component, pageProps}) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => page)

    return getLayout(
      <>
        <CssBaseline>
          <Component {...pageProps} />
        </CssBaseline>
      </>
  )
}
