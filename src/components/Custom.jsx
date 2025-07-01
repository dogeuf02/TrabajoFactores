import { useEffect, useState, useRef } from 'react'
import style from "../style/Custom.module.css";
import Stamp_move from '/src/components/Stamp_move.jsx'
import { useNavigate } from "react-router-dom";
import NavBar from "/src/components/NavBar.tsx";
import { cartUtils } from '../utils/carUtils';
import { useLocation } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import { CheckCircle, Plus, Minus, Eye, Loader2, ShoppingCart, ShoppingBag } from 'lucide-react';

const COLORS = [
  { name: 'white', label: 'White' },
  { name: 'black', label: 'Black' },
  { name: 'babyblue', label: 'Light Blue' },
  { name: 'babypink', label: 'Pink' },
  { name: 'oilblue', label: 'Blue' },
  { name: 'babygreen', label: 'Green' },
  { name: 'red', label: 'Red' },
]

const FABRICS = ['Lana', 'Poliester']
const SIZES = ['XS', 'S', 'M', 'L', 'XL']

function Custom() {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState('white')
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedFabric, setSelectedFabric] = useState('Lana')
  const [selectedModel, setSelectedModel] = useState('R')
  const [shirtPrice, setShirtPrice] = useState(40000);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showLimits, setShowLimits] = useState(false);

  const location = useLocation();
  const stamp = location.state;
  const stampPrice = stamp.precio;
  const cart = cartUtils.getCart();

  const stockRestanteCal = () => {
    var num = stamp.stock;
    cart.forEach(item => {
      if (item.stamp.id === stamp.id) {
          num = num - item.quantity;
      }
  });
    return num;
  };

  const stockRestante = stockRestanteCal();

  const previewRef = useRef();

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    const dataUrl = await htmlToImage.toPng(previewRef.current, { useCORS: true });
    const newItem = {
      selectedColor,
      selectedModel,
      selectedFabric,
      selectedSize,
      stamp,
      shirtPrice: shirtPrice,
      stampPrice: stampPrice,
      position,
      quantity,
      previewImage: dataUrl,
      name: `Camiseta personalizada - ${stamp.nombreEstampa}`,
      total: shirtPrice + stampPrice
    };

    cartUtils.addToCart(newItem);
    setShowModal(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleChangeStamp = () => {
    navigate('/catalogo');
  };

  const handleNavigate = (path) => {
    setShowModal(false);
    navigate(path);
  };

  useEffect(() => {
    if (selectedFabric === 'Poliester') {
      setShirtPrice(30000);
    } else {
      setShirtPrice(40000);
    }
  }, [selectedFabric]);

  return (
    <div className={style.container}>
      <div className={style.mainContent}>
        {/* Left Column - T-shirt Preview */}
        <div className={style.previewPanel}>
          <div ref={previewRef}>
            <Stamp_move
              key={showLimits}
              position={position}
              selectedModel={selectedModel}
              selectedColor={selectedColor}
              selectedImage={stamp.imagen}
              showLimits={showLimits}
            />
          </div>
          <button
            className={`${style.viewLimitsBtn} ${showLimits ? style.active : ''}`}
            onClick={() => setShowLimits(!showLimits)}
          >
            <Eye size={20} />
            {showLimits ? 'Ocultar límites' : 'Ver límites'}
          </button>
        </div>

        {/* Right Column - Customization Options */}
        <div className={style.customizationPanel}>
          {/* Stamp Info and Actions */}
          <div className={style.stampSection}>
            <div className={style.stampInfo}>
              <div className={style.stampPreview}>
                <img
                  src={stamp.imagen}
                  alt="404 Stamp"
                />
              </div>
              <div className={style.stampDetails}>
                <h1>{stamp.nombreEstampa}</h1>
                <p>Artista: {stamp.nombreArtista}</p>
                <p className={style.price}>${stampPrice}</p>
              </div>
            </div>

            <div className={style.stampActions}>
              <div className={style.quantityControl}>
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className={style.quantityBtn}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className={style.quantityDisplay}>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className={style.quantityBtn}
                  disabled={quantity == stockRestante | stockRestante == 0}
                >
                  <Plus size={16} />
                </button>
              </div>
              <button className={`${style.btn} ${style.btnChange}`} onClick={handleChangeStamp}>
                CAMBIAR ESTAMPA
              </button>
              <button
                className={`${style.btn} ${showLimits | stockRestante == 0 ? style.btnCartDisabled : style.btnCart}`}
                onClick={handleAddToCart}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className={style.loadingIcon} size={24} />
                    AGREGANDO...
                  </>
                ) : (
                  <>
                    AÑADIR AL CARRITO
                    <svg className={style.cartIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className={style.optionsSection}>
            <div className={style.optionGroup}>
              <h3>Modelo:</h3>
              <div className={style.modelButtons}>
                <button
                  onClick={() => setSelectedModel('R')}
                  className={`${style.modelButton} ${selectedModel === 'R' ? style.selected : ''}`}
                >
                  <img src="src/assets/R/R-neck-white.png" alt="Crew Neck" />
                </button>
                <button
                  onClick={() => setSelectedModel('V')}
                  className={`${style.modelButton} ${selectedModel === 'V' ? style.selected : ''}`}
                >
                  <img src="src/assets/V/V-neck-white.png" title="v-neck" />
                </button>
              </div>
            </div>

            <div className={style.optionGroup}>
              <h3>Color:</h3>
              <div className={style.colorButtons}>
                {COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`${style.colorButton} ${style[color.name]} ${selectedColor === color.name ? style.selected : ''}`}
                    title={color.label}
                  />
                ))}
              </div>
            </div>

            <div className={style.optionGroup}>
              <h3>Tela:</h3>
              <div className={style.fabricButtons}>
                {FABRICS.map((fabric) => (
                  <button
                    key={fabric}
                    onClick={() => setSelectedFabric(fabric)}
                    className={`${style.fabricButton} ${selectedFabric === fabric ? style.selected : ''}`}
                  >
                    {fabric}
                  </button>
                ))}
              </div>
            </div>

            <div className={style.optionGroup}>
              <h3>Talla:</h3>
              <div className={style.sizeButtons}>
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`${style.sizeButton} ${selectedSize === size ? style.selected : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className={style.total}>
              <span>Total:</span>
              <span>${(shirtPrice + stampPrice) * quantity}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className={style.modalOverlay}>
          <div className={style.modal}>
            <div className={style.modalIcon}>
              <CheckCircle size={48} className={style.successIcon} />
            </div>
            <h2>¡Producto añadido al carrito!</h2>
            <p>¿Qué te gustaría hacer ahora?</p>
            <div className={style.modalActions}>
              <button
                className={style.modalButton}
                onClick={() => handleNavigate('/cart')}
              >
                <ShoppingCart size={20} />
                Ir al Carrito
              </button>
              <button
                className={`${style.modalButton} ${style.secondary}`}
                onClick={() => handleNavigate('/catalogo')}
              >
                <ShoppingBag size={20} />
                Seguir Comprando
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Custom;