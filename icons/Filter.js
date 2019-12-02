/** @jsx jsx */
import {Box} from '@chakra-ui/core';
import {jsx} from '@emotion/core';

const Filter = (props) => (
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
        <path d="M10 12.261L4.028 3.972h16L14 12.329V17l-4 3z" />
    </Box>
);

export default Filter;
