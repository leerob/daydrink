/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useColorMode, Box, Text} from '@chakra-ui/core';
import Header from '../components/Header';
import SideNav from '../components/SideNav';

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
                        <Text mb={2} fontWeight="bold">
                            {'Home'}
                        </Text>
                    </Container>
                </Box>
            </Box>
        </Box>
    );
};
