import 'tailwindcss/tailwind.css'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { AuthProvider } from '../contexts/AuthContext'
import Navbar from '@/components/navbar'

import dotenv from 'dotenv';
dotenv.config();

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App;
