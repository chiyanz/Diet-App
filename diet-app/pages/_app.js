import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    primary: {
      bg: "#E53E3E",
      fg: "white"
    }
  }
})

export default function App({ Component, pageProps }) {
  return <ChakraProvider theme={theme}><Component {...pageProps} /></ChakraProvider>
}
