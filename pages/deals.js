/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useColorMode, Box, Text, Flex} from '@chakra-ui/core';
import Header from '../components/Header';
import DealCard from '../components/DealCard';
import Filters from '../components/Filters';
import SideNav from '../components/SideNav';
import BarCard from '../components/BarCard';

export const Container = (props) => <Box width="full" maxWidth="1280px" mx="auto" px={6} {...props} />;

export default () => {
    const {colorMode} = useColorMode();

    return (
        <Box>
            <Header />
            <SideNav display={['none', null, 'block']} maxWidth="18rem" width="full" />
            <Box pl={[0, null, '18rem']} mt="4rem">
                <Box as="section" pt={6} pb={24} backgroundColor={colorMode === 'light' ? 'gray.100' : 'gray.900'}>
                    <Container>
                        <Filters display={['block', null, 'none']} />
                        <Text mb={2} fontWeight="bold">
                            {'Active Now'}
                        </Text>
                        <DealCard barName="Johnny's Hall of Fame" description="$3 White Claws" alcoholType="liquor" />
                        <DealCard barName="Annie's Irish Pub" description="$2.50 Miller High Life" alcoholType="beer" />
                        <DealCard barName="Beer Can Alley" description="$4 Blue Moon Cans" alcoholType="beer" />
                        <DealCard barName="Pint's Pub & Patio" description="Buy 1 Get 1 Bottles" alcoholType="wine" />
                        <Flex justify="flex-end" as="i" color="gray.500">
                            {'Showing 4 out of 57 deals in Des Moines'}
                        </Flex>
                    </Container>
                </Box>
            </Box>
        </Box>
    );
};
