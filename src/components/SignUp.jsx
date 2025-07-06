import styles from "../style/SignUp.module.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "CC",
    documento: "",
    correo: "",
    usuario: "",
    contra: "",
    validacion: "",
    tipo: "cliente",
    terminos: false,
  });

  const [password, setPassword] = useState("");
  const [longitudValida, setLongitudValida] = useState(false);
  const [tieneNumero, setTieneNumero] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [requisitos, setRequisitos] = useState({
    longitudValida: false,
    tieneNumero: false,
  });

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setFormData({
      ...formData,
      contra: passwordValue,
    });
    setRequisitos({
      longitudValida: passwordValue.length >= 8,
      tieneNumero: /\d/.test(passwordValue),
    });
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const validarContraseña = (e) => {
    e.preventDefault();
    if (formData.contra !== formData.validacion) {
      setMensajeError("Las contraseñas no coinciden.");
      return false;
    }
    setMensajeError("");
    handleRegister();
  };

  const handleRegister = async () => {
    let direccion = "http://localhost:8080/default-login";
    if (formData.tipo == "cliente") {
      direccion = "http://localhost:8080/clientes/register";
    }
    if (formData.tipo == "artista") {
      direccion = "http://localhost:8080/artista/register";
    }

    try {
      if (direccion == "http://localhost:8080/default-login") {
        alert('Seleccione un tipo de registro válido');
        return false;
      }

      const response = await axios.post(direccion, formData);

      if (response.data === true) {
        alert("Registro exitoso");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setMensajeError("Error en el registro. Intente nuevamente.");
    }
  };
  return (
    <div>
      <section className={styles.contenido}>
        <div
          className={`${styles.mosaico} ${styles["box-fade"]} ${styles.seventh} ${styles.boxFade} ${styles.first}`}
        ></div>
        <div className={styles.contenidoRegistro}>
          <div
            className={`${styles.cajaRegistro} ${styles.downFade}`}
            aria-labelledby="registro"
          >
            <form onSubmit={validarContraseña}>
              <h1 id="registro" className={`${styles.RegistroC} ${styles.titulo}`}>
                Registro de usuario
              </h1>

              <label className={`${styles.sub} ${styles.inicial} ${styles.boxFade} ${styles.first}`} htmlFor="nombre">
                Nombre
                <input id="nombre" className={`${styles.nombreC} ${styles.boxFade} ${styles.first}`} type="text" placeholder="Digite su nombre" required value={formData.nombre} onChange={handleChange} />
              </label>

              <label className={`${styles.sub} ${styles.boxFade} ${styles.first}`} htmlFor="apellido">
                Apellido
                <input id="apellido" className={`${styles.apellidoC} ${styles.boxFade} ${styles.first}`} type="text" placeholder="Digite su apellido" required value={formData.apellido} onChange={handleChange} />
              </label>

              <label className={`${styles.sub} ${styles.boxFade} ${styles.second}`} htmlFor="documento">
                Documento de identidad
                <input
                  id="documento"
                  className={`${styles.documentoC} ${styles.boxFade} ${styles.second}`}
                  type="text"
                  placeholder="Digite su documento"
                  aria-describedby="documento-help"
                  required
                  value={formData.documento}
                  onChange={handleChange}
                />
                <span id="documento-help" className={styles.ayuda}>Formato: 8-12 dígitos sin puntos ni espacios</span>
              </label>
              <label className={`${styles.sub} ${styles.boxFade} ${styles.second}`} htmlFor="documento">
                Documento de identidad
                <input id="documento" className={`${styles.documentoC} ${styles.boxFade} ${styles.second}`} type="text" placeholder="Digite su documento" required value={formData.documento} onChange={handleChange} />
              </label>

              <label className={`${styles.sub} ${styles.boxFade} ${styles.third}`} htmlFor="correo">
                Correo
                <input id="correo" type="email" className={`${styles.correoC} ${styles.boxFade} ${styles.third}`} placeholder="Digite su correo" required value={formData.correo} onChange={handleChange} />
              </label>

              <label className={`${styles.sub} ${styles.boxFade} ${styles.third}`} htmlFor="usuario">
                Usuario
                <input id="usuario" className={`${styles.usuarioC} ${styles.boxFade} ${styles.third}`} type="text" placeholder="Digite su usuario" required value={formData.usuario} onChange={handleChange} />
              </label>

              <label className={`${styles.sub} ${styles.boxFade} ${styles.third}`} htmlFor="contra">
                Contraseña
                <div className={styles.passwordWrapper}>
                  <input
                    id="contra"
                    className={`${styles.contraC} ${styles.boxFade} ${styles.third}`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite su contraseña"
                    aria-describedby="requisitos-contraseña"
                    onChange={handlePasswordChange}
                    required
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? "🙈" : "👀"}
                  </button>
                </div>
              </label>

              <ul id="requisitos-contraseña"
                className={styles.requisitos}
                style={{ display: requisitos.longitudValida && requisitos.tieneNumero ? "none" : "block" }}>
                <li className={requisitos.longitudValida ? styles.cumplido : ""}>
                  {requisitos.longitudValida ? "✓" : "✗"} Mínimo 8 caracteres
                </li>
                <li className={requisitos.tieneNumero ? styles.cumplido : ""}>
                  {requisitos.tieneNumero ? "✓" : "✗"} Al menos un número
                </li>
              </ul>

              <label className={`${styles.sub} ${styles.boxFade} ${styles.fourth}`} htmlFor="validacion">
                Confirme su contraseña
                <input id="validacion" className={`${styles.validacionC} ${styles.boxFade} ${styles.fourth}`} type="password" placeholder="Digite nuevamente su contraseña" required value={formData.validacion} onChange={handleChange} />
              </label>

              <span className={styles.error} aria-live="assertive">
                {mensajeError}
              </span>              <br />

              <label className={`${styles.sub} ${styles.boxFade} ${styles.fifth}`} htmlFor="tipo">
                ¿Qué quieres ser?
                <select id="tipo" className={`${styles.tipoC} ${styles.boxFade} ${styles.fifth}`} required value={formData.tipo} onChange={handleChange}>
                  <option value="cliente">Cliente</option>
                  <option value="artista">Artista</option>
                </select>
              </label>

              <label className={`${styles.sub} ${styles.final} ${styles.boxFade} ${styles.sixth}`} htmlFor="terminos">
                <input id="terminos" className={`${styles.terminosC} ${styles.boxFade} ${styles.sixth}`} type="checkbox" required checked={formData.terminos} onChange={handleChange} />
                Acepto las condiciones del servicio
              </label>

              <button className={`${styles.registrar} ${styles.boxFade} ${styles.sixth}`} type="submit">Registrar</button>

              <h3 className={`${styles.sesion} ${styles.boxFade} ${styles.sixth}`}>
                ¿Ya tienes cuenta? <Link to="/login" className={styles.a}>Inicia sesión</Link>
              </h3>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
