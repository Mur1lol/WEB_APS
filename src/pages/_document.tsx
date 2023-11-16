import Example from '@/components/example'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-br">
      <Example />
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
