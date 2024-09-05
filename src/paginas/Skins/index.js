import React, { useState, useEffect } from "react";
import estilos from "./Skins.module.css";
import appEstilos from "../../App.module.css";
import Listagem from "../../componentes/Listagem";
import Botao from "../../componentes/Botao";
import { Icon } from "@iconify/react";

function Skins() {
  const [skins, setSkins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeFilters, setActiveFilters] = useState(["Todas"]);
  const [orderBy, setOrderBy] = useState("OrdemOriginal");
  const [isCrescending, setIsCrescending] = useState(true);

  const itensPorPagina = 10;
  const apiURL = "https://bymykel.github.io/CSGO-API/api/pt-BR/skins.json";

  const filtros = {
    Todas: "Todas",
    csgo_inventory_weapon_category_pistols: "Pistolas",
    csgo_inventory_weapon_category_rifles: "Rifles",
    csgo_inventory_weapon_category_smgs: "Submetralhadoras",
    csgo_inventory_weapon_category_heavy: "Pesadas",
    sfui_invpanel_filter_melee: "Facas",
    sfui_invpanel_filter_gloves: "Luvas",
  };

  const opcoes = [
    { label: "Ordem Original", value: "OrdemOriginal" },
    { label: "Nome do Item", value: "NomeItem" },
    { label: "Nome da Skin", value: "NomeSkin" },
    { label: "Raridade", value: "Raridade" },
  ];

  // Define a ordem crescente das raridades das skins
  const raridadeOrdem = [
    "Nível Consumidor",
    "Nível Industrial",
    "Nível Militar",
    "Restrito",
    "Secreto",
    "Oculto",
    "Extraordinário",
    "Contrabandeado"
  ];

  // Cria um mapa para acessar rapidamente o índice da raridade
  // O mapa associa cada raridade a um índice baseado na sua posição na ordem crescente definida
  const raridadeParaIndice = raridadeOrdem.reduce((mapaIndice, raridade, indice) => {
    mapaIndice[raridade] = indice; // Associa a raridade ao seu índice
    return mapaIndice; // Retorna o mapa atualizado para a próxima iteração
  }, {});

  const handleOrderBy = (order) => {
    setOrderBy(order);
    setSkins([]);
    setPage(1);
    setHasMore(true);
  };

  const handleFilter = (filter) => {
    if (filter === "Todas") {
      setActiveFilters(["Todas"]);
    } else {
      setActiveFilters((prevFilters) => {
        const filtered = prevFilters.filter((f) => f !== "Todas");
        if (filtered.includes(filter)) {
          const updatedFilters = filtered.filter((f) => f !== filter);
          return updatedFilters.length === Object.keys(filtros).length - 1 ||
            updatedFilters.length === 0
            ? ["Todas"]
            : updatedFilters;
        } else {
          const newFilters = [...filtered, filter];
          return newFilters.length === Object.keys(filtros).length - 1
            ? ["Todas"]
            : newFilters;
        }
      });
    }
    setPage(1);
    setSkins([]);
    setHasMore(true);
  };

  useEffect(() => {
    const fetchSkins = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiURL);
        const data = await response.json();

        // Ajusta os dados para skins com pattern nulo
        const adjustedData = data.map((skin) => ({
          ...skin,
          pattern: skin.pattern || { name: "Vanilla" },
        }));

        // Filtra skins com base nos filtros ativos
        let filteredData = adjustedData;
        if (!activeFilters.includes("Todas")) {
          filteredData = adjustedData.filter((skin) =>
            activeFilters.includes(skin.category.id)
          );
        }

        // Ordena os dados com base na ordem e direção selecionadas
        filteredData.sort((a, b) => {
          let comparison = 0;
          if (orderBy === "NomeItem") {
            comparison = a.weapon.name.localeCompare(b.weapon.name);
          } else if (orderBy === "NomeSkin") {
            comparison = a.pattern.name.localeCompare(b.pattern.name);
          } else if (orderBy === "Raridade") {
            comparison = (raridadeParaIndice[a.rarity.name] || 0) - (raridadeParaIndice[b.rarity.name] || 0);
          }
          return isCrescending ? comparison : -comparison;
        });

        // Paginação
        const startIndex = (page - 1) * itensPorPagina;
        const endIndex = startIndex + itensPorPagina;
        const newItems = filteredData.slice(startIndex, endIndex);

        // Atualiza o estado com as novas skins
        setSkins((prevSkins) => {
          const allSkins = [...prevSkins, ...newItems];
          const uniqueSkins = Array.from(new Set(allSkins.map(skin => skin.id)))
            .map(id => allSkins.find(skin => skin.id === id));
          return uniqueSkins;
        });

        // Atualiza o estado para saber se há mais itens para carregar
        setHasMore(newItems.length >= itensPorPagina);
      } catch (error) {
        console.error("Erro ao buscar skins do CS2:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkins();
  
    // eslint-disable-next-line
  }, [page, activeFilters, orderBy, isCrescending]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.offsetHeight - 500 &&
        hasMore &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1); // Carrega mais itens ao rolar para baixo
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <main className={`${appEstilos.DfColCenter} ${estilos.Skins}`}>
      <div className={`${appEstilos.DfRow} ${estilos.DivSkins}`}>
        <h1>SKINS</h1>
        <div className={`${appEstilos.DfRowCenter} ${estilos.OrdenacaoDiv}`}>
          <div
            className={`${appEstilos.DfRowCenter} ${estilos.DivSltOrdenacao}`}
          >
            <select
              id="sltOrdenar"
              className={`${estilos.SltOrdenacao} ${appEstilos.DfRowCenter}`}
              onChange={(e) => handleOrderBy(e.target.value)}
            >
              <optgroup label="Ordenar por">
                {opcoes.map((opcao) => (
                  <option
                    key={opcao.value}
                    value={opcao.value}
                  >
                    {opcao.label}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
          <div>
            <label className={estilos.CustomCheckbox}>
              <input
                id="chkOrdenar"
                type="checkbox"
                checked={isCrescending}
                onChange={() => {
                  setIsCrescending((prevState) => !prevState);
                  setSkins([]); // Limpa as skins
                  setPage(1); // Reseta para a primeira página
                  setHasMore(true); // Permite mais carregamento
                }}
              />
              <span
                className={`${estilos.Checkmark} ${isCrescending ? estilos.Checked : ""
                  }`}
              >
                <Icon
                  icon="bi:filter"
                  style={{ color: "white" }}
                  className={estilos.FilterIcon}
                  width={30}
                />
              </span>
            </label>
          </div>
        </div>
      </div>
      <header className={`${appEstilos.DfRowCenter} ${estilos.HeaderMain}`}>
        <nav className={`${estilos.FiltroNav}`}>
          <h1 className={`${appEstilos.DfRowCenter}`}>CATEGORIAS</h1>
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