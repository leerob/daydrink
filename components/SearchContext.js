import React, {useState} from 'react';
import {useRouter} from 'next/router';

import Header from './Header';

const SearchContext = ({children}) => {
    const [search, setSearch] = useState('');
    const router = useRouter();
    const routesWithoutHeader = ['/signup', '/signin'];
    const shouldNotRenderHeader = routesWithoutHeader.find((route) => route === router.pathname);

    const onSearch = (e) => {
        const searchValue = e.target.value;
        const valueWithoutSlash = searchValue.replace('/', '');

        e.preventDefault();
        setSearch(valueWithoutSlash);
    };

    return (
        <>
            {!shouldNotRenderHeader && <Header onSearch={onSearch} search={search} />}
            {React.Children.map(children, (child) => React.cloneElement(child, {search}))}
        </>
    );
};

export default SearchContext;
