import {Box, ColorModeProvider, CSSReset, ThemeProvider} from '@chakra-ui/core';
import {DefaultSeo} from 'next-seo';
import React from 'react';
import seo from '../seo.config';

export default ({Component, pageProps}) => (
    <ThemeProvider>
        <ColorModeProvider value="dark">
            <CSSReset />
            <Box>
                <DefaultSeo {...seo} />
                <Component {...pageProps} />
            </Box>
        </ColorModeProvider>
    </ThemeProvider>
);
