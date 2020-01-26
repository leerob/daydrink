import {Box, Flex, Heading, Text, Button} from '@chakra-ui/core';
import NextLink from 'next/link';

import Logo from '../components/Logo';

export const Container = (props) => <Box width="full" maxWidth="1280px" mx="auto" px={6} {...props} />;

const Header = ({onSignIn}) => (
    <Box as="header" width="full" height="4rem">
        <Box width="full" mx="auto" px={6} pr={[1, 6]} height="100%">
            <Flex size="100%" p={[0, 6]} pl={[0, 4]} align="center" justify="space-between">
                <Box as="a" d="block" href="/" aria-label="daydrink, Back to homepage">
                    <Logo w="100px" />
                </Box>
                <Flex align="center">
                    <Button onClick={onSignIn} variant="ghost">
                        {'Sign In'}
                    </Button>
                    <NextLink href="/deals" passHref>
                        <Button as="a">{'Find Deals'}</Button>
                    </NextLink>
                </Flex>
            </Flex>
        </Box>
    </Box>
);

const ErrorPage = ({onSignIn}) => {
    return (
        <Box h="100vh">
            <Header onSignIn={onSignIn} />
            <Box as="section" pt={40} pb={24}>
                <Container>
                    <Box maxW="xl" mx="auto" textAlign="center">
                        <Heading as="h1" size="xl" fontWeight="black">
                            Bar Not Found: Closing Time
                        </Heading>

                        <Text opacity="0.7" fontSize="lg" mt="6">
                            You don't have to go home, but you can't stay here.
                        </Text>

                        <Box mt="6">
                            <NextLink href="/" passHref>
                                <Button size="lg" as="a" variantColor="teal">
                                    Return Home
                                </Button>
                            </NextLink>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default ErrorPage;
