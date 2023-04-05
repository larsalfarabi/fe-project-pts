import '@/styles/globals.css'
import CustomChakra from '@/config/CustomChakra'


export default function App({ Component, pageProps }) {
  return (
    <CustomChakra>
      <Component {...pageProps} />
    </CustomChakra>
  )
}
