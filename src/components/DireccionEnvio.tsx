import type React from "react";
import { useState } from "react";
import styles from "../style/MiCuenta.module.css";

interface Direccion {
  codigo_postal: number;
  nombre_direccion: string;
  direccion: string;
  detalles_direccion: string;
}

interface DireccionEnvioProps {
  direccion: Direccion;
}

export default function DireccionEnvio({ direccion }: DireccionEnvioProps) {
  return (
    <div className={styles.card}>
      <h3>Dirección de Envío</h3>
      <p>
        <strong>Nombre:</strong> {direccion.nombre_direccion}
      </p>
      <p>
        <strong>Dirección:</strong> {direccion.direccion}
      </p>
      <p>
        <strong>Detalles:</strong> {direccion.detalles_direccion}
      </p>
      <p>
        <strong>Código Postal:</strong> {direccion.codigo_postal}
      </p>
    </div>
  );
}
