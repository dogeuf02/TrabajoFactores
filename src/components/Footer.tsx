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
          <i className="bi bi-facebook"></i>
          <i className="bi bi-instagram"></i>
          <i className="bi bi-tiktok"></i>
        </div>
        <div className={style.acercaDe}>
          <h3 className={style.titulo}>Acerca de 404 NOT FOUND</h3>
          <ul>Aviso de Privacidad</ul>
          <ul>Términos y condiciones</ul>
          <ul>Formas de pago</ul>
          <ul>Nuestro Catalogo</ul>
        </div>
        <div className={style.superintendencia}>
          <h3 className={style.titulo}>
            Superintendencia de industria y comercio
          </h3>
          <img src={sic} alt="sic" className={style.sic}/>
        </div>
        <div className={style.info}>
          <h3 className={style.titulo}>Información adicional</h3>
          <ul>Registro</ul>
          <ul>Contáctanos</ul>
          <ul>Política de Protección de Datos</ul>
          <ul>Soporte</ul>
        </div>
      </footer>
    </section>
  );
}
