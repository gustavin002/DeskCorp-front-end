import styles from "./Filtro.module.css";

export default function Filtro({ categorias, statusLista, categoria, setCategoria, status, setStatus }) {
  return (
    <div className={styles.filtro}>
      <label>
        Categoria
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="">Todas</option>
          {categorias.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>
      </label>
      <label>
        Status
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Todos</option>
          {statusLista.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>
    </div>
  );
}