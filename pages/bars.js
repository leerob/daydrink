/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useColorMode, Box, Text, Flex, Spinner} from '@chakra-ui/core';
import {request} from 'graphql-request';
import useSWR from 'swr';

import SideNav from '../components/SideNav';
import MobileFilters from '../components/MobileFilters';
import BarCard from '../components/BarCard';

const API = 'https://daydrink.herokuapp.com/v1/graphql';

export const Container = (props) => <Box width="full" maxWidth="1280px" mx="auto" px={6} {...props} />;

const BarsPage = ({search}) => {
    const {colorMode} = useColorMode();
    const {data} = useSWR(
        `{
            locations {
                id
                name
                city
                state
                zip
                address
                imageUrl
                deals {
                  id
                }
              }
        }`,
        (query) => request(API, query)
    );

    const matchesSearch = (location) => location.name.toLowerCase().includes(search.toLowerCase());
    const allLocations = data ? data.locations : [];
    const filteredLocations = allLocations.filter(matchesSearch);

    return (
        <Box h="100%">
            <SideNav display={['none', null, 'block']} maxWidth="18rem" width="full" />
            <Box pl={[0, null, '18rem']} mt="4rem">
                <Box as="section" pt={6} pb={6} backgroundColor={colorMode === 'light' ? 'gray.100' : 'gray.900'}>
                    <Container>
                        <MobileFilters />
                        <Text mb={2} fontWeight="bold">
                            {'Open Now'}
                        </Text>

                        {!data ? (
                            <Flex pt={24} align="center" justify="center">
                                <Spinner size="xl" label="Loading Deals" />
                            </Flex>
                        ) : (
                            <>
                                {filteredLocations.map((bar) => (
                                    <BarCard key={bar.id} {...bar} />
                                ))}
                                <Flex justify="flex-end" as="i" color="gray.500">
                                    {`Showing ${filteredLocations.length} out of ${allLocations.length} bars in Des Moines`}
                                </Flex>
                            </>
                        )}
                    </Container>
                </Box>
            </Box>
        </Box>
    );
};

export default BarsPage;
