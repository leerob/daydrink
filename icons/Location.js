/** @jsx jsx */
import {useColorMode, Box} from '@chakra-ui/core';
import {jsx} from '@emotion/core';

const Location = (props) => {
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
            <path d="M12 21c4-4.2 6-8.2 6-12A6 6 0 106 9c0 3.8 2 7.8 6 12z" />
            <circle cx="12" cy="9" r="1" />
        </Box>
    );
};

export default Location;
