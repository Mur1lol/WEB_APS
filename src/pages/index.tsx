import Image from 'next/image'
import Head from 'next/head';
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="">

        <div className="container mx-auto p-8">
          <h1 className="text-4xl font-bold text-green-800 mb-8">Bem-vindo à nossa página inicial</h1>

          {/* Conteúdo adicional da página inicial */}
        </div>
      </div>
    </>
  );
}
