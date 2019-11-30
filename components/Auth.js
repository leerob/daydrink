/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useColorMode, Box, Stack, Flex, FormControl, FormLabel, FormErrorMessage, Input, Button} from '@chakra-ui/core';
import useForm from 'react-hook-form';
import Logo from '../components/Logo';

export default ({type, onSubmit}) => {
    const {colorMode} = useColorMode();
    const {handleSubmit, register, errors} = useForm();

    return (
        <Flex align="center" justify="center" h="100vh">
            <Stack
                as="form"
                onSubmit={handleSubmit((data) => onSubmit(data))}
                w="100%"
                maxWidth="400px"
                borderRadius={8}
                shadow="md"
                spacing={3}
                backgroundColor={colorMode === 'light' ? 'gray.100' : 'gray.900'}
                px={8}
                py={12}
            >
                <Box as="a" href="/" aria-label="daydrink, Back to homepage">
                    <Logo h="40px" mx="auto" />
                </Box>

                <FormControl isInvalid={errors.email && errors.email.message}>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                        name="email"
                        ref={register({
                            required: 'Please enter your email.'
                        })}
                        placeholder="name@site.com"
                    />
                    <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.pass && errors.pass.message}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        name="pass"
                        type="password"
                        ref={register({
                            required: 'Please enter a password.'
                        })}
                    />
                    <FormErrorMessage>{errors.pass && errors.pass.message}</FormErrorMessage>
                </FormControl>
                <Button type="submit" mt={4} variantColor="teal" variant="solid">
                    {type}
                </Button>
            </Stack>
        </Flex>
    );
};
