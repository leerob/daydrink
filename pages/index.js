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
                        <BarCard
                            barName="Johnny's Hall of Fame"
                            address="300 Court Ave, Des Moines, IA"
                            imageUrl="https://images.unsplash.com/photo-1543007630-9710e4a00a20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                        />
                        <BarCard
                            barName="Pints Pub & Patio"
                            address="528 Court Ave, Des Moines, IA"
                            imageUrl="https://images.unsplash.com/photo-1464979681340-bdd28a61699e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                        />
                        <BarCard
                            barName="Annie's Irish Pub"
                            address="150 Court Ave, Des Moines, IA"
                            imageUrl="https://images.unsplash.com/photo-1468072114808-903e572b8ead?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1332&q=80"
                        />
                        <BarCard
                            barName="Louie's Wine Dive"
                            address="426 5th Ave, Des Moines, IA"
                            imageUrl="https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80"
                        />
                    </Container>
                </Box>
            </Box>
        </Box>
    );
};
