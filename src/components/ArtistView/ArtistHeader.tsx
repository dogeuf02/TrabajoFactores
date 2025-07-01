"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import styles from "../../style/ArtistHeader.module.css"
import User from "../../assets/ProfileArtist.png"


interface ArtistHeaderProps {
  initialName: string
  initialDescription: string
}

export default function ArtistHeader({ initialName, initialDescription }: ArtistHeaderProps) {
  const [name, setName] = useState(initialName)
  const [description, setDescription] = useState(initialDescription)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios en el backend
    setIsEditing(false)
  }

  return (
    <div className={styles.header}>
      <div className={styles.avatar}>
        <img src={User || "/placeholder.svg"} alt={name} className={styles.avatarImage} />
      </div>
      <div className={styles.info}>
        {isEditing ? (
          <form className={styles.editForm}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              rows={3}
            />
            <button onClick={handleSave} className={styles.saveButton}>
              Guardar
            </button>
          </form>
        ) : (
          <>
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.description}>{description}</p>
            <button className={styles.editButton} onClick={() => setIsEditing(true)}>
              <Pencil size={16} />
              Editar perfil
            </button>
          </>
        )}
      </div>
    </div>
  )
}

