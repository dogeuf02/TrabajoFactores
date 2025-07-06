import style from "../style/Footer.module.css";
import sic from "../assets/Footer/SIC.svg"

export default function Footer() {
  return (
    <section>
      <div className={style.linea}></div>
      <div style={{ height: "173px", width: "100%" }}></div>
      <footer className={style.footer}>
        <div className="redes">
          <h3 className={style.titulo}>Síguenos en: </h3>
          <a href="https://facebook.com">
            <span className="sr-only">Facebook</span>
            <i className="bi bi-facebook" />
          </a>
          <a href="https://instagram.com">
            <span className="sr-only">Instagram</span>
            <i className="bi bi-instagram" />
          </a>
          <a href="https://tiktok.com">
            <span className="sr-only">TikTok</span>
            <i className="bi bi-tiktok" />
          </a>
        </div>
        <div className={style.acercaDe}>
          <h3 className={style.titulo}>Acerca de 404 NOT FOUND</h3>
          <ul>
            <li><a href="/aviso-privacidad">Aviso de Privacidad</a></li>
            <li><a href="/terminos-condiciones">Términos y condiciones</a></li>
            <li><a href="/formas-pago">Formas de pago</a></li>
            <li><a href="/catalogo">Nuestro Catálogo</a></li>
          </ul>
        </div>
        <div className={style.superintendencia}>
          <h3 className={style.titulo}>
            Superintendencia de industria y comercio
          </h3>
          <img
            src={sic}
            alt="Logo de la Superintendencia de Industria y Comercio de Colombia"
            className={style.sic}
          />
        </div>
        <div className={style.info}>
          <h3 className={style.titulo}>Información adicional</h3>
          <ul>
            <li><a href="/registro">Registro</a></li>
            <li><a href="/contacto">Contáctanos</a></li>
            <li><a href="/politica-datos">Política de Protección de Datos</a></li>
            <li><a href="/soporte">Soporte</a></li>
          </ul>
        </div>
      </footer>
    </section>
  );
}
