"use client";
import { useState } from "react";
import Link from "next/link";
import Filtro from "../components/Filtro/Filtro";
import ListaChamados from "../components/ListaChamados/ListaChamados";
import { chamados, categorias, statusLista } from "../components/dados/exemplo.js";

export default function Home() {
  const [categoria, setCategoria] = useState("");
  const [status, setStatus] = useState("");

  const filtrados = chamados.filter(
    (c) => (!categoria || c.categoria_id === Number(categoria)) && (!status || c.status === status)
  );

  return (
    <>
      <h1>Chamados</h1>
      <p style={{ marginBottom: "1rem" }}>
        <Link href="/chamados/novo" className="botao">Novo chamado</Link>
      </p>
      <Filtro categorias={categorias} statusLista={statusLista} categoria={categoria} setCategoria={setCategoria} status={status} setStatus={setStatus} />
      <ListaChamados chamados={filtrados} />
    </>
  );
}