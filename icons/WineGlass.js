/** @jsx jsx */
import {useColorMode, Box} from '@chakra-ui/core';
import {jsx} from '@emotion/core';

const WineGlass = (props) => {
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
            <path d="M12 14a5 5 0 005-5c0-1.929-1.539-5-1.539-5H8.538S7 6.239 7 9a5 5 0 005 5zm0 0v6m0 0H8m4 0h4" />
        </Box>
    );
};

export default WineGlass;
