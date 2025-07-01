import { useState } from "react";
import DireccionEnvio from "./DireccionEnvio";
import MedioPago from "./MedioPago";
import styles from "../style/MiCuenta.module.css";
import "../style/MiCuenta.module.css";
import user from "../assets/ProfileArtist.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Usuario {
  nombre: string;
  numeroId: string;
  apellido: string;
  tipoId: string;
}

interface Direccion {
  codigo_postal: number;
  nombre_direccion: string;
  direccion: string;
  detalles_direccion: string;
}

interface Tarjeta {
  id: number;
  numeroTarjeta: string;
  tipoTarjeta: string;
  fechaVencimiento: string;
}

const usuarioInicial: Usuario = {
  nombre: "Juan",
  apellido: "Pérez",
  numeroId: "1234567890",
  tipoId: "cc",
};

const direccionInicial: Direccion = {
  codigo_postal: 110111,
  nombre_direccion: "Casa",
  direccion: "Calle 123 #45-67",
  detalles_direccion: "Apartamento 301",
};
const tarjetaInicial: Tarjeta = {
  id: 1,
  numeroTarjeta: "**** **** **** 1234",
  tipoTarjeta: "Visa",
  fechaVencimiento: "12/25",
};

export default function MiCuenta() {
  const navigate = useNavigate();

  const [direccion, setDireccion] = useState<Direccion>(direccionInicial);
  const [tarjeta, setTarjeta] = useState<Tarjeta>(tarjetaInicial);
  const [activeTab, setActiveTab] = useState<"direcciones" | "pagos">(
    "direcciones"
  );
  const [usuario, setUsuario] = useState<Usuario>(usuarioInicial);

  useEffect(() => {
    fetch("http://localhost:8080/clientes/infoCliente")
      .then((res) => res.json())
      .then((data) => setUsuario(data))
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/clientes/direcciones")
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          navigate("/sign2"); // Redirige si no hay datos
        } else {
          setDireccion(data);
        }
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8080/clientes/mediosPago")
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          navigate("/sign2"); // Redirige si no hay datos
        } else {
          console.log(data); // Imprime la respuesta en la consola
          setTarjeta(data);
        }
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.userCard}>
        <img src={user} alt="usuario" className={styles.user} />
        <div className={styles.datos}>
          <h3>{usuario.nombre + " " + usuario.apellido}</h3>
          <p>
            {usuario.tipoId}: {usuario.numeroId}
          </p>
        </div>
      </div>

      <div className={styles.tabs}>
        <div className={styles.tabList}>
          <button
            className={`${styles.tabButton} ${
              activeTab === "direcciones" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("direcciones")}
          >
            Direcciones de Envío
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === "pagos" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("pagos")}
          >
            Medios de Pago
          </button>
        </div>
        <div className={styles.tabContent}>
          {activeTab === "direcciones" && (
            <DireccionEnvio direccion={direccion} />
          )}
          {activeTab === "pagos" && <MedioPago tarjeta={tarjeta} />}
        </div>
      </div>
    </div>
  );
}
