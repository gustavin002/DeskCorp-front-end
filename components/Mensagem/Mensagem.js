import styles from "./Mensagem.module.css";

export default function Mensagem({ tipo = "info", children }) {
  return (
    <p className={`${styles.mensagem} ${styles[tipo]}`} role={tipo === "erro" ? "alert" : "status"}>
      {children}
    </p>
  );
}