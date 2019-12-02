/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Text, Flex, Spinner} from '@chakra-ui/core';
import {useQuery} from '@apollo/react-hooks';

import {useSearch} from '../utils/search';
import {withApollo} from '../graphql/apollo';
import {GET_LOCATIONS_QUERY} from '../graphql/queries';
import App from '../components/App';
import BarCard from '../components/BarCard';

const BarsPage = () => {
    const {search} = useSearch();
    const {data} = useQuery(GET_LOCATIONS_QUERY);

    const matchesSearch = (location) => location.name.toLowerCase().includes(search.toLowerCase());
    const allLocations = data ? data.locations : [];
    const filteredLocations = allLocations.filter(matchesSearch);

    return (
        <App width="full" maxWidth="1280px" mx="auto" px={6} py={6}>
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
        </App>
    );
};

export default withApollo(BarsPage, {
    ssr: false
});
