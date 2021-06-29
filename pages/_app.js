import 'tailwindcss/tailwind.css'
import { AuthProvider } from '../libs/auth'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
