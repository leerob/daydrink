/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Box, Heading, Text, Button} from '@chakra-ui/core';
import Header from '../components/Header';
import NextLink from 'next/link';

export const Container = (props) => <Box width="full" maxWidth="1280px" mx="auto" px={6} {...props} />;

export default () => {
    return (
        <Box mb={20}>
            <Header hideSearch />
            <Box as="section" pt={40} pb={24}>
                <Container>
                    <Box maxW="xl" mx="auto" textAlign="center">
                        <Heading as="h1" size="xl" fontWeight="semibold">
                            Stop
                            <Box as="span" color="teal.500">
                                {' wasting money '}
                            </Box>
                            on drinks at the bar
                        </Heading>

                        <Text opacity="0.7" fontSize="xl" mt="6">
                            daydrink helps you find the best drink deals and happy hours in your area. View the cheapest
                            drinks for the day and filter down to exactly what you're searching for.
                        </Text>

                        <Box mt="6">
                            <NextLink href="/signup" passHref>
                                <Button size="lg" as="a" variantColor="teal">
                                    Sign Up
                                </Button>
                            </NextLink>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};
