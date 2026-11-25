"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormChamado from "../../../components/FormChamado/FormChamado.js";
import Mensagem from "../../../components/Mensagem/Mensagem.js";
import { categorias } from "../../../components/dados/exemplo.js";

export default function NovoChamado() {
  const router = useRouter();
  const [sucesso, setSucesso] = useState(false);

  function salvar(valores) {
    console.log("Novo chamado:", valores);
    setSucesso(true);
    setTimeout(() => router.push("/"), 1200);
  }

  return (
    <>
      <h1>Novo chamado</h1>
      {sucesso && <Mensagem tipo="sucesso">Chamado salvo! Voltando para a lista...</Mensagem>}
      <FormChamado categorias={categorias} onSalvar={salvar} textoBotao="Cadastrar chamado" />
    </>
  );
}