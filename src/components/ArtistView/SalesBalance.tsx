import styles from "../../style/SalesBalance.module.css"

interface Design {
  id: number
  name: string
  price: number
  sales: number
  revenue: number
}
 
interface SalesBalanceProps {
  designs: Design[]
}
 
export default function SalesBalance({ designs }: SalesBalanceProps) {
  const totalSales = designs.reduce((sum, design) => sum + design.sales, 0)
  const totalRevenue = designs.reduce((sum, design) => sum + design.revenue, 0)
 
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th>Nombre del Diseño</th>
            <th className={styles.textRight}>Precio</th>
            <th className={styles.textRight}>Ventas</th>
            <th className={styles.textRight}>Ingresos</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {designs.map((design) => (
            <tr key={design.id}>
              <td>{design.name}</td>
              <td className={styles.textRight}>${design.price.toFixed(2)}</td>
              <td className={styles.textRight}>{design.sales}</td>
              <td className={styles.textRight}>${design.revenue.toFixed(2)}</td>
            </tr>
          ))}
          <tr className={styles.totalRow}>
            <td colSpan={2} className={styles.textRight}>
              Total
            </td>
            <td className={styles.textRight}>{totalSales}</td>
            <td className={styles.textRight}>${totalRevenue.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
 
      <div className={styles.totalEarnings}>
        <span className={styles.totalAmount}>${totalRevenue.toFixed(2)}</span>
      </div>
    </div>
  )
}
 