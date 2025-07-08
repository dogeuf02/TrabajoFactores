import style from "../style/PagPrincipal.module.css";
import Slider1 from "../assets/Slider/slider1.png";
import Slider2 from "../assets/Slider/slider2.png";
import Img1 from "../assets/modeloCamisa1.jpg";
import Img2 from "../assets/modeloCamisa2.jpg";
import Img3 from "../assets/modeloCamisa3.jpg";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function PagPrincipal() {
  const contCard = [
    {
      text: "Disney",
      img: "https://static.kiabi.es/images/camiseta-disney-blanco-zf032_2_hd1.jpg?width=800",
    },
    {
      text: "Navidad",
      img: "https://www.kiabi.es/images/camiseta-de-navidad-rojo-zh518_5_hd1.jpg",
    },
    {
      text: "Halloween",
      img: "https://http2.mlstatic.com/D_NQ_NP_638717-MCO71804642477_092023-O.webp",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return (
    <div className={style.homePage}>

       <h1 className={style.tituloPagina}>Bienvenido a 404 Not Found - Tienda de Estampas</h1>
      <Slider {...sliderSettings} className={style.slider}>
        <div className={style.imgCarrusel}>
          <img src={Slider1} alt="Promoción de camisetas personalizadas" />
        </div>
        <div className={style.imgCarrusel}>
          <img src={Slider2} alt="Nueva colección de artistas" />
        </div>
      </Slider>

      <div className={style.contCards}>
        {contCard.map((cont) => (
          <div className={style.carta}>
            <img src={cont.img} alt={`Camiseta temática de ${cont.text}`} />
            <div className={style.infoCard}>
              <Link to="/catalogo" className={style.btnCard}>
                {cont.text}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className={style.imagenes}>
        <div className={style.imgpag}>
          <h4>CUMPLE TUS METAS</h4>
          <img src={Img1} alt="Modelo usando camiseta con diseño motivaciona" />
        </div>
        <div className={style.imgpag}>
          <h4>COMPRA</h4>
          <img src={Img2} alt="Imagen promocional de compra de camisetas" />
        </div>
        <div className={style.imgpag}>
          <h4>ESTRENA</h4>
          <img src={Img3} alt="Persona estrenando camiseta nueva" />
        </div>
      </div>
    </div>
  );
}

export default PagPrincipal;
