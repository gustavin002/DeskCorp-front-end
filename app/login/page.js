"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (!email.trim() || !senha) {
      setErro("Informe o e-mail e a senha.");
      return;
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      setErro("Informe um e-mail válido.");
      return;
    }

    setEnviando(true);

    const credenciais = {
      email: email.trim().toLowerCase(),
      senha,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("Credenciais prontas para o back-end:", credenciais);

      router.push("/");
    } catch (err) {
      setErro(err.message || "Não foi possível entrar. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className={styles.container}>
      <h1>Entrar</h1>
      <p className={styles.subtitulo}>
        Acesse sua conta para gerenciar seus chamados de TI.
      </p>

      <form onSubmit={handleSubmit} className={styles.formulario} noValidate>
        {erro && (
          <p className={styles.alertaErro} role="alert">
            {erro}
          </p>
        )}

        <div className={styles.campo}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            autoComplete="email"
            required
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            name="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            autoComplete="current-password"
            required
          />
        </div>

        <div className={styles.acoes}>
          <button type="submit" className="botao" disabled={enviando}>
            {enviando ? "Entrando..." : "Entrar"}
          </button>
          <Link href="/" className="botao secundario">
            Voltar
          </Link>
        </div>

        <p className={styles.rodape}>
          Ainda não tem uma conta? <Link href="/cadastro">Cadastre-se</Link>
        </p>
      </form>
    </section>
  );
}