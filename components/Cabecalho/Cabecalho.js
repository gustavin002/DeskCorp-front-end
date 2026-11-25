import Link from "next/link";
import styles from "./Cabecalho.module.css";

export default function Cabecalho() {
  return (
    <header className={styles.cabecalho}>
      <div className={styles.interno}>
        <Link href="/" className={styles.logo}>Help Desk</Link>
        <nav className={styles.menu}>
          <Link href="/">Chamados</Link>
          <Link href="/categorias">Categorias</Link>
          <Link href="/login">Entrar</Link>
          <Link href="/cadastro">Criar conta</Link>
        </nav>
      </div>
    </header>
  );
}