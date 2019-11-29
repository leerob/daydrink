import Filters from './Filters';
import {Box, Flex, Collapse, IconButton} from '@chakra-ui/core';
import {useState} from 'react';

const MobileFilters = () => {
    const [show, setShow] = useState(false);

    const handleToggle = () => setShow(!show);

    return (
        <Box display={['block', null, 'none']}>
            <Flex justify="flex-end">
                <IconButton variant="ghost" aria-label="Filter Deals" icon="email" onClick={handleToggle} />
            </Flex>
            <Collapse mt={2} isOpen={show}>
                <Filters />
            </Collapse>
        </Box>
    );
};

export default MobileFilters;
