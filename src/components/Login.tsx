import style from "../style/loginStyle.module.css";
import user from "../assets/LoginSignup/User.png";
import robot from "../assets/LoginSignup/Robot.png";
import muestra from "../assets/LoginSignup/404Muestra.jpg";
import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [tipoCliente, setTipoCliente] = useState('');
  // Función para manejar el evento de login
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevoValor = event.target.value;
    setTipoCliente(nuevoValor);
    console.log(nuevoValor);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    let direccion: string = "http://localhost:8080/default-login";
    if (tipoCliente == "cliente") {
      direccion = "http://localhost:8080/clientes/login";
    }
    if (tipoCliente == "artista") {
      direccion = "http://localhost:8080/artista/login";
    }

    try {
      // Enviamos la solicitud GET al backend
      if (direccion == "http://localhost:8080/default-login") {
        alert('login fallido, seleccione tipo de login')
        return false
      }
      const response = await axios.get<number>(


        direccion,
        {
          params: {
            usuario: usuario,
            contrasena: contrasena,
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem('idCliente', response.data.toString());
        console.log(localStorage.getItem('idCliente'));
        if (tipoCliente == "cliente") {
          navigate("/");
        }
        if (tipoCliente == "artista") {
          navigate("/artista");
        }

      }

    } catch (error) {
      if (axios.isAxiosError(error)) { // ← Verifica si es un error de Axios
        if (error.response?.status === 401) {
          alert("Credenciales incorrectas");
        }
      }
    }


  };

  return (
    <div>
      <section className={style.contenido}>
        <div className={`${style.sesion} ${style.downFade}`}>
          <img className={style.robot} src={robot} alt="Robot" />
          <form action="" method="" onSubmit={handleLogin}>
            <fieldset className={style.formulario}>
              <legend className={`${style.leyenda} ${style.boxFade} ${style.first}`}>
                <img
                  style={{ width: "40px" }}
                  className={style.leyenda}
                  src={user}
                  alt="User"
                />
              </legend>
              <label htmlFor="tipoCliente" className={style.etiquetaOculta}>
                Tipo de usuario
              </label>
              <select
                id="tipoCliente"
                className={`${style.sujeto} ${style.boxFade} ${style.first}`}
                name="TipoCliente"
                onChange={handleChange}
                required
              >
                <option value="">¿Qué eres?</option>
                <option value="cliente">Cliente</option>
                <option value="artista">Artista</option>
                <option value="administrador">Administrador</option>
              </select>
              <label
                className={`${style.sub} ${style.inicial} ${style.boxFade} ${style.first}`}
                htmlFor="usuario"
              >
                Usuario
                <input
                  className={`${style.boxFade} ${style.second} ${style.usuario}`}
                  type="text"
                  name=""
                  placeholder="Introduzca su usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                />
              </label>
              <label
                className={`${style.sub} ${style.boxFade} ${style.third}`}
                htmlFor="contra"
              >
                Contraseña
                <input
                  type="password"
                  className={`${style.boxFade} ${style.third} ${style.contra}`}
                  name=""
                  placeholder="Introduzca su contraseña"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  required
                />
              </label>
              <button
                className={`${style.inicioSesion} ${style.boxFade} ${style.fourth}`}
                type="submit"
              >
                Iniciar sesión
              </button>
              <h3 className={`${style.registro} ${style.boxFade} ${style.fourth}`}>
                ¿No te has registrado? <Link to="/signUp" className={style.a}>Regístrate</Link>
              </h3>
            </fieldset>
          </form>
        </div>
        <div className={style.modelo}>
          <img className={`${style.muestra} ${style.boxFade} ${style.fifth}`} src={muestra} alt="Muestra" />
        </div>
      </section>
    </div>
  );
};

export default Login;
