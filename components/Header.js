/** @jsx jsx */
import {Box, Flex, IconButton, useColorMode, InputGroup, InputLeftElement, Input, Icon} from '@chakra-ui/core';
import {jsx} from '@emotion/core';
import Logo from './Logo';
import {Container} from '../pages';

const Header = (props) => {
    const {colorMode, toggleColorMode} = useColorMode();
    const bg = {light: 'white', dark: 'gray.800'};

    return (
        <Box
            pos="fixed"
            as="header"
            top="0"
            zIndex="4"
            bg={bg[colorMode]}
            left="0"
            right="0"
            borderBottomWidth="1px"
            width="full"
            height="4rem"
            {...props}
        >
            <Container h="100%">
                <Flex size="100%" px="6" align="center" justify="space-between">
                    <Box as="a" d="block" href="/" aria-label="Chakra UI, Back to homepage">
                        <Logo />
                    </Box>
                    <InputGroup display={['none', null, 'block']} width="100%" ml={16} mr={16}>
                        <InputLeftElement children={<Icon name="search" color="gray.500" />} />
                        <Input
                            type="text"
                            placeholder={`Search for deals (Press "/" to focus)`}
                            bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                        />
                    </InputGroup>

                    <Flex align="center" color="gray.500">
                        <IconButton
                            display={['block', null, 'none']}
                            aria-label="Search for deals"
                            icon="search"
                            fontSize="20px"
                            variant="ghost"
                            color="gray.500"
                        />
                        <IconButton
                            aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
                            variant="ghost"
                            color="current"
                            ml="2"
                            fontSize="20px"
                            onClick={toggleColorMode}
                            icon={colorMode === 'light' ? 'moon' : 'sun'}
                        />
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
};

export default Header;
