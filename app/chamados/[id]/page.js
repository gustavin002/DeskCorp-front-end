"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Mensagem from "../../../components/Mensagem/Mensagem";
import {
  chamados,
  excluirChamado,
  formatarData,
  rotulosPrioridade,
} from "../../../dados/exemplo.js";

export default function DetalheChamado() {
  const { id } = useParams();
  const router = useRouter();
  const [idExcluido, setIdExcluido] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const chamado = chamados.find((c) => String(c.id) === String(id));

  if (!chamado && String(idExcluido) === String(id)) {
    return (
      <Mensagem tipo="sucesso">
        Chamado excluído! Voltando para a lista...
      </Mensagem>
    );
  }

  if (!chamado) {
    return (
      <>
        <Mensagem tipo="erro">Chamado não encontrado.</Mensagem>
        <p style={{ marginTop: "1rem" }}>
          <Link href="/" className="botao secundario">
            Voltar para a lista
          </Link>
        </p>
      </>
    );
  }

  function handleExcluir() {
    if (!window.confirm("Excluir este chamado?")) return;

    excluirChamado(chamado.id);
    setIdExcluido(chamado.id);
    timerRef.current = setTimeout(() => router.push("/"), 1200);
  }

  const prioridadeTexto =
    rotulosPrioridade[chamado.prioridade] || chamado.prioridade;

  return (
    <article>
      <h1 style={{ overflowWrap: "anywhere" }}>{chamado.titulo}</h1>
      <p
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.4rem",
          marginBottom: "1rem",
        }}
      >
        <span className={`etiqueta ${chamado.prioridade}`}>
          prioridade {prioridadeTexto}
        </span>
        <span className="etiqueta status">{chamado.status}</span>
        <span className="etiqueta status">{chamado.categoria}</span>
      </p>
      <p style={{ marginBottom: "1rem", maxWidth: "65ch" }}>
        {chamado.descricao}
      </p>
      <p style={{ color: "var(--suave)", marginBottom: "1.5rem" }}>
        Aberto por {chamado.aberto_por} em {formatarData(chamado.criado_em)}
      </p>
      <p style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        <Link href={`/chamados/${chamado.id}/editar`} className="botao">
          Editar
        </Link>
        <button type="button" className="botao perigo" onClick={handleExcluir}>
          Excluir
        </button>
        <Link href="/" className="botao secundario">
          Voltar
        </Link>
      </p>
    </article>
  );
}