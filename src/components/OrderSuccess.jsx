import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import style from "../style/OrderSuccess.module.css";

function OrderSuccess() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const lastOrder = JSON.parse(localStorage.getItem('lastOrder'));
    setOrder(lastOrder);
  }, []);

  if (!order) return null;

  const endShoping = async () => {
    navigate("/catalogo");
  }

  return (
    <div className={style.orderSuccessPage}>
      <div className={style.successContainer}>
        <CheckCircle className={style.successIcon} size={64} color="#4CAF50" />
        <h1>¡Gracias por tu compra!</h1>
        <p className={style.orderId}>Número de orden: {order.orderId}</p>
  
        <div className={style.orderDetails}>
          <h2>Resumen de la Compra</h2>
          <div className={style.customerInfo}>
            <h3>Información de Envío</h3>
            <p>Nombre: {order.customerInfo.name}</p>
            <p>Correo: {order.customerInfo.email}</p>
            <p>Direccion: {order.customerInfo.address}</p>
          </div>
  
          <div className={style.itemsSummary}>
            <h3>Productos</h3>
            {order.items.map((item, index) => (
              <div key={index} className={style.summaryItem}>
                <img src={item.previewImage} alt={item.name} className={style.itemThumbnail} />
                <div className={style.itemInfo}>
                  <h4>{item.name}</h4>
                  <p>Talla: {item.selectedSize || 'M'}</p>
                  <p>Tela: {item.selectedFabric || 'Lana'}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <p className={style.itemPrice}>${((item.shirtPrice+item.stampPrice) * item.quantity).toFixed(0)}</p>
                </div>
              </div>
            ))}
          </div>
  
          <div className={style.totalAmount}>
            <span>Total:</span>
            <span>${order.total.toFixed(0)}</span>
          </div>
        </div>
  
        <div className={style.successActions}>
          <Link to="/catalogo">
            <button className={style.continueShopping} onClick={endShoping}>
              Seguir Comprando
            </button>
          </Link>
        </div>
      </div>
    </div>
);

  
  
}

export default OrderSuccess;