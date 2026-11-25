import Link from "next/link";
import styles from "./CardChamado.module.css";

export default function CardChamado({ chamado }) {
  return (
    <li className={styles.card}>
      <Link href={`/chamados/${chamado.id}`} className={styles.titulo}>{chamado.titulo}</Link>
      <p className={styles.categoria}>{chamado.categoria}</p>
      <div className={styles.etiquetas}>
        <span className={`etiqueta ${chamado.prioridade}`}>prioridade {chamado.prioridade}</span>
        <span className="etiqueta status">{chamado.status}</span>
      </div>
    </li>
  );
}