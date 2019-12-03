/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Text, Flex, Spinner} from '@chakra-ui/core';

import {useDeals} from '../graphql/hooks';
import {useAuth} from '../utils/auth';
import {useSearch} from '../utils/search';
import {withApollo} from '../graphql/apollo';
import App from '../components/App';
import DealCard from '../components/DealCard';
import AddDealModal from '../components/AddDealModal';
import EmptySearch from '../components/EmptySearch';

const DealsPage = () => {
    const {userId} = useAuth();
    const {dayOfWeek, alcoholTypeFilters, search} = useSearch();
    const {data, loading} = useDeals(dayOfWeek);

    const matchesSearch = (deal) => deal.description.toLowerCase().includes(search.toLowerCase());
    const matchesAlcoholType = (deal) => alcoholTypeFilters.includes(deal.alcoholType);
    const allDeals = data ? data.deals : [];
    const filteredDeals = allDeals.filter(matchesSearch).filter(matchesAlcoholType);

    return (
        <App width="full" maxWidth="1280px" mx="auto" px={6} py={6}>
            <Text mb={2} fontSize="sm">
                {'Active '}
                <b>{dayOfWeek}</b>
                {' in '}
                <b>{'Des Moines'}</b>
            </Text>
            {loading ? (
                <Flex pt={24} align="center" justify="center">
                    <Spinner size="xl" label="Loading Deals" />
                </Flex>
            ) : (
                <>
                    {filteredDeals.length ? (
                        filteredDeals.map((deal) => <DealCard key={deal.id} userId={userId} {...deal} />)
                    ) : (
                        <EmptySearch />
                    )}
                    <Flex justify="flex-end" as="i" color="gray.500">
                        {`Showing ${filteredDeals.length} out of ${allDeals.length} deals in Des Moines`}
                    </Flex>
                    <Flex mt={8} display={['block', 'none', 'none', 'none']}>
                        <AddDealModal />
                    </Flex>
                </>
            )}
        </App>
    );
};

export default withApollo(DealsPage, {
    ssr: false
});
