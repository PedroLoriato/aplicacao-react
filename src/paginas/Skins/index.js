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
  const [searchTerm, setSearchTerm] = useState(""); // Estado para realizar a busca
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm); // Estado para controlar as requisições da busca
  const [results, setResults] = useState(false); // Estado para indicar se há resultados

  const itensPorPagina = 10  // Quantidade de itens por página;
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

  const handleUpdate = () => {
    setSkins([]);       // Limpa as skins atuais
    setPage(1);         // Reseta para a primeira página
    setHasMore(true);   // Permite o carregamento de mais itens
    setLoading(true);   // Indica que os itens estão sendo carregados
  }

  const handleOrderBy = (order) => {
    setOrderBy(order);
    handleUpdate();
  };

  // Função para lidar com a busca
  const handleSearch = (term) => {
    setSearchTerm(term); // Atualiza o termo de busca
    handleUpdate();
  };

  // Função para lidar com a ordenação em ordem crescente ou descrescente
  const handleSenseOrder = () => {
    setIsCrescending((prevState) => !prevState);
    handleUpdate();
  }

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
    handleUpdate();
  };

  // Atualiza o debouncedSearchTerm após um tempo de inatividade do usuário
 useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 300); // 300ms debounce

  return () => {
    clearTimeout(handler);
  };
}, [searchTerm]);

  useEffect(() => {
    const fetchSkins = async () => {
      try {
        const response = await fetch(apiURL);
        const data = await response.json();

        // Ajusta os dados para skins com pattern nulo
        const adjustedData = data.map((skin) => ({
          ...skin,
          pattern: skin.pattern || { name: "Padrão" },
        }));

        // Filtra skins com base nos filtros ativos
        let filteredData = adjustedData;
        if (!activeFilters.includes("Todas")) {
          filteredData = filteredData.filter((skin) =>
            activeFilters.includes(skin.category.id)
          );
        }

        // Filtra por busca e categoria ativa
        if (debouncedSearchTerm) {
          filteredData = adjustedData.filter((skin) => {
            const matchesSearchTerm = (
              skin.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
              skin.pattern?.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
              skin.category?.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
              skin.rarity?.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            );

            const matchesCategory = activeFilters.includes("Todas") || activeFilters.includes(skin.category.id);

            return matchesSearchTerm && matchesCategory; // Filtra tanto pela busca quanto pela categoria
          });

          setResults(filteredData.length > 0);
        } else {
          filteredData = adjustedData;
        }

        // Ordena os dados com base na ordem e direção selecionadas
        filteredData.sort((a, b) => {
          let comparison = 0;
          if (orderBy === "NomeItem") {
            comparison = a.weapon.name.localeCompare(b.weapon.name, 'pt-BR');
          } else if (orderBy === "NomeSkin") {
            comparison = a.pattern.name.localeCompare(b.pattern.name, 'pt-BR');
          } else if (orderBy === "Raridade") {
            // Comparação direta entre os índices numéricos
            comparison = raridadeParaIndice[a.rarity.name] - raridadeParaIndice[b.rarity.name];
          }
          return isCrescending ? comparison : -comparison;
        });

        // Paginação

        // Calcula o índice inicial dos itens a serem exibidos na página atual.
        // A página atual é subtraída por 1 para ajustar o índice baseado em 0.
        // Multiplica pelo número de itens por página para obter o índice de início.
        const startIndex = (page - 1) * itensPorPagina;

        // Calcula o índice final dos itens a serem exibidos na página atual.
        // Adiciona o número de itens por página ao índice inicial para obter o índice final.
        const endIndex = startIndex + itensPorPagina;

        // Extrai um subconjunto dos dados filtrados com base nos índices calculados.
        // `slice` cria um novo array contendo os itens do índice inicial até o índice final (não inclusivo).
        const newItems = filteredData.slice(startIndex, endIndex);

        // Atualiza o estado com as novas skins
        setSkins((prevSkins) => {
          const allSkins = [...prevSkins, ...newItems];
          const uniqueSkins = allSkins.reduce((acc, skin) => {
            if (!acc.find(item => item.id === skin.id)) {
              acc.push(skin);
            }
            return acc;
          }, []);
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
  }, [page, activeFilters, orderBy, isCrescending, debouncedSearchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.offsetHeight - 500 &&
        hasMore &&
        !loading
      ) {
        setLoading(true); // Indica que mais itens estão sendo carregados
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
        <div className={`${appEstilos.DfRow} ${estilos.DivOpcoesListagem}`}>
          <div className={`${appEstilos.DfRowCenter} ${estilos.OrdenacaoDiv}`}>
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
            <div>
              <label className={estilos.CustomCheckbox}>
                <input
                  id="chkOrdenar"
                  type="checkbox"
                  checked={isCrescending}
                  onChange={handleSenseOrder}
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
          <div className={`${appEstilos.DfRowCenter} ${estilos.DivBusca}`}>
            <Icon className={estilos.IconeBusca} icon={"bi:search"}></Icon>
            <input
              className={estilos.InBusca}
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <header className={`${appEstilos.DfRowCenter} ${estilos.HeaderMain}`}>
        <nav className={`${estilos.FiltroNav}`}>
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
      {(loading && skins.length === 0) || (loading && !results) ? (
        <Listagem loading={loading} />
      ) : (
        <Listagem dados={skins} loading={loading} />
      )}
      {!loading && !results &&
        <div className={`${estilos.MsgErro} ${appEstilos.DfColCenter}`}>
          <h1>Nenhuma skin correspondente à sua busca.</h1>
          <h2>Por favor, revise a categoria selecionada e/ou verifique a ortografia do termo de busca.</h2>
        </div>
      }
      {!hasMore && results && page > 1 && (
        <Botao onClick={() => window.scrollTo(0, 0)}>Voltar Ao Topo</Botao>
      )}
    </main>
  );
}

export default Skins;