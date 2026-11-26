import Link from "next/link";
import { rotulosPrioridade } from "../../dados/exemplo.js";
import styles from "./CardChamado.module.css";

export default function CardChamado({ chamado }) {
  const prioridadeTexto = rotulosPrioridade[chamado.prioridade] || chamado.prioridade;

  return (
    <li className={styles.card}>
      <Link href={`/chamados/${chamado.id}`} className={styles.titulo}>
        {chamado.titulo}
      </Link>
      <p className={styles.categoria}>{chamado.categoria}</p>
      <div className={styles.etiquetas}>
        <span className={`etiqueta ${chamado.prioridade}`}>
          prioridade {prioridadeTexto}
        </span>
        <span className="etiqueta status">{chamado.status}</span>
      </div>
    </li>
  );
}