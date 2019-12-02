import React, {useState, useContext, createContext} from 'react';
import {format} from 'date-fns';

const searchContext = createContext();

export function ProvideSearch({children}) {
    const search = useProvideSearch();
    return <searchContext.Provider value={search}>{children}</searchContext.Provider>;
}

export const useSearch = () => {
    return useContext(searchContext);
};

function useProvideSearch() {
    const today = format(new Date(), 'EEEE');
    const [search, setSearch] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState(today);
    const [alcoholTypeFilters, setAlcoholTypeFilters] = useState(['BEER', 'WINE', 'LIQUOR', 'FOOD']);

    const onChangeDayOfWeek = (e) => {
        setDayOfWeek(e.target.value);
    };

    const onFilterAlcoholType = (newValues) => {
        setAlcoholTypeFilters(newValues);
    };

    const onSearch = (e) => {
        e.preventDefault();

        const searchValue = e.target.value;
        const valueWithoutSlash = searchValue.replace('/', '');

        setSearch(valueWithoutSlash);
        return valueWithoutSlash;
    };

    return {
        alcoholTypeFilters,
        dayOfWeek,
        onFilterAlcoholType,
        onChangeDayOfWeek,
        onSearch,
        search
    };
}
