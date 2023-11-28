import Image from 'next/image'
import Head from 'next/head';
import Link from 'next/link';

import photo1 from '../assets/images/photo1.png';
import photo2 from '../assets/images/photo2.png';
import photo3 from '../assets/images/photo3.jpg';
import photo4 from '../assets/images/photo4.jpg';
import photo5 from '../assets/images/photo5.jpg';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        
        <main>
          <section className="section" id="home">
            <div className="container grid">
              <div className="image">
                <Image
                  src={photo1}
                  width={500}
                  height={500}
                  alt="Mulher sorrindo penteando outra mulher"
                />
              </div>
              <div className="text">
                <h2 className="title">Saúde natural para os seus cabelos</h2>
                <p>
                  Um salão exclusivo em Curitiba, especializado em tratamentos
                  naturais.
                </p>
                <Link className="button" href="/agendar">Agendar um horário</Link>
              </div>
            </div>
          </section>

          <div className="divider-1"></div>

          <section className="section" id="about">
            <div className="container grid">
              <div className="image">
                <Image
                  src={photo2}
                  width={500}
                  height={500}
                  alt="3 mulheres sorrindo"
                />
              </div>
              <div className="text">
                <h2 className="title">Sobre nós</h2>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit nam adipisci facilis. Eos sint repellat nam possimus
                  hic nulla, voluptas dolorum eveniet consequatur, doloribus
                  laudantium, saepe eligendi earum illum? Nemo!
                </p>
                <br />
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit nam adipisci facilis. Eos sint repellat nam possimus
                  hic nulla, voluptas dolorum eveniet consequatur, doloribus
                  laudantium, saepe eligendi earum illum? Nemo!
                </p>
                <br />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit odit sequi cupiditate quis modi temporibus atque eum
                  officiis. Suscipit repellendus dolor ipsum at alias quos autem,
                  aspernatur ea a voluptatum?
                </p>
              </div>
            </div>
          </section>

          <div className="divider-2"></div>

          <section className="section" id="services">
            <div className="container grid">
              <header>
                <h2 className="title">Serviços</h2>
                <p className="subtitle">
                  Com mais de 10 anos no mercado, o <strong>Beautysalon</strong> já
                  conquistou clientes de inúmeros países com seus tratamentos
                  exclusivos e totalmente naturais
                </p>
              </header>
              </div>
          </section>

          <div className="divider-1"></div>

          <section className="section" id="testimonials">
            <div className="container">
              <header>
                <h2 className="title">Depoimentos de quem já passou por aqui</h2>
              </header>
              <div className="testimonials swiper-containerr">
                <div className="swiper-wrapper">
                  <div className="testimonial swiper-slide">
                    <blockquote>
                      <p>
                        <span>&ldquo;</span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequuntur dolore qui fugit, officia magni corrupti
                        commodi quia facilis corporis nesciunt voluptates quo autem
                        atque aliquam. Placeat hic corrupti modi quod!
                      </p>
                      <cite>
                        <Image
                          src={photo3}
                          width={500}
                          height={500}
                          alt="Foto de Wanessa Souza"
                        />
                        Wanessa Souza
                      </cite>
                    </blockquote>
                  </div>

                  <div className="testimonial swiper-slide">
                    <blockquote>
                      <p>
                        <span>&ldquo;</span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequuntur dolore qui fugit, officia magni corrupti
                        commodi quia facilis corporis nesciunt voluptates quo autem
                        atque aliquam. Placeat hic corrupti modi quod!
                      </p>
                      <cite>
                        <Image
                          src={photo4}
                          width={500}
                          height={500}
                          alt="Foto de Franciele Venega"
                        />
                        Franciele Venega
                      </cite>
                    </blockquote>
                  </div>

                  <div className="testimonial swiper-slide">
                    <blockquote>
                      <p>
                        <span>&ldquo;</span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequuntur dolore qui fugit, officia magni corrupti
                        commodi quia facilis corporis nesciunt voluptates quo autem
                        atque aliquam. Placeat hic corrupti modi quod!
                      </p>
                      <cite>
                        <Image
                          src={photo5}
                          width={500}
                          height={500}
                          alt="Foto de Valeska Fabris"
                        />
                        Valeska Fabris
                      </cite>
                    </blockquote>
                  </div>
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div>
          </section>

          <div className="divider-2"></div>

          <section className="section" id="contact">
            <div className="container grid">
              <div className="text">
                <h2 className="title">Entre em contato com a gente!</h2>
                <p>
                  Entre em contato com a Beautysalon, queremos tirar suas dúvidas,
                  ouvir suas críticas e sugestões.
                </p>
                <Link
                  href="https://api.whatsapp.com/send?phone=+5563992887396&text=Olá!, gostaria de agendar um horário"
                  className="button"
                  target="_blank"
                >
                  <i className="icon-whatsapp"></i>Entrar em contato
                </Link>
              </div>
            </div>
          </section>

          <div className="divider-1"></div>
        </main>

        <footer className="section">
          <div className="container grid">
            <div className="brand">
              <a className="logo logo-alt" href="#home">beauty<span>salon</span>.</a>
              <p>©2023 BeautySalon.</p>
              <p>Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
