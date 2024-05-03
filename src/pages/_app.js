import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


export default function PanAm({ Component, pageProps}) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => page)

    return getLayout(
      <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline>
            <Component {...pageProps} />
          </CssBaseline>
          </LocalizationProvider>
      </>
  )
}
