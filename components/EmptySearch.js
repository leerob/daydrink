import {useColorMode, Stack, Text, Flex, Icon} from '@chakra-ui/core';
import React from 'react';

const EmptySearch = (props) => {
    const {colorMode} = useColorMode();

    return (
        <Flex justify="center" textAlign="center" mb={8} py={12}>
            <Stack align="center">
                <Icon name="search" size="64px" color="gray.500" />
                <Text fontSize="xl" fontWeight="bold" mt={4}>
                    No Results Found
                </Text>
                <Text color="gray.400">Nothing matched your search query.</Text>
            </Stack>
        </Flex>
    );
};

export default EmptySearch;
