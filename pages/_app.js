import {Global, css} from '@emotion/core';
import {ColorModeProvider, CSSReset, ThemeProvider} from '@chakra-ui/core';
import {DefaultSeo} from 'next-seo';
import React from 'react';
import seo from '../seo.config';
import SearchContext from '../components/SearchContext';
import {ProvideAuth} from '../utils/auth';

export default ({Component, pageProps}) => (
    <ProvideAuth>
        <ThemeProvider>
            <ColorModeProvider value="dark">
                <CSSReset />
                <Global
                    styles={css`
                        #__next {
                            height: 100%;
                        }
                    `}
                />
                <SearchContext>
                    <DefaultSeo {...seo} />
                    <Component {...pageProps} />
                </SearchContext>
            </ColorModeProvider>
        </ThemeProvider>
    </ProvideAuth>
);
