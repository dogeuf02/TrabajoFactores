import { useState } from 'react';
import {useNavigate } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { cartUtils } from '../utils/carUtils';
import style from "../style/Cart.module.css";

function Cart() {
  const cart = cartUtils.getCart();
  const [cartItems, setCartItems] = useState(cart);
  const navigate = useNavigate();

  const handleRemoveItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    cartUtils.removeFromCart(index);
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedCart = [...cartItems];
    if (quantity >= 1) {
      updatedCart[index].quantity = quantity;
      setCartItems(updatedCart);
      cartUtils.updateQuantity(index, quantity);
    }
  };

  const handleSizeChange = (index, size) => {
    const updatedCart = [...cartItems];
    updatedCart[index].selectedSize = size;
    setCartItems(updatedCart);
    cartUtils.updateItem(index, updatedCart[index]);
  };

  const handleFabricChange = (index, fabric) => {
    const updatedCart = [...cartItems];
    updatedCart[index].selectedFabric = fabric;
    if (fabric === 'Poliester') {
      updatedCart[index].shirtPrice = 30000;
    } else {
      updatedCart[index].shirtPrice = 40000;
    }
    
    setCartItems(updatedCart);
    cartUtils.updateItem(index, updatedCart[index]);
  };

  const handleCheckout = () => {
    if(JSON.parse(localStorage.getItem('idCliente'))){
     navigate('/checkout');

    }else{
      navigate('/login');
    }
  };

  const handleGoBack = () => {
    navigate('/catalogo');
  };

  const total = cartItems.reduce((sum, item) => sum + ((item.shirtPrice+item.stampPrice) * item.quantity), 0);

  return (
    <div className={style.cartPage}>
      <div className={style.cartContent}>
        <div className={style.cartHeader}>
          <h1>Mi Carrito</h1>
          <span className={style.itemCount}>{cartItems.length} {cartItems.length === 1 ? 'artículo' : 'artículos'}</span>
        </div>
  
        {cartItems.length === 0 ? (
          <div className={style.emptyCart}>
            <ShoppingBag size={64} className={style.emptyCartIcon} />
            <h2>Tu carrito está vacío</h2>
            <p>¡Agrega algunos productos para comenzar!</p>
            <button className={style.continueShopping} onClick={handleGoBack}>
              Explorar Catálogo
            </button>
          </div>
        ) : (
          <div className={style.cartLayout}>
            <div className={style.cartItems}>
              {cartItems.map((item, index) => (
                <div key={item.id} className={style.cartItem}>
                  <div className={style.itemImageWrapper}>
                    <img src={item.previewImage} alt={item.name} className={style.itemImage}/>
                  </div>
                  
                  <div className={style.itemContent}>
                    <div className={style.itemHeader}>
                      <div>
                        <h3 className={style.itemName}>{item.name}</h3>
                        <p className={style.itemPrice}>${item.shirtPrice+item.stampPrice}</p>
                      </div>
                      <button 
                        className={style.removeButton}
                        onClick={() => handleRemoveItem(index)}
                        aria-label="Eliminar producto"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className={style.itemOptions}>
                      <div className={style.optionGroup}>
                        <label htmlFor={`size-${index}`}>Talla</label>
                        <select 
                          id={`size-${index}`}
                          value={item.selectedSize} 
                          onChange={(e) => handleSizeChange(index, e.target.value)}
                          className={style.select}
                        >
                          <option value="XS">XS</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                        </select>
                      </div>

                      <div className={style.optionGroup}>
                        <label htmlFor={`fabric-${index}`}>Material</label>
                        <select 
                          id={`fabric-${index}`}
                          value={item.selectedFabric} 
                          onChange={(e) => handleFabricChange(index, e.target.value)}
                          className={style.select}
                        >
                          <option value="Lana">Lana</option>
                          <option value="Poliester">Poliéster</option>
                        </select>
                      </div>

                      <div className={style.quantityGroup}>
                        <label>Cantidad</label>
                        <div className={style.quantityControls}>
                          <button 
                            onClick={() => handleQuantityChange(index, item.quantity - 1)}
                            className={style.quantityBtn}
                            aria-label="Reducir cantidad"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className={style.quantity}>{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(index, item.quantity + 1)}
                            className={style.quantityBtn}
                            aria-label="Aumentar cantidad"
                            disabled={item.quantity == item.stamp.stock}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={style.itemSubtotal}>
                      <span>Subtotal:</span>
                      <span className={style.subtotalAmount}>
                        ${((item.shirtPrice+item.stampPrice) * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={style.orderSummary}>
              <h2>Resumen del Pedido</h2>
              <div className={style.summaryDetails}>
                <div className={style.summaryRow}>
                  <span>Subtotal</span>
                  <span>${total.toFixed(0)}</span>
                </div>
                <div className={style.summaryRow}>
                  <span>Envío</span>
                  <span>Gratis</span>
                </div>
                <div className={style.summaryTotal}>
                  <span>Total</span>
                  <span>${total.toFixed(0)}</span>
                </div>
              </div>
              
              <div className={style.summaryActions}>
                <button 
                  className={style.checkoutButton} 
                  onClick={handleCheckout}
                >
                  Proceder al Pago
                </button>
                <button className={style.continueShopping} onClick={handleGoBack}>
                  Seguir Comprando
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;