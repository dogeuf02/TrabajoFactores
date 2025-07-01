"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Frown } from "lucide-react"
import style from "../style/OrderFailure.module.css"

function OrderFailure() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")
  const [errorDetails, setErrorDetails] = useState("")

  useEffect(() => {
    const error = localStorage.getItem("error")
    if (error.includes("Stock insuficiente")) {
      setErrorMessage("Stock insuficiente")
      setErrorDetails(
        "Lo sentimos, en este momento la cantidad de estampas solicitada no está disponible. Por favor, intente con una cantidad menor o elija otro diseño.",
      )
    } else if (error.includes("Algo ")) {
      setErrorMessage("Fondos insuficientes")
      setErrorDetails(
        "Lo sentimos, parece que no hay suficientes fondos para completar esta transacción. Por favor, verifique su método de pago e intente nuevamente.",
      )
    }
  }, [])

  const tryAgain = () => {
    navigate("/cart")
  }

  return (
    <div className={style.orderFailurePage}>
      <div className={style.failureContainer}>
        <Frown className={style.failureIcon} size={64} color="#FF6B6B" />
        <h1>Lo sentimos, ha ocurrido un error</h1>
        <p className={style.errorMessage}>{errorMessage}</p>

        <div className={style.errorDetails}>
          <h2>Detalles del Error</h2>
          <p>{errorDetails}</p>
        </div>

        <div className={style.failureActions}>
          <button className={style.tryAgain} onClick={tryAgain}>
            Intentar de nuevo
          </button>
          <Link to="/catalogo">
            <button className={style.backToCatalog}>Volver al Catálogo</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderFailure

