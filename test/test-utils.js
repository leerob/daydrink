import {render} from '@testing-library/react';
import {ThemeProvider, ColorModeProvider} from '@chakra-ui/core';
import '@testing-library/jest-dom';
import 'mutationobserver-shim';

const ChakraRenderer = ({children}) => {
    return (
        <ThemeProvider>
            <ColorModeProvider value="dark">{children}</ColorModeProvider>
        </ThemeProvider>
    );
};

const customRender = (ui, options) =>
    render(ui, {
        wrapper: ChakraRenderer,
        ...options
    });

export * from '@testing-library/react';
export {customRender as render};
