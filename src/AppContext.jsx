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
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const [results, setResults] = useState(false); // Estado para indicar se há resultados
    const [error, setError] = useState(null);

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