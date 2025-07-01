import { useState } from "react"
import { Upload, HelpCircle, X, AlertCircle } from "lucide-react"
import styles from "../../style/UploadDesign.module.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


interface DesignData {
  name: string
  description: string
  theme: string
  price: number
  imageUrl: string
}

interface UploadDesignProps {
  onUpload: (design: DesignData) => void
}

export default function UploadDesign({ onUpload }: UploadDesignProps) {
  const navigate = useNavigate();
  const [designData, setDesignData] = useState<DesignData>({
    name: "",
    description: "",
    theme: "",
    price: 0,
    imageUrl: "",
  })
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)

  const validateGithubUrl = (url: string) => {
    return url.startsWith('https://raw.githubusercontent.com/')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === 'imageUrl' && value !== '') {
      const isValid = validateGithubUrl(value)
      if (!isValid) {
        setShowErrorModal(true)
      } else {
        setShowErrorModal(false)
      }
    }

    setDesignData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateGithubUrl(designData.imageUrl)) {
      setDesignData({
        name: "",
        description: "",
        theme: "",
        price: 0,
        imageUrl: "",
      })
      setShowErrorModal(true)
      return
    }

    console.log(designData)
      const response = await axios.get("http://localhost:8080/artista/uploadEstampa", {params: {      
        nombreEstampa: designData.name,
        descripcionEstampa: designData.description,
        nombreTema: designData.theme,
        precioEstampa: designData.price,
        enlaceImagen: designData.imageUrl}});
      
      if (response.data === true) {
        alert("Su estampa ha sido agregada al catalogo");
        navigate("/artista")
      }
      else{
        
         alert(" no se pudo subir :(")   
      }

    onUpload(designData)
    setDesignData({
      name: "",
      description: "",
      theme: "",
      price: 0,
      imageUrl: "",
    })
  }

  const helpSteps = [
    {
      title: "Crea un repositorio en Github",
      content: "En el panel izquierdo encontraras un boton que dice 'Nuevo'",
      image: "src/assets/PasosLink/Primer paso.png"
    },
    {
      title: "Ponle un nombre",
      content: "Elije un nombre para el repo, y revisa que sea publico",
      image: "src/assets/PasosLink/Segundo Paso.png"
    },
    {
      title: "Sube la imagen de tu estampa",
      content: "Encontraras un link que dice 'Subir un archivo existente', despues elije la imge y pon un mensaje en el commit",
      image: "src/assets/PasosLink/Tercer paso.png"
    },
    {
      title: "selecciona tu nueva imagen",
      content: "Tan solo debes dar click sobre el nombre de la imagen",
      image: "src/assets/PasosLink/Cuarto paso.png"
    },
    {
      title: "Abrir imagen en nueva pestaña",
      content: "Da click derecho sobre la imagen, y selecciona 'Abrir imagen en nueva pestaña'",
      image: "src/assets/PasosLink/Quinto paso.png"
    },
    {
      title: "Copia el link de la barra",
      content: "Veras en la barra de busqueda un link, copialo y pegalo en este espacio",
      image: "src/assets/PasosLink/Sexto paso.png"
    },
    {
      title: "RECUERDA",
      content: "Cuando quieras subir una nueva imagen, no es necesario crear un nuevo repositorio, comienza en el paso 3",
    }
  ]

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="name" className={styles.label}>
          Nombre de la estampa
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={designData.name}
          onChange={handleInputChange}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="description" className={styles.label}>
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={designData.description}
          onChange={handleInputChange}
          required
          className={styles.textarea}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="theme" className={styles.label}>
          Tema
        </label>
        <input
          id="theme"
          name="theme"
          type="text"
          value={designData.theme}
          onChange={handleInputChange}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="price" className={styles.label}>
          Precio
        </label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          value={designData.price}
          onChange={handleInputChange}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.labelWithHelp}>
          <label htmlFor="imageUrl" className={styles.label}>
            Link de la imagen
          </label>
          <button
            type="button"
            onClick={() => setShowHelpModal(true)}
            className={styles.helpButton}
          >
            <HelpCircle size={20} />
          </button>
        </div>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          value={designData.imageUrl}
          onChange={handleInputChange}
          required
          className={`${styles.input} ${showErrorModal ? styles.inputError : ''}`}
          placeholder="https://raw.githubusercontent.com/User/Ejemplo/refs/heads/main/estampa.png"
        />
      </div>

      <button type="submit" className={styles.button}>
        <Upload size={16} className={styles.up} /> Subir diseño
      </button>

      {/* Help Modal */}
      {showHelpModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>¿Cómo obtener el link de tu imagen?</h2>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className={styles.closeButton}
              >
                <X size={24} />
              </button>
            </div>
            <div className={styles.modalContent}>
              {helpSteps.map((step, index) => (
                <div key={index} className={styles.helpStep}>
                  <div className={styles.stepNumber}>{index + 1}</div>
                  <div className={styles.stepContent}>
                    <h3>{step.title}</h3>
                    <p>{step.content}</p>
                    {step.image && (
                      <img src={step.image} alt={step.title} className={styles.stepImage} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className={styles.errorModalOverlay} onClick={() => setShowErrorModal(false)}>
          <div className={styles.errorModal} onClick={e => e.stopPropagation()}>
            <div className={styles.errorIcon}>
              <AlertCircle size={48} />
            </div>
            <h2>Link no válido</h2>
            <p>El link debe comenzar con: <br /><code>https://raw.githubusercontent.com/</code></p>
            <div className={styles.errorModalActions}>
              <button
                className={styles.errorModalButton}
                onClick={() => {
                  setShowErrorModal(false)
                  setShowHelpModal(true)
                  setDesignData({
                    name: "",
                    description: "",
                    theme: "",
                    price: 0,
                    imageUrl: "",
                  })
                }}
              >
                Ver instrucciones
              </button>
              <button
                className={`${styles.errorModalButton} ${styles.secondary}`}
                onClick={() => {
                  setShowErrorModal(false)
                  setDesignData({
                    name: "",
                    description: "",
                    theme: "",
                    price: 0,
                    imageUrl: "",
                  })
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}