"use client"
 
import { Eye, EyeOff } from "lucide-react"
import styles from "../../style/DesignsView.module.css"
 
interface Design {
  id: number
  name: string
  description: string
  theme: string
  price: number
  imageUrl: string
  sales: number
  hidden: boolean
}
 
interface DesignsViewProps {
  designs: Design[]
  onToggleVisibility: (id: number) => void
}
 
export default function DesignsView({ designs, onToggleVisibility }: DesignsViewProps) {
  return (
    <div className={styles.grid}>
      {designs.map((design) => (
        <div key={design.id} className={`${styles.card} ${design.hidden ? styles.hidden : ""}`}>
          <div className={styles.cardContent}>
            <img src={design.imageUrl || "/placeholder.svg"} alt={design.name} className={styles.designImage} />
            <h3 className={styles.designName}>{design.name}</h3>
            <p className={styles.designTheme}>{design.theme}</p>
            <p className={styles.designPrice}>${design.price.toFixed(3)}</p>
            <p className={styles.salesInfo}>{design.sales} vendidos</p>
            <button className={styles.hideButton} onClick={() => onToggleVisibility(design.id)}>
              {design.hidden ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
 