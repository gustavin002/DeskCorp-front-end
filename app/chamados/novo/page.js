"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormChamado from "../../../components/FormChamado/FormChamado.js";
import Mensagem from "../../../components/Mensagem/Mensagem.js";
import { categorias, adicionarChamado } from "../../../dados/exemplo.js";

export default function NovoChamado() {
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

  async function salvar(valores) {
    if (enviando) return;

    setErro("");
    setSucesso(false);
    setEnviando(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      adicionarChamado(valores);

      setSucesso(true);
      timerRef.current = setTimeout(() => router.push("/"), 1200);
    } catch (err) {
      setErro(err.message || "Não foi possível salvar o chamado.");
      setEnviando(false);
    }
  }

  return (
    <>
      <h1>Novo chamado</h1>
      <p style={{ marginBottom: "1rem" }}>
        <Link href="/" className="botao secundario">
          Voltar para a lista
        </Link>
      </p>

      {erro && <Mensagem tipo="erro">{erro}</Mensagem>}
      {sucesso && (
        <Mensagem tipo="sucesso">
          Chamado salvo! Voltando para a lista...
        </Mensagem>
      )}

      <FormChamado
        categorias={categorias}
        onSalvar={salvar}
        textoBotao={enviando ? "Cadastrando..." : "Cadastrar chamado"}
        mostrarStatus={false}
        desabilitado={enviando}
      />
    </>
  );
}