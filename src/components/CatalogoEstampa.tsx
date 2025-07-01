import { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import { Heart, ShirtIcon } from "lucide-react";
import style from "../style/CatalogoEstampampa.module.css";
import axios from "axios";
type Props = {};

interface Tema {
  id: number;
  nombre: string;
}

interface Camisa {
  id: number;
  imagen: string;
  nombreEstampa: string;
  precio: string;
  idTema: string;
  nombreArtista: string;

}

const temas: Tema[] = [
  { id: 1, nombre: "Todos" },
  { id: 1, nombre: "Disney" },
  { id: 2, nombre: "Halloween" },
  { id: 3, nombre: "Navidad" },
];
/*
const camisas: Camisa[] = [
  {
    id: 1,
    imagen:
      "https://raw.githubusercontent.com/LDanic/404-not-found-assets/refs/heads/main/404NotFound.png",
    nombre: "400 NOT FOUND",
    precio: "10000",
    idTema: "Halloween",
    artista: "Artista 1",
  },
  {
    id: 2,
    imagen:
      "https://raw.githubusercontent.com/LDanic/404-not-found-assets/refs/heads/main/wall-eandEve.png",
    nombre: "Walle & Eva",
    precio: "12000",
    idTema: "Disney",
    artista: "Artista 2",
  },
  {
    id: 3,
    imagen:
      "https://raw.githubusercontent.com/LDanic/404-not-found-assets/7d1aa6c10820ae9bf3adfd9e4c55e3e789e412ca/furia.png",
    nombre: "Furia",
    precio: "12000",
    idTema: "Disney",
    artista: "Artista 3",
  },
  {
    id: 4,
    imagen:
      "https://raw.githubusercontent.com/LDanic/404-not-found-assets/refs/heads/main/404NotFound.png",
    nombre: "400 NOT FOUND",
    precio: "10000",
    idTema: "Halloween",
    artista: "Artista 4",
  },
  {
    id: 5,
    imagen:
      "https://raw.githubusercontent.com/LDanic/404-not-found-assets/refs/heads/main/wall-eandEve.png",
    nombre: "Walle & Eva",
    precio: "12000",
    idTema: "Navidad",
    artista: "Artista 5",
  },
  {
    id: 6,
    imagen:
      "https://raw.githubusercontent.com/LDanic/404-not-found-assets/7d1aa6c10820ae9bf3adfd9e4c55e3e789e412ca/furia.png",
    nombre: "Intensamiente furia",
    precio: "12000",
    idTema: "Navidad",
    artista: "Artista 6",
  },
];
*/
const colores = [
  "white",
  "black",
  "#bfdbfe",
  "#fbb6ce",
  "#004566",
  "#bbf7d0",
  "#ef4444",
];

function CatalogoEstampa({}: Props) {
  const [camisas, setCatalogo] = useState<Camisa[]>([]);
  const [temas, setTemas] = useState<{ id: number; nombre: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCatalogo = async () => {
        try {
            const response = await axios.get<Camisa[]>('http://localhost:8080/catalogo');
            setCatalogo(response.data);
        } catch (err) {
            setError('Error al cargar el catálogo');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    fetchCatalogo();
}, []);

  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((data) => setTemas(data));
  }, []);

  const [filtroTema, setFiltroTema] = useState("999");
  const [filtroPrecio, setFiltroPrecio] = useState(15000);
  const [colorFondo, setColorFondo] = useState("white");

  const camisasFiltradas = camisas.filter(
    (camisa) =>
      (filtroTema == "999" || camisa.idTema == filtroTema) &&
      Number.parseInt(camisa.precio) <= filtroPrecio
  );

  return (
    <div className={style.container}>
      <div className={style.filtroContainer}>
        <select
          value={filtroTema}
          onChange={(e) => setFiltroTema(e.target.value)}
          className={style.selectTrigger}
        >
          <option value="999">Selecciona un tema</option>
          {temas.map((tema) => (
            <option key={tema.id} value={tema.id}>
              {tema.nombre}
            </option>
          ))}
        </select>
        <div className={style.rango}>
          <span>Precio máximo: ${filtroPrecio}</span>
          <input
            type="range"
            min="10000"
            max="20000"
            value={filtroPrecio}
            onChange={(e) => setFiltroPrecio(Number(e.target.value))}
            className={style.range}
          />
        </div>

        <div className={style.colores}>
          {colores.map((color) => (
            <button
              key={color}
              style={{ backgroundColor: color }}
              onClick={() => setColorFondo(color)}
              className={`${style.colorButton} ${
                colorFondo === color ? style.colorActivo : ""
              }`}
            />
          ))}
        </div>
      </div>
      <div className={style.linea}></div>
      <div className={style.catalogoContainer}>
        {camisasFiltradas.map((camisa) => (
          <div className={style.carta} key={camisa.id}>
            <div
              className={style.contimagen}
              style={{ backgroundColor: colorFondo }}
            >
              <img
                src={camisa.imagen || "/placeholder.svg"}
                alt={camisa.nombreEstampa}
                className={style.imagen}
              />
              <div className={style.contBtn}>
                <Link to="/custom" state={camisa}>
                  <button className={style.btnCamisa}>Configurar camisa</button>
                </Link>
              </div>
            </div>
            <h2 className={style.nombre}>{camisa.nombreEstampa}</h2>
            <p className={style.precio}>${camisa.precio}</p>
            <p className={style.artista}>{camisa.nombreArtista}</p>
            <button className={style.favoriteButton}>
              <i className={`${style.corazon} ${["bi bi-heart"]}`}></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatalogoEstampa;
