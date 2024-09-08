import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
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
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}