import React, { useEffect } from "react";
import estilos from "./Skins.module.css";
import appEstilos from "../../App.module.css";
import Listagem from "../../componentes/Listagem";
import { Icon } from "@iconify/react";
import { useAppContext } from '../../AppContext';
import BtnVoltarAoTopo from "../../componentes/BtnVoltarAoTopo";


function Skins() {
  const {
    skins, loading, page, hasMore, activeFilters, orderBy, isCrescending,
    searchTerm, debouncedSearchTerm, results, error,
    setSkins, setLoading, setPage, setHasMore, setActiveFilters, setOrderBy, setIsCrescending, setSearchTerm, setDebouncedSearchTerm, setResults,
    setError
  } = useAppContext();

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
  const handleSearch = () => {
    if (searchTerm !== debouncedSearchTerm) {
      setDebouncedSearchTerm(searchTerm);
      handleUpdate();
    }
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

  // useEffect que dispara quando o valor de searchTerm é atualizado
  useEffect(() => {
    if (searchTerm === "") {
      handleSearch(); // Limpa a busca e atualiza a lista se o campo de pesquisa for limpo
    }

    // eslint-disable-next-line
  }, [searchTerm]);

  // Função que dispara a busca quando a tecla "Enter" é pressionada
  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Realiza a busca quando a tecla "Enter" é pressionada
    }
  };

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
        setSkins(prevSkins => {
          const allSkins = [...prevSkins, ...newItems];
          return Array.from(new Set(allSkins.map(skin => skin.id)))
            .map(id => allSkins.find(skin => skin.id === id));
        });

        // Atualiza o estado para saber se há mais itens para carregar
        setHasMore(newItems.length >= itensPorPagina);
        setError(null);
      } catch (error) {
        setError("Erro ao buscar skins do CS2. Tente Novamente mais tarde.");
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
        hasMore && !loading
      ) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1); // Carrega mais itens ao rolar para baixo
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

    // eslint-disable-next-line
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
              value={orderBy}
              onChange={(e) => handleOrderBy(e.target.value)}
            >
              <optgroup label="Ordenar por" style={{ fontWeight: 300 }}>
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
            <Icon className={estilos.IconeBusca} icon={"bi:search"} onClick={handleSearch}></Icon>
            <input
              name="inputBusca"
              className={estilos.InBusca}
              type="search"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={handleKeyUp}
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
      {!loading && results && debouncedSearchTerm &&
        <h1 className={`${estilos.MsgBusca}`}>Exibindo resultados para a Busca <strong>"{debouncedSearchTerm}"</strong></h1>
      }
      {error ?
        <div className={`${estilos.MsgErro} ${appEstilos.DfColCenter}`}>
          <h1>{error}</h1>
        </div>
        : ((loading && skins.length === 0) || (loading && !results)) && page === 1 ? (
          <Listagem loading={loading} />
        ) : (!loading && !results && debouncedSearchTerm) ?
          <div className={`${estilos.MsgErro} ${appEstilos.DfColCenter}`}>
            <h1>Nenhum resultado correspondente à sua busca.</h1>
            <h2>Por favor, revise a categoria selecionada e/ou verifique a ortografia do termo de busca.</h2>
          </div> : (
            <Listagem skins={skins} />
          )}
      {hasMore && loading && page > 1 && (
        <div className={appEstilos.spinner}></div>
      )}
      <BtnVoltarAoTopo />
    </main>
  );
}

export default Skins;