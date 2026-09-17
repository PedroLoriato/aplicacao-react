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

  const itensPorPagina = 10
  const apiURL = "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json";

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

  const raridadeParaIndice = raridadeOrdem.reduce((mapaIndice, raridade, indice) => {
    mapaIndice[raridade] = indice; 
    return mapaIndice;
  }, {});

  const handleUpdate = () => {
    setSkins([]);  
    setPage(1);
    setHasMore(true); 
    setLoading(true);
  }

  const handleOrderBy = (order) => {
    setOrderBy(order);
    handleUpdate();
  };

  const handleSearch = () => {
    if (searchTerm !== debouncedSearchTerm) {
      setDebouncedSearchTerm(searchTerm);
      handleUpdate();
    }
  };

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

  useEffect(() => {
    if (searchTerm === "") {
      handleSearch()
    }
    // eslint-disable-next-line
  }, [searchTerm]);

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const fetchSkins = async () => {
      try {
        const response = await fetch(apiURL);
        const data = await response.json();

        const adjustedData = data.map((skin) => ({
          ...skin,
          pattern: skin.pattern || { name: "Padrão" },
        }));

        let filteredData = adjustedData;
        if (!activeFilters.includes("Todas")) {
          filteredData = filteredData.filter((skin) =>
            activeFilters.includes(skin.category.id)
          );
        }

        if (debouncedSearchTerm) {
          filteredData = adjustedData.filter((skin) => {
            const matchesSearchTerm = (
              (skin.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
              (typeof skin.pattern.name === 'string' && skin.pattern.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
              (typeof skin.category.name === 'string' && skin.category.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
              (skin.rarity?.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
            );
        
            const matchesCategory = activeFilters.includes("Todas") || activeFilters.includes(skin.category.id);
        
            return matchesSearchTerm && matchesCategory;
          });        

          setResults(filteredData.length > 0);
        }

        filteredData.sort((a, b) => {
          let comparison = 0;
        
          if (orderBy === "NomeItem") {
            comparison = a.weapon.name.localeCompare(b.weapon.name, 'pt-BR');
          } else if (orderBy === "NomeSkin") {
            const nomeSkinA = typeof a.pattern?.name === "string" ? a.pattern.name : "";
            const nomeSkinB = typeof b.pattern?.name === "string" ? b.pattern.name : "";
            comparison = nomeSkinA.localeCompare(nomeSkinB, 'pt-BR');
          } else if (orderBy === "Raridade") {
            const raridadeA = typeof a.rarity?.name === "string" ? a.rarity.name : "";
            const raridadeB = typeof b.rarity?.name === "string" ? b.rarity.name : "";
            comparison = raridadeParaIndice[raridadeA] - raridadeParaIndice[raridadeB];
          }
          return isCrescending ? comparison : -comparison;
        });

        const startIndex = (page - 1) * itensPorPagina;
        const endIndex = startIndex + itensPorPagina;
        const newItems = filteredData.slice(startIndex, endIndex);

        setSkins(prevSkins => {
          const allSkins = [...prevSkins, ...newItems];
          return Array.from(new Set(allSkins.map(skin => skin.id)))
            .map(id => allSkins.find(skin => skin.id === id));
        });

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
        setPage((prevPage) => prevPage + 1);
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
