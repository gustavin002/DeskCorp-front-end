"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import FormChamado from "../../../../components/FormChamado/FormChamado";
import Mensagem from "../../../../components/Mensagem/Mensagem";
import { chamados, categorias } from "../../../../dados/exemplo";

export default function EditarChamado() {
  const { id } = useParams();
  const router = useRouter();
  const [sucesso, setSucesso] = useState(false);
  const chamado = chamados.find((c) => c.id === Number(id));

  if (!chamado) {
    return (
      <>
        <Mensagem tipo="erro">Chamado não encontrado.</Mensagem>
        <Link href="/">Voltar para a lista</Link>
      </>
    );
  }

  function salvar(valores) {
    console.log("Chamado editado:", valores);
    setSucesso(true);
    setTimeout(() => router.push(`/chamados/${chamado.id}`), 1200);
  }

  return (
    <>
      <h1>Editar chamado</h1>
      {sucesso && <Mensagem tipo="sucesso">Alterações salvas! Voltando...</Mensagem>}
      <FormChamado valoresIniciais={chamado} categorias={categorias} onSalvar={salvar} textoBotao="Salvar alterações" />
    </>
  );
}