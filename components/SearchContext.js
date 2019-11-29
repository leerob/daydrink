import React, {useState} from 'react';

import Header from './Header';

const SearchContext = ({children}) => {
    const [search, setSearch] = useState('');
    const onSearch = (e) => {
        const searchValue = e.target.value;
        const valueWithoutSlash = searchValue.replace('/', '');

        e.preventDefault();
        setSearch(valueWithoutSlash);
    };

    return (
        <>
            <Header onSearch={onSearch} search={search} />
            {React.Children.map(children, (child) => React.cloneElement(child, {search}))}
        </>
    );
};

export default SearchContext;
