/** @jsx jsx */
import {useColorMode, Box} from '@chakra-ui/core';
import {jsx} from '@emotion/core';

const Home = (props) => {
    const {colorMode} = useColorMode();

    return (
        <Box
            as="svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke={colorMode === 'light' ? '#2D3748' : '#fff'}
            strokeLinecap="square"
            fill="none"
            color={colorMode === 'light' ? '#2D3748' : '#fff'}
            {...props}
        >
            <path d="M3 10.182V22h18V10.182L12 2z" />
            <path d="M9 14h6v8H9z" />
        </Box>
    );
};

export default Home;
