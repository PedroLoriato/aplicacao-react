import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    // Estado para armazenar a lista de skins
    const [skins, setSkins] = useState([]);

    // Estado para indicar se a aplicação está carregando dados
    const [loading, setLoading] = useState(true);

    // Estado para armazenar a página atual da paginação
    const [page, setPage] = useState(1);

    // Estado para verificar se há mais itens para carregar
    const [hasMore, setHasMore] = useState(true);

    // Estado para armazenar os filtros ativos aplicados
    const [activeFilters, setActiveFilters] = useState(["Todas"]);

    // Estado para armazenar a ordem de exibição dos itens
    const [orderBy, setOrderBy] = useState("OrdemOriginal");

    // Estado para controlar a ordem crescente ou decrescente da exibição
    const [isCrescending, setIsCrescending] = useState(true);

    // Estado para realizar a busca de itens
    const [searchTerm, setSearchTerm] = useState(""); // Estado para realizar a busca

    // Estado para controlar as requisições da busca com debounce
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm); // Estado para controlar as requisições da busca

    // Estado para indicar se há resultados após a busca
    const [results, setResults] = useState(false); // Estado para indicar se há resultados

    // Estado para indicar um erro ao usuário
    const [error, setError] = useState(null);

    // Função para garantir que o scroll sempre comece do topo ao recarregar a página
    const handlePageReload = () => {
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        // Adiciona o listener para o evento de unload (recarregar ou sair da página)
        window.addEventListener('beforeunload', handlePageReload);

        // Remove o listener quando o componente for desmontado
        return () => {
            window.removeEventListener('beforeunload', handlePageReload);
        };
    }, []);

    return (
        <AppContext.Provider value={{
            skins, setSkins,
            loading, setLoading,
            page, setPage,
            hasMore, setHasMore,
            activeFilters, setActiveFilters,
            orderBy, setOrderBy,
            isCrescending, setIsCrescending,
            searchTerm, setSearchTerm,
            debouncedSearchTerm, setDebouncedSearchTerm,
            results, setResults,
            error, setError
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}