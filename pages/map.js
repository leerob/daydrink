/** @jsx jsx */
import {jsx} from '@emotion/core';
import dynamic from 'next/dynamic';
import {useColorMode, Box} from '@chakra-ui/core';
import Header from '../components/Header';
import SideNav from '../components/SideNav';

const Map = dynamic(() => import('../components/Map'), {
    ssr: false
});

export const Container = (props) => <Box width="full" maxWidth="1280px" mx="auto" {...props} />;

export default () => {
    const {colorMode} = useColorMode();

    return (
        <Box>
            <Header />
            <SideNav display={['none', null, 'block']} maxWidth="18rem" width="full" />
            <Box pl={[0, null, '18rem']} mt="4rem">
                <Box as="section" backgroundColor={colorMode === 'light' ? 'gray.100' : 'gray.900'}>
                    <Container>
                        <Map colorMode={colorMode} />
                    </Container>
                </Box>
            </Box>
        </Box>
    );
};
