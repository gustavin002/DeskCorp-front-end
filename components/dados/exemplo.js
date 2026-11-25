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

  export const prioridades = ["baixa", "media", "alta"];
  
  export const statusLista = ["aberto", "em andamento", "resolvido"];
  
  export function formatarData(iso) {
    return new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
  }