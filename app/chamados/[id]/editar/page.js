"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import FormChamado from "../../../../components/FormChamado/FormChamado";
import Mensagem from "../../../../components/Mensagem/Mensagem.js";
import {
  chamados,
  categorias,
  atualizarChamado,
} from "../../../../dados/exemplo.js";

function EditarChamadoConteudo() {
  const { id } = useParams();
  const router = useRouter();
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const chamado = chamados.find((c) => String(c.id) === String(id));

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

  async function salvar(valores) {
    if (enviando) return;

    setErro("");
    setSucesso(false);
    setEnviando(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      atualizarChamado(chamado.id, valores);

      setSucesso(true);
      timerRef.current = setTimeout(
        () => router.push(`/chamados/${chamado.id}`),
        1200
      );
    } catch (err) {
      setErro(err.message || "Não foi possível salvar as alterações.");
      setEnviando(false);
    }
  }

  return (
    <>
      <h1>Editar chamado</h1>
      <p style={{ marginBottom: "1rem" }}>
        <Link href={`/chamados/${chamado.id}`} className="botao secundario">
          Voltar
        </Link>
      </p>

      {erro && <Mensagem tipo="erro">{erro}</Mensagem>}
      {sucesso && (
        <Mensagem tipo="sucesso">Alterações salvas! Voltando...</Mensagem>
      )}

      <FormChamado
        valoresIniciais={chamado}
        categorias={categorias}
        onSalvar={salvar}
        textoBotao={enviando ? "Salvando..." : "Salvar alterações"}
        mostrarStatus={true}
        desabilitado={enviando}
      />
    </>
  );
}

export default function EditarChamado() {
  return (
    <Suspense fallback={<p>Carregando chamado...</p>}>
      <EditarChamadoConteudo />
    </Suspense>
  );
}