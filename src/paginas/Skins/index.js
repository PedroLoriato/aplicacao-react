import React, { useState, useEffect, useCallback } from "react";
import estilos from "./Skins.module.css";
import appEstilos from "../../App.module.css";
import Listagem from "../../componentes/Listagem";
import Botao from "../../componentes/Botao";

const itensPorPagina = 20; // Defina quantos itens carregar por vez
const apiURL = "https://bymykel.github.io/CSGO-API/api/pt-BR/skins.json";

// Mapeamento de IDs de filtros para nomes amigáveis
const filtros = {
  Todas: "Todas",
  csgo_inventory_weapon_category_pistols: "Pistolas",
  csgo_inventory_weapon_category_rifles: "Rifles",
  sfui_invpanel_filter_melee: "Facas",
  csgo_inventory_weapon_category_smgs: "Submetralhadoras",
  csgo_inventory_weapon_category_heavy: "Pesadas",
};

function Skins() {
  const [skins, setSkins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Estado para rastrear a página atual
  const [hasMore, setHasMore] = useState(true); // Controle para saber se há mais dados para carregar
  const [activeFilters, setActiveFilters] = useState(["Todas"]); // Estado para múltiplos filtros

  const handleFilter = (filter) => {
    if (filter === "Todas") {
      // Se "Todas" for selecionado, desmarque todos os outros
      setActiveFilters(["Todas"]);
    } else {
      setActiveFilters((prevFilters) => {
        const filtered = prevFilters.filter((f) => f !== "Todas");
        if (filtered.includes(filter)) {
          // Se o filtro já estiver ativo, remova-o
          const updatedFilters = filtered.filter((f) => f !== filter);
          return updatedFilters.length === Object.keys(filtros).length - 1 || updatedFilters.length === 0 ? ["Todas"] : updatedFilters;
        } else {
          // Adicionar filtro
          const newFilters = [...filtered, filter];
          return newFilters.length === Object.keys(filtros).length - 1 ? ["Todas"] : newFilters;
        }
      });
    }
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
      if (!activeFilters.includes("Todas")) {
        filteredData = data.filter((skin) =>
          activeFilters.includes(skin.category.id)
        );
      }

      // Calcular o início e fim dos itens a serem exibidos
      const startIndex = (page - 1) * itensPorPagina;
      const endIndex = startIndex + itensPorPagina;
      const newItems = filteredData.slice(startIndex, endIndex);

      if (newItems.length > 0) {
        setSkins((prevSkins) => [...prevSkins, ...newItems]); // Adiciona novos itens
      } else {
        setHasMore(false); // Se não houver novos itens, desabilita o carregamento
      }
    } catch (error) {
      console.error("Erro ao buscar skins do CS2:", error);
    } finally {
      setLoading(false);
    }
  }, [page, activeFilters]); // Adicione page e activeFilters como dependências

  useEffect(() => {
    fetchSkins(); // Carrega as skins da página atual
  }, [fetchSkins]); // useEffect depende de fetchSkins

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.offsetHeight - 500 &&
        hasMore &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1); // Incrementa a página para carregar mais dados
      }
    };

    window.addEventListener("scroll", handleScroll); // Adiciona o evento de scroll
    return () => window.removeEventListener("scroll", handleScroll); // Remove o evento de scroll ao desmontar
  }, [hasMore, loading]);

  return (
    <main className={`${appEstilos.DfColCenter} ${estilos.Skins}`}>
      <h1>SKINS</h1>
      <header className={`${appEstilos.DfRowCenter} ${estilos.HeaderMain}`}>
        <nav className={`${estilos.FiltroNav}`}>
          <h1 className={`${appEstilos.DfRowCenter}`}>CATEGORIAS DE ARMAS</h1>
          <ul className={`${appEstilos.DfRowCenter}`}>
            {Object.keys(filtros).map((filter) => (
              <li key={filter}>
                <button
                  className={`${estilos.BtnFiltro} ${activeFilters.includes(filter) ? estilos.BtnFiltroAtivo : ""
                    }`}
                  onClick={() => handleFilter(filter)}
                >
                  {filtros[filter]}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {loading && skins.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        <Listagem dados={skins} />
      )}
      {!hasMore && (
        <div className={`${estilos.FinalPagina} ${appEstilos.DfColCenter}`}>
          <p>Você Chegou ao Fim da Página.</p>
          <Botao onClick={() => window.scrollTo(0, 0)}>Voltar Ao Topo</Botao>
        </div>
      )}
    </main>
  );
}

export default Skins;