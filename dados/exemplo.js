export const categorias = [
  { id: 1, nome: "Hardware" },
  { id: 2, nome: "Software" },
  { id: 3, nome: "Rede" },
  { id: 4, nome: "Acesso e senhas" },
];

export const chamados = [
  {
    id: 1,
    titulo: "Impressora do RH não imprime",
    descricao: "Aparece papel preso, mas não tem papel preso.",
    prioridade: "media",
    status: "aberto",
    categoria_id: 1,
    categoria: "Hardware",
    aberto_por: "Marina Souza",
    criado_em: "2026-11-20T09:15:00",
  },
  {
    id: 2,
    titulo: "Sem acesso ao sistema financeiro",
    descricao: "Aparece 'usuário bloqueado' ao entrar desde ontem.",
    prioridade: "alta",
    status: "em andamento",
    categoria_id: 4,
    categoria: "Acesso e senhas",
    aberto_por: "Carlos Lima",
    criado_em: "2026-11-21T14:40:00",
  },
  {
    id: 3,
    titulo: "Wi-Fi cai toda hora na sala 3",
    descricao: "A conexão some por uns 30 segundos a cada 10 minutos.",
    prioridade: "alta",
    status: "aberto",
    categoria_id: 3,
    categoria: "Rede",
    aberto_por: "Paula Reis",
    criado_em: "2026-11-22T08:05:00",
  },
  {
    id: 4,
    titulo: "Instalar o pacote Office no notebook novo",
    descricao: "O notebook do comercial chegou sem o Office instalado.",
    prioridade: "baixa",
    status: "resolvido",
    categoria_id: 2,
    categoria: "Software",
    aberto_por: "Rafael Costa",
    criado_em: "2026-11-18T10:30:00",
  },
  {
    id: 5,
    titulo: "Monitor com tela piscando",
    descricao: "O monitor da recepção pisca quando o brilho passa de 50%.",
    prioridade: "baixa",
    status: "aberto",
    categoria_id: 1,
    categoria: "Hardware",
    aberto_por: "Marina Souza",
    criado_em: "2026-11-23T11:20:00",
  },
  {
    id: 6,
    titulo: "E-mail não sincroniza no celular",
    descricao: "O app de e-mail mostra 'erro de autenticação' desde a troca de senha.",
    prioridade: "media",
    status: "em andamento",
    categoria_id: 4,
    categoria: "Acesso e senhas",
    aberto_por: "Julia Alves",
    criado_em: "2026-11-23T16:45:00",
  },
  {
    id: 7,
    titulo: "VPN não conecta de casa",
    descricao: "A VPN fica em 'conectando' e depois dá tempo esgotado.",
    prioridade: "media",
    status: "resolvido",
    categoria_id: 3,
    categoria: "Rede",
    aberto_por: "Carlos Lima",
    criado_em: "2026-11-19T17:10:00",
  },
];

let proximoChamadoId =
  chamados.length > 0 ? Math.max(...chamados.map((c) => c.id)) + 1 : 1;

let proximoCategoriaId =
  categorias.length > 0 ? Math.max(...categorias.map((c) => c.id)) + 1 : 1;

export const prioridades = ["baixa", "media", "alta"];

export const rotulosPrioridade = {
  baixa: "baixa",
  media: "média",
  alta: "alta",
};

export const statusLista = ["aberto", "em andamento", "resolvido"];

export function formatarData(iso) {
  return new Date(iso).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  });
}

export function adicionarChamado(dados) {
  const proximoId = proximoChamadoId++;
  const categoriaId = Number(dados.categoria_id);
  const categoriaObj = categorias.find((c) => c.id === categoriaId);

  const novoChamado = {
    id: proximoId,
    titulo: dados.titulo.trim(),
    descricao: dados.descricao.trim(),
    prioridade: dados.prioridade,
    status: "aberto",
    categoria_id: categoriaId,
    categoria: categoriaObj ? categoriaObj.nome : "Sem categoria",
    aberto_por: "Usuário logado",
    criado_em: new Date().toISOString(),
  };

  chamados.unshift(novoChamado);
  return novoChamado;
}

export function atualizarChamado(id, dados) {
  const indice = chamados.findIndex((c) => String(c.id) === String(id));
  if (indice === -1) return null;

  const categoriaId = Number(dados.categoria_id);
  const categoriaObj = categorias.find((c) => c.id === categoriaId);

  const atualizado = {
    ...chamados[indice],
    titulo: dados.titulo.trim(),
    descricao: dados.descricao.trim(),
    prioridade: dados.prioridade,
    status: dados.status,
    categoria_id: categoriaId,
    categoria: categoriaObj ? categoriaObj.nome : chamados[indice].categoria,
  };

  chamados[indice] = atualizado;
  return atualizado;
}

export function excluirChamado(id) {
  const indice = chamados.findIndex((c) => String(c.id) === String(id));
  if (indice === -1) return false;
  chamados.splice(indice, 1);
  return true;
}

export function adicionarCategoria(nome) {
  const nomeLimpo = nome.trim();
  const proximoId = proximoCategoriaId++;

  const novaCategoria = { id: proximoId, nome: nomeLimpo };
  categorias.push(novaCategoria);
  return novaCategoria;
}

export function atualizarCategoria(id, nome) {
  const nomeLimpo = nome.trim();
  const indice = categorias.findIndex((c) => c.id === Number(id));
  if (indice === -1) return null;

  categorias[indice] = { ...categorias[indice], nome: nomeLimpo };

  chamados.forEach((c) => {
    if (c.categoria_id === Number(id)) {
      c.categoria = nomeLimpo;
    }
  });

  return categorias[indice];
}

export function excluirCategoria(id) {
  const categoriaId = Number(id);
  const emUso = chamados.some((c) => c.categoria_id === categoriaId);

  if (emUso) {
    throw new Error(
      "Não é possível excluir: existem chamados vinculados a esta categoria."
    );
  }

  const indice = categorias.findIndex((c) => c.id === categoriaId);
  if (indice === -1) return false;

  categorias.splice(indice, 1);
  return true;
}