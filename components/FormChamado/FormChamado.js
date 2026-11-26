"use client";
import { useState } from "react";
import {
  prioridades,
  rotulosPrioridade,
  statusLista,
} from "../../dados/exemplo.js";
import styles from "./FormChamado.module.css";

const vazio = {
  titulo: "",
  descricao: "",
  prioridade: "media",
  status: "aberto",
  categoria_id: "",
};

function validar(v, mostrarStatus) {
  const e = {};
  const titulo = v.titulo.trim();
  if (titulo.length < 5 || titulo.length > 100) {
    e.titulo = "O título precisa ter de 5 a 100 caracteres.";
  }
  if (!v.descricao.trim()) {
    e.descricao = "A descrição é obrigatória.";
  }
  if (!prioridades.includes(v.prioridade)) {
    e.prioridade = "Escolha baixa, média ou alta.";
  }
  if (mostrarStatus && !statusLista.includes(v.status)) {
    e.status = "Escolha aberto, em andamento ou resolvido.";
  }
  if (!v.categoria_id) {
    e.categoria_id = "Escolha uma categoria.";
  }
  return e;
}

export default function FormChamado({
  valoresIniciais = vazio,
  categorias,
  onSalvar,
  textoBotao = "Salvar chamado",
  mostrarStatus = false,
  desabilitado = false,
}) {
  const [valores, setValores] = useState({
    ...vazio,
    ...valoresIniciais,
    categoria_id: valoresIniciais.categoria_id
      ? String(valoresIniciais.categoria_id)
      : "",
  });
  const [erros, setErros] = useState({});

  function mudar(e) {
    setValores({ ...valores, [e.target.name]: e.target.value });
  }

  function enviar(e) {
    e.preventDefault();
    const novosErros = validar(valores, mostrarStatus);
    setErros(novosErros);
    if (Object.keys(novosErros).length === 0) {
      onSalvar({
        ...valores,
        titulo: valores.titulo.trim(),
        descricao: valores.descricao.trim(),
        categoria_id: Number(valores.categoria_id),
        status: mostrarStatus ? valores.status : "aberto",
      });
    }
  }

  return (
    <form className={styles.form} onSubmit={enviar} noValidate>
      <label>
        Título
        <input
          name="titulo"
          value={valores.titulo}
          onChange={mudar}
          maxLength={150}
        />
        {erros.titulo && <span className={styles.erro}>{erros.titulo}</span>}
      </label>

      <label>
        Descrição
        <textarea
          name="descricao"
          rows={5}
          value={valores.descricao}
          onChange={mudar}
        />
        {erros.descricao && (
          <span className={styles.erro}>{erros.descricao}</span>
        )}
      </label>

      <label>
        Categoria
        <select
          name="categoria_id"
          value={valores.categoria_id}
          onChange={mudar}
        >
          <option value="">Selecione...</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>
        {erros.categoria_id && (
          <span className={styles.erro}>{erros.categoria_id}</span>
        )}
      </label>

      {mostrarStatus ? (
        <div className={styles.linha}>
          <label>
            Prioridade
            <select
              name="prioridade"
              value={valores.prioridade}
              onChange={mudar}
            >
              {prioridades.map((p) => (
                <option key={p} value={p}>
                  {rotulosPrioridade[p] || p}
                </option>
              ))}
            </select>
            {erros.prioridade && (
              <span className={styles.erro}>{erros.prioridade}</span>
            )}
          </label>
          <label>
            Status
            <select name="status" value={valores.status} onChange={mudar}>
              {statusLista.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {erros.status && (
              <span className={styles.erro}>{erros.status}</span>
            )}
          </label>
        </div>
      ) : (
        <label>
          Prioridade
          <select
            name="prioridade"
            value={valores.prioridade}
            onChange={mudar}
          >
            {prioridades.map((p) => (
              <option key={p} value={p}>
                {rotulosPrioridade[p] || p}
              </option>
            ))}
          </select>
          {erros.prioridade && (
            <span className={styles.erro}>{erros.prioridade}</span>
          )}
        </label>
      )}

      <button type="submit" className="botao" disabled={desabilitado}>
        {textoBotao}
      </button>
    </form>
  );
}