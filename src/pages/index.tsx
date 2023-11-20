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
      <div>
    <header id="header" className="scroll">
      <nav className="container">
        <a className="logo" href="#">beauty<span>salon</span>.</a>
        <div className="menu">
          <ul className="grid">
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
    </header>
    <main>
      <section className="section" id="home">
        <div className="container grid">
          <div className="image">
            <img
              src="https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFpcmRyZXNzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
              alt="Mulher sorrindo penteando outra mulher"
            />
          </div>
          <div className="text">
            <h2 className="title">Saúde natural para os seus cabelos</h2>
            <p>
              Um salão exclusivo em Curitiba, especializado em tratamentos
              naturais.
            </p>
            <a className="button" href="#">Agendar um horário</a>
          </div>
        </div>
      </section>

      <div className="divider-1"></div>

      <section className="section" id="about">
        <div className="container grid">
          <div className="image">
            <img
              src="https://images.unsplash.com/photo-1559599101-f09722fb4948?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpcmRyZXNzZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
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
          <div className="cards grid">
            <div className="card" onclick="openBookingModal('Terapia Capilar')">
              <i className="icon-woman-hair"></i>
              <h3 className="title">Terapia capilar</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
                quo rem! Ratione, dolorum! Praesentium quaerat ipsam recusandae
                porro, odio sapiente laudantium nam cupiditate dolorum at vitae
                mollitia obcaecati aperiam quas!
              </p>
            </div>
            <div className="card" >
              <i className="icon-trim"></i>
              <h3 className="title">Corte</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                voluptatum, animi cumque nam id illo quos exercitationem
                similique iusto, explicabo a nemo! Blanditiis earum
                reprehenderit architecto minus cum aut magni.
              </p>
            </div>
            <div className="card" >
              <i className="icon-cosmetic"></i>
              <h3 className="title">Tratamentos</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Obcaecati saepe, quam id quisquam adipisci molestiae iste
                repudiandae deleniti numquam quibusdam, recusandae laboriosam
                maxime beatae voluptates neque laudantium hic provident alias?
              </p>
            </div>
          </div>
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
                    <img
                      src="https://randomuser.me/api/portraits/women/19.jpg"
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
                    <img
                      src="https://randomuser.me/api/portraits/women/60.jpg"
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
                    <img
                      src="https://randomuser.me/api/portraits/women/26.jpg"
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
            <a
              href="https://api.whatsapp.com/send?phone=+5563992887396&text=Olá!, gostaria de agendar um horário"
              className="button"
              target="_blank"
            >
              <i className="icon-whatsapp"></i>Entrar em contato
            </a>
          </div>
        </div>
        
        <div className="links">
            <ul className="grid">
              <li><i className="icon-phone"></i>63 992887396</li>
              <li><i className="icon-map-pin"></i>UTFPR</li>
              <li><i className="icon-mail"></i>sebastiao.araujo_2@hotmail.com</li>
            </ul>
        </div>
      </section>

      <div className="divider-1"></div>
    </main>

    <div id="bookingModal" className="modal">
      <div className="modal-content agendamento-content">
        <span className="close">&times;</span>
        <a className="logo">Escolha um profissional para 
          <span id="serviceTitle"></span>
        </a>
        <div className="professional-buttons-container">
          <div className="professional-button">
            <input type="radio" id="professional1" name="professional" value="Profissional 1"/>
            <label for="professional1">Profissional 1</label>
          </div>
          <div className="professional-button">
            <input type="radio" id="professional2" name="professional" value="Profissional 2"/>
            <label for="professional2">Profissional 2</label>
          </div>
          <div className="professional-button">
            <input type="radio" id="professional3" name="professional" value="Profissional 3"/>
            <label for="professional3">Profissional 3</label>
          </div>
        </div>
          <h2>Escolha um horário</h2>
          <select id="timeSelection" name="horario"></select>
          <button>Confirmar Agendamento</button>
      </div>
    </div>


    <footer className="section">
      <div className="container grid">
        <div className="brand">
          <a className="logo logo-alt" href="#home">beauty<span>salon</span>.</a>
          <p>©2021 BeautySalon.</p>
          <p>Todos os direitos reservados.</p>
        </div>

        <div className="social">
          <a
            href="https://www.instagram.com/sebastiaoaraujo10/"
            target="_blank"
          >
            <i className="icon-instagram"></i>
          </a>
          <a href="https://www.facebook.com/" target="_blank">
            <i className="icon-facebook"></i>
          </a>
          <a href="https://www.youtube.com/" target="_blank">
            <i className="icon-youtube"></i>
          </a>
        </div>
      </div>
    </footer>

    <a href="#home" className="back-to-top"><i className="icon-arrow-up-circle"></i></a>

    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

    <script src="https://unpkg.com/scrollreveal"></script>

    <script src="main.js"></script>
  </div>
    </>
  );
}
