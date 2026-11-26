"use client";

import { useState } from "react";
import Link from "next/link";
import {
  categorias,
  adicionarCategoria,
  atualizarCategoria,
  excluirCategoria,
} from "../../dados/exemplo.js";
import styles from "./page.module.css";

export default function Categorias() {
  const [lista, setLista] = useState([...categorias]);
  const [nome, setNome] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    const nomeLimpo = nome.trim();

    if (!nomeLimpo) {
      setErro("Informe o nome da categoria.");
      return;
    }

    const jaExiste = lista.some(
      (cat) =>
        cat.nome.toLowerCase() === nomeLimpo.toLowerCase() &&
        cat.id !== editandoId
    );

    if (jaExiste) {
      setErro("Já existe uma categoria com esse nome.");
      return;
    }

    setSalvando(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      if (editandoId !== null) {
        atualizarCategoria(editandoId, nomeLimpo);
        setLista([...categorias]);
        setSucesso("Categoria atualizada com sucesso.");
        setEditandoId(null);
      } else {
        adicionarCategoria(nomeLimpo);
        setLista([...categorias]);
        setSucesso("Categoria criada com sucesso.");
      }

      setNome("");
    } catch (err) {
      setErro(err.message || "Não foi possível salvar a categoria.");
    } finally {
      setSalvando(false);
    }
  }

  function iniciarEdicao(categoria) {
    setErro("");
    setSucesso("");
    setEditandoId(categoria.id);
    setNome(categoria.nome);
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setNome("");
    setErro("");
  }

  async function handleExcluir(id) {
    if (!window.confirm("Excluir esta categoria?")) return;

    setErro("");
    setSucesso("");

    try {
      excluirCategoria(id);
      setLista([...categorias]);

      if (editandoId === id) {
        cancelarEdicao();
      }

      setSucesso("Categoria removida.");
    } catch (err) {
      setErro(err.message || "Não foi possível excluir a categoria.");
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.topo}>
        <h1>Categorias</h1>
        <Link href="/" className="botao secundario">
          Voltar
        </Link>
      </div>

      <form onSubmit={handleSubmit} className={styles.formulario} noValidate>
        <h2 className={styles.subtitulo}>
          {editandoId !== null ? "Editar categoria" : "Nova categoria"}
        </h2>

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

        <div className={styles.linhaForm}>
          <div className={styles.campo}>
            <label htmlFor="nome-categoria">Nome da categoria</label>
            <input
              id="nome-categoria"
              name="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex.: Rede, Hardware, Software..."
              required
            />
          </div>

          <div className={styles.acoesForm}>
            <button type="submit" className="botao" disabled={salvando}>
              {salvando
                ? "Salvando..."
                : editandoId !== null
                  ? "Salvar"
                  : "Adicionar"}
            </button>

            {editandoId !== null && (
              <button
                type="button"
                className="botao secundario"
                onClick={cancelarEdicao}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>

      <section aria-label="Lista de categorias">
        {lista.length === 0 ? (
          <p className={styles.vazio}>Nenhuma categoria cadastrada.</p>
        ) : (
          <ul className={styles.lista}>
            {lista.map((cat) => (
              <li key={cat.id} className={styles.item}>
                <span className={styles.nomeItem}>{cat.nome}</span>
                <div className={styles.acoesItem}>
                  <button
                    type="button"
                    className={`botao secundario ${styles.botaoCompacto}`}
                    onClick={() => iniciarEdicao(cat)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className={`botao perigo ${styles.botaoCompacto}`}
                    onClick={() => handleExcluir(cat.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}