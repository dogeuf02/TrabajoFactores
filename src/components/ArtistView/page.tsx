"use client"
 
import { useState } from "react"
import ArtistHeader from "./ArtistHeader"
import DesignsView from "./DesignsView"
import UploadDesign from "./UploadDesign"
import SalesBalance from "./SalesBalance"
import styles from "../../style/ArtistDashboard.module.css"
 
interface Design {
  id: number
  name: string
  description: string
  theme: string
  price: number
  imageUrl: string
  sales: number
  revenue: number
  hidden: boolean
}
 
// Mock data for demonstration
const mockDesigns: Design[] = [
  {
    id: 1,
    name: "Cool Cat",
    description: "A cool cat design",
    theme: "Animals",
    price: 19.99,
    imageUrl: "https://i.pinimg.com/236x/3b/ee/c4/3beec464d8badf2c952dfbda82130e49.jpg",
    sales: 50,
    revenue: 999.5,
    hidden: false,
  },
  {
    id: 2,
    name: "Funky Monkey",
    description: "A funky monkey design",
    theme: "Animals",
    price: 24.99,
    imageUrl: "https://i.pinimg.com/236x/21/f4/d4/21f4d4229c9fffa0296ba5fba2ec1a35.jpg",
    sales: 30,
    revenue: 749.7,
    hidden: false,
  },
  {
    id: 3,
    name: "Space Odyssey",
    description: "An out-of-this-world space design",
    theme: "Sci-Fi",
    price: 29.99,
    imageUrl: "https://www.anmosugoi.com/wp-content/uploads/2019/09/snklevieren.jpg",
    sales: 40,
    revenue: 1199.6,
    hidden: false,
  },
]
 
export default function ArtistDashboard() {
  const [designs, setDesigns] = useState<Design[]>(mockDesigns)
  const [activeTab, setActiveTab] = useState("designs")
 
  const addNewDesign = (newDesign: Omit<Design, "id" | "sales" | "revenue" | "hidden">) => {
    const newDesignEntry: Design = {
      ...newDesign,
      id: designs.length + 1,
      sales: 0,
      revenue: 0,
      hidden: false,
    }
    setDesigns([...designs, newDesignEntry])
  }
 
  const toggleDesignVisibility = (id: number) => {
    setDesigns(designs.map((design) => (design.id === id ? { ...design, hidden: !design.hidden } : design)))
  }
 
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ArtistHeader
          initialName="Jane Doe"
          initialDescription="Artista apasionada por el diseño de camisetas. Creando arte que puedes vestir desde 2015."
          avatarUrl="/placeholder.svg?height=96&width=96"
        />
      </div>
 
      <div className={styles.tabsContainer}>
        <div className={styles.tabsList}>
          <button
            className={styles.tabsTrigger}
            data-state={activeTab === "designs" ? "active" : ""}
            onClick={() => setActiveTab("designs")}
          >
            Tus Diseños
          </button>
          <button
            className={styles.tabsTrigger}
            data-state={activeTab === "upload" ? "active" : ""}
            onClick={() => setActiveTab("upload")}
          >
            Subir Diseño
          </button>
          <button
            className={styles.tabsTrigger}
            data-state={activeTab === "sales" ? "active" : ""}
            onClick={() => setActiveTab("sales")}
          >
            Balance de Ventas
          </button>
        </div>
 
        <div className={`${styles.card} ${activeTab !== "designs" ? styles.hidden : ""}`}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Tus Diseños</h2>
            <p className={styles.cardDescription}>Ver y gestionar tus diseños de camisetas</p>
          </div>
          <div className={styles.cardContent}>
            <DesignsView designs={designs} onToggleVisibility={toggleDesignVisibility} />
          </div>
        </div>
 
        <div className={`${styles.card} ${activeTab !== "upload" ? styles.hidden : ""}`}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Subir Nuevo Diseño</h2>
            <p className={styles.cardDescription}>Añade un nuevo diseño de camiseta a tu colección</p>
          </div>
          <div className={styles.cardContent}>
            <UploadDesign onUpload={addNewDesign} />
          </div>
        </div>
 
        <div className={`${styles.card} ${activeTab !== "sales" ? styles.hidden : ""}`}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Balance de Ventas</h2>
            <p className={styles.cardDescription}>Resumen de tus ventas de camisetas e ingresos</p>
          </div>
          <div className={styles.cardContent}>
            <SalesBalance designs={designs.filter((design) => !design.hidden)} />
          </div>
        </div>
      </div>
    </div>
  )
}
 