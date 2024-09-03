import React, { useState, useEffect, useCallback } from "react";
import estilos from "./Inicio.module.css";
import appEstilos from "../../App.module.css";
import Listagem from "../../componentes/Listagem";

const itensPorPagina = 20; // Defina quantos itens carregar por vez
const apiURL = "https://bymykel.github.io/CSGO-API/api/pt-BR/skins.json";

function Inicio() {
  const [skins, setSkins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Estado para rastrear a página atual
  const [hasMore, setHasMore] = useState(true); // Controle para saber se há mais dados para carregar
  const [filterType, setFilterType] = useState(null);

  const handleFilter = (filter) => {
    setFilterType(filter); // Atualiza o estado com o valor do filtro
    setPage(1); // Reseta para a primeira página ao mudar o filtro
    setSkins([]); // Limpa as skins para recarregar de acordo com o filtro
    setHasMore(true); // Permite carregamento de mais itens após mudança de filtro
  };

  const fetchSkins = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(apiURL);
      const data = await response.json();

      let filteredData = data;
      if (filterType && filterType !== "Todas") {
        filteredData = data.filter(skin => skin.category.id === filterType);
      }

      // Calcular o início e fim dos itens a serem exibidos
      const startIndex = (page - 1) * itensPorPagina;
      const endIndex = startIndex + itensPorPagina;
      const newItems = filteredData.slice(startIndex, endIndex);

      if (newItems.length > 0) {
        setSkins(prevSkins => [...prevSkins, ...newItems]); // Adiciona novos itens
      } else {
        setHasMore(false); // Se não houver novos itens, desabilita o carregamento
      }
    } catch (error) {
      console.error("Erro ao buscar skins do CS2:", error);
    } finally {
      setLoading(false);
    }
  }, [page, filterType]); // Adicione page e filterType como dependências

  useEffect(() => {
    fetchSkins(); // Carrega as skins da página atual
  }, [fetchSkins]); // Agora useEffect depende de fetchSkins

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 500 && hasMore && !loading) {
        setPage(prevPage => prevPage + 1); // Incrementa a página para carregar mais dados
      }
    };

    window.addEventListener('scroll', handleScroll); // Adiciona o evento de scroll
    return () => window.removeEventListener('scroll', handleScroll); // Remove o evento de scroll ao desmontar
  }, [hasMore, loading]);

  return (
    <main className={`${appEstilos.DfColCenter} ${estilos.Inicio}`}>
      <header className={`${appEstilos.DfRowCenter} ${estilos.HeaderMain}`}>
        <nav className={`${estilos.FiltroNav}`}>
          <ul className={`${appEstilos.DfRowCenter}`}>
            <li>
              <button onClick={() => handleFilter("Todas")}>Todas</button>
            </li>
            <li>
              <button onClick={() => handleFilter("csgo_inventory_weapon_category_pistols")}>Pistolas</button>
            </li>
            <li>
              <button onClick={() => handleFilter("csgo_inventory_weapon_category_rifles")}>Rifles</button>
            </li>
            <li>
              <button onClick={() => handleFilter("sfui_invpanel_filter_melee")}>Facas</button>
            </li>
            <li>
              <button onClick={() => handleFilter("csgo_inventory_weapon_category_smgs")}>Submetralhadoras</button>
            </li>
            <li>
              <button onClick={() => handleFilter("csgo_inventory_weapon_category_heavy")}>Pesadas</button>
            </li>
          </ul>
        </nav>
      </header>
      {loading && skins.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        <Listagem dados={skins} />
      )}
      {loading && skins.length > 0 && <p>Carregando mais itens...</p>}
      {!hasMore && <p>Você Chegou ao Fim da Página. Voltar Ao Topo</p>}
    </main>
  );
}

export default Inicio;