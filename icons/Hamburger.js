/** @jsx jsx */
import {Box} from '@chakra-ui/core';
import {jsx} from '@emotion/core';

const Hamburger = (props) => (
    <Box
        as="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="gray.500"
        strokeLinecap="square"
        fill="none"
        h="24px"
        color="gray.500"
        {...props}
    >
        <path d="M6 7h12M6 12h12M6 17h12" />
    </Box>
);

export default Hamburger;
