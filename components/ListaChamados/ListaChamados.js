import CardChamado from "../CardChamado/CardChamado";
import Mensagem from "../Mensagem/Mensagem";
import styles from "./ListaChamados.module.css";

export default function ListaChamados({ chamados }) {
  if (chamados.length === 0) {
    return <Mensagem>Nenhum chamado encontrado. Mude o filtro ou cadastre um chamado novo.</Mensagem>;
  }
  return (
    <ul className={styles.lista}>
      {chamados.map((c) => <CardChamado key={c.id} chamado={c} />)}
    </ul>
  );
}