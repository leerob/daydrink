/** @jsx jsx */
import {Box, Flex, IconButton, useColorMode, InputGroup, InputLeftElement, Input, Icon} from '@chakra-ui/core';
import {jsx} from '@emotion/core';
import {useState, useEffect, useRef} from 'react';

import MobileNav from './MobileNav';
import Logo from './Logo';

const useKeyPress = (targetKey) => {
    const [keyPressed, setKeyPressed] = useState(false);

    const downHandler = ({key}) => {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    };

    const upHandler = ({key}) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []);

    return keyPressed;
};

const Header = (props) => {
    const {onSearch, search, hideSearch, ...rest} = props;
    const {colorMode, toggleColorMode} = useColorMode();
    const inputRef = useRef();
    const slashPress = useKeyPress('/');
    const bg = {light: 'white', dark: 'gray.800'};

    if (slashPress) {
        inputRef.current.focus();
    }

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
            {...rest}
        >
            <Box width="full" mx="auto" px={6} pr={[1, 6]} height="100%">
                <Flex size="100%" p={[0, 6]} pl={[0, 4]} align="center" justify="space-between">
                    <Box as="a" d="block" href="/" aria-label="daydrink, Back to homepage">
                        <Logo w="100px" />
                    </Box>
                    <InputGroup display={['none', null, !hideSearch && 'block']} width="100%" ml={16} mr={16}>
                        <InputLeftElement children={<Icon name="search" color="gray.500" />} />
                        <Input
                            type="text"
                            onChange={onSearch}
                            value={search}
                            ref={inputRef}
                            autoFocus={slashPress}
                            placeholder={`Search for deals (Press "/" to focus)`}
                            bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                        />
                    </InputGroup>

                    <Flex align="center" color="gray.500">
                        <IconButton
                            aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
                            variant="ghost"
                            color="current"
                            ml="2"
                            fontSize="20px"
                            onClick={toggleColorMode}
                            icon={colorMode === 'light' ? 'moon' : 'sun'}
                        />
                        {!hideSearch && <MobileNav />}
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
};

export default Header;
