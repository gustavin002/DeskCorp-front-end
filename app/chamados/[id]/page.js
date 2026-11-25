"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import Mensagem from "../../../components/Mensagem/Mensagem";
import { chamados, formatarData } from "../../../dados/exemplo";

export default function DetalheChamado() {
  const { id } = useParams();
  const chamado = chamados.find((c) => c.id === Number(id));

  if (!chamado) {
    return (
      <>
        <Mensagem tipo="erro">Chamado não encontrado.</Mensagem>
        <Link href="/">Voltar para a lista</Link>
      </>
    );
  }

  return (
    <article>
      <h1 style={{ overflowWrap: "anywhere" }}>{chamado.titulo}</h1>
      <p style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
        <span className={`etiqueta ${chamado.prioridade}`}>prioridade {chamado.prioridade}</span>
        <span className="etiqueta status">{chamado.status}</span>
        <span className="etiqueta status">{chamado.categoria}</span>
      </p>
      <p style={{ marginBottom: "1rem", maxWidth: "65ch" }}>{chamado.descricao}</p>
      <p style={{ color: "var(--suave)", marginBottom: "1.5rem" }}>
        Aberto por {chamado.aberto_por} em {formatarData(chamado.criado_em)}
      </p>
      <p style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        <Link href={`/chamados/${chamado.id}/editar`} className="botao">Editar</Link>
        <button type="button" className="botao perigo" onClick={() => window.confirm("Excluir este chamado?")}>Excluir</button>
        <Link href="/" className="botao secundario">Voltar</Link>
      </p>
    </article>
  );
}