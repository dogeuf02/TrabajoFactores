import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartUtils } from '../utils/carUtils';
import DireccionEnvio from "./DireccionEnvio";
import MedioPago from "./MedioPago";
import styles from "../style/MiCuenta.module.css";

import style from "../style/Checkout.module.css";




function Checkout() {
  const Direccion = {
    codigo_postal: 1,
    nombre_direccion: "calle 1",
    direccion: "asdada",
    detalles_direccion: "string"
  };

  const Tarjeta = {
    id: 12,
    numeroTarjeta: "123456789",
    tipoTarjeta: "Visa",
    fechaVencimiento: "12-05-25"
  };

  const Usuario = {
    nombre: "pedrito",
    numeroId: 147852,
    apellido: "Perecita",
    tipoId: "ti",
    correo: "juanio@c.com"
  }


  const navigate = useNavigate();
  const [tarjetas, setTarjetas] = useState([])
  const cart = cartUtils.getCart();
  const total = cart.reduce((sum, item) => sum + ((item.shirtPrice + item.stampPrice) * item.quantity), 0);
  const [direccion, setDireccion] = useState(Direccion)
  const [usuario, setUsuario] = useState(Usuario);
  const [pago, setPago] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/clientes/direcciones")
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se encontró dirección");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Dirección recibida:", data);
        setDireccion(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/clientes/mediosPago")
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se encontró dirección");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Dirección recibida:", data);
        setTarjetas(data);
        console.log(data)
        const primerPagoId = data[0].id; // Acceder al ID del primer elemento
        setPago(primerPagoId);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/clientes/infoCliente")
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se encontró cliente");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Dirección recibida:", data);
        setUsuario(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        setError(error.message);
      });
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = async () => {
    // Fetch the cart data (assuming it's stored in localStorage)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('pago: ', pago);
    try {
      // Send the cart data to the backend
      const dataToSend = {
        cart: cart, // Lista de productos en el carrito
        pago: pago, // ID de la tarjeta seleccionada
      };
      console.log(dataToSend)

      // Enviar la solicitud al backend
      const response = await fetch("http://localhost:8080/clientes/comprarPedido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend), // Enviar datos como JSON
      });

      // Leer la respuesta como texto
      const textResponse = await response.text();

      // Verificar si la respuesta contiene "exitosamente"
      if (textResponse.includes("exitosamente")) {
        console.log('Orden creada con éxito:', textResponse);

        const orderSummary = {
          items: cart,
          total,
          customerInfo: {
            name: usuario.nombre + " " + usuario.apellido,
            email: usuario.correo,
            address: direccion.direccion + " " + direccion.detalles_direccion
          },
          orderId: Math.random().toString(36).substr(2, 9)
        };

        localStorage.setItem('lastOrder', JSON.stringify(orderSummary));
        navigate('/order-success'); // Redirigir a la página de éxito
        localStorage.removeItem('cart');

      } else {
        localStorage.setItem('error', textResponse);
        console.log(textResponse);
        navigate('/order-failure');
      }
    } catch (error) {
      alert('Network error. Please check your connection.');
    }


  };

  return (
    <div className={style.checkoutPage}>
      <div className={style.checkoutContainer}>
        <div className={style.checkoutSummary}>
          <h2>Resumen del Pedido</h2>
          <div className={style.orderItems}>
            {cart.map((item) => (
              <div key={item.id} className={style.orderItem}>
                <img src={item.previewImage} alt={item.name} className={style.itemThumbnail} />
                <div className={style.itemDetails}>
                  <h3>{item.name}</h3>
                  <p>Talla: {item.selectedSize || 'M'}</p>
                  <p>Tela: {item.selectedFabric || 'Lana'}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <p className={style.itemPrice}>${((item.shirtPrice + item.stampPrice) * item.quantity).toFixed(0)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={style.orderTotal}>
            <span>Total:</span>
            <span>${total.toFixed(0)}</span>
          </div>
        </div>
        <div className={styles.tabs}>
          <div className={styles.card}>
            <h3>Informacion Cliente</h3>
            <p>
              <strong>Nombre:</strong> {usuario.nombre}
            </p>
            <p>
              <strong>Apellido:</strong> {usuario.apellido}
            </p>
            <p>
              <strong>Correo electronico:</strong> {usuario.correo}
            </p>
          </div>
          <DireccionEnvio
            direccion={direccion}
            oculto={true}
          />
          <MedioPago
            tarjetas={tarjetas}
            oculto={true}

          />
        </div>
        <button className={style.submitButton} onClick={handleCheckout}>
          Confirmar Pedido
        </button>
      </div>
    </div>
  );

}

export default Checkout;