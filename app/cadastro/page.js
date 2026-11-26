"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!nome.trim() || !email.trim() || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      setErro("Informe um e-mail válido.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não conferem.");
      return;
    }

    setEnviando(true);

    const novoUsuario = {
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      senha,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("Dados prontos para o back-end:", novoUsuario);

      setSucesso("Cadastro realizado com sucesso!");
      setNome("");
      setEmail("");
      setSenha("");
      setConfirmarSenha("");
    } catch (err) {
      setErro(err.message || "Não foi possível concluir o cadastro.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className={styles.container}>
      <h1>Cadastro</h1>
      <p className={styles.subtitulo}>
        Crie sua conta para abrir e acompanhar chamados de TI.
      </p>

      <form onSubmit={handleSubmit} className={styles.formulario} noValidate>
        {erro && (
          <p className={styles.alertaErro} role="alert">
            {erro}
          </p>
        )}

        {sucesso && (
          <p className={styles.alertaSucesso} role="status">
            {sucesso}
          </p>
        )}

        <div className={styles.campo}>
          <label htmlFor="nome">Nome completo</label>
          <input
            id="nome"
            name="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex.: Maria Silva"
            autoComplete="name"
            required
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="maria@empresa.com"
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
            placeholder="Mínimo de 6 caracteres"
            autoComplete="new-password"
            required
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="confirmarSenha">Confirmar senha</label>
          <input
            id="confirmarSenha"
            name="confirmarSenha"
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            placeholder="Repita a senha"
            autoComplete="new-password"
            required
          />
        </div>

        <div className={styles.acoes}>
          <button type="submit" className="botao" disabled={enviando}>
            {enviando ? "Cadastrando..." : "Criar conta"}
          </button>
          <Link href="/" className="botao secundario">
            Voltar
          </Link>
        </div>

        <p className={styles.rodape}>
          Já tem uma conta? <Link href="/login">Entrar</Link>
        </p>
      </form>
    </section>
  );
}