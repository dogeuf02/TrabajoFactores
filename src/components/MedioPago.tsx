import styles from "../style/MiCuenta.module.css";

interface Tarjeta {
  id: number;
  numeroTarjeta: string;
  tipoTarjeta: string;
  fechaVencimiento: string;
}

interface MedioPagoProps {
  tarjeta: Tarjeta;
}

export default function MedioPago({ tarjeta }: MedioPagoProps) {
  return (
    <div>
      <div key={tarjeta.id} className={styles.card}>
        <h3>Medio de Pago</h3>
        <p>Número: {tarjeta.numeroTarjeta}</p>
        <p>Tipo: {tarjeta.tipoTarjeta}</p>
        <p>Vencimiento: {tarjeta.fechaVencimiento}</p>
      </div>
    </div>
  );
}
