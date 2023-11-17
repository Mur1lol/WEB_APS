import Example from '@/components/example'
import { Html, Head, Main, NextScript } from 'next/document'
import { ImageProps } from 'next/image';
import penteado from 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFpcmRyZXNzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'

export default function Document() {
  return (
    <Html lang="pt-br">
      <Example />
      <Head>
        <meta charSet='UTF-8' />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Beauty Salon</title>
        <link rel="stylesheet" href="assets/fonts/style.css" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/swiper/swiper-bundle.min.css" 
        />
        <link rel="stylesheet" href="style.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Poppins:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      </Head>
      <body>
      <NextScript />
      <nav className="container">
        <a className="logo" href="#">beauty<span>salon</span>.</a>
        <div className="menu">
          <ul>
            <li><a className="title" href="#home">Início</a></li>
            <li><a className="title" href="#about">Sobre</a></li>
            <li><a className="title" href="#services">Serviços</a></li>
            <li><a className="title" href="#testimonials">Depoimentos</a></li>
            <li><a className="title" href="#contact">Contato</a></li>
            <li><a className="title" href="#login" id="loginBtn">Login</a></li>
          </ul>
        </div>
        <div className="toggle icon-menu"></div>
        <div className="toggle icon-close"></div>
      </nav>
      <Main>
      <penteado/>
      </Main>
      </body>
    </Html>
  )
}

interface Props {
  tab?: string,
  image?: JSX.Element,
}
    
const DisplayBox =(props: Props): JSX.Element => {
  return (
    <div className="grid-container">
      <div className="box">
       {props.image}
      </div>
    </div>
  );
}

      
const penteado=(): JSX.Element=>{
  return (
      <DisplayBox  image={<img alt="" src="https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFpcmRyZXNzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"/>}/>
  );
}