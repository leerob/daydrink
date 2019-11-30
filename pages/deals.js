/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useColorMode, Box, Text, Flex, Spinner} from '@chakra-ui/core';

import DealCard from '../components/DealCard';
import SideNav from '../components/SideNav';
import MobileFilters from '../components/MobileFilters';
import {useDeals} from '../graphql/hooks';
import {useAuth} from '../utils/auth';

export const Container = (props) => <Box width="full" maxWidth="1280px" mx="auto" px={6} {...props} />;

const DealsPage = ({search}) => {
    const {colorMode} = useColorMode();
    const auth = useAuth();
    const data = useDeals();
    const userId = auth && auth.user && auth.user.uid;

    const matchesSearch = (deal) => deal.description.toLowerCase().includes(search.toLowerCase());
    const allDeals = data ? data.deals : [];
    const filteredDeals = allDeals.filter(matchesSearch);

    return (
        <Box h="100%">
            <SideNav display={['none', null, 'block']} maxWidth="18rem" width="full" />
            <Box pl={[0, null, '18rem']} mt="4rem">
                <Box as="section" pt={6} pb={6} backgroundColor={colorMode === 'light' ? 'gray.100' : 'gray.900'}>
                    <Container>
                        {/* <MobileFilters /> */}
                        <Text mb={2} fontWeight="bold">
                            {'Active Now'}
                        </Text>

                        {!data ? (
                            <Flex pt={24} align="center" justify="center">
                                <Spinner size="xl" label="Loading Deals" />
                            </Flex>
                        ) : (
                            <>
                                {filteredDeals.map((deal) => (
                                    <DealCard key={deal.id} userId={userId} {...deal} />
                                ))}
                                <Flex justify="flex-end" as="i" color="gray.500">
                                    {`Showing ${filteredDeals.length} out of ${allDeals.length} deals in Des Moines`}
                                </Flex>
                            </>
                        )}
                    </Container>
                </Box>
            </Box>
        </Box>
    );
};

export default DealsPage;
