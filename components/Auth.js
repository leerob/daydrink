/** @jsx jsx */
import {jsx} from '@emotion/core';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Stack,
    useColorMode,
    useDisclosure,
    useToast
} from '@chakra-ui/core';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/router';

import Logo from '../components/Logo';
import {useAuth} from '../utils/auth';

const AuthContent = ({register, errors, type, ...rest}) => (
    <Stack {...rest}>
        <Box as="a" href="/" aria-label="daydrink, Back to homepage">
            <Logo pb={8} w="200px" mx="auto" />
        </Box>
        <FormControl isInvalid={errors.email && errors.email.message}>
            <FormLabel>Email Address</FormLabel>
            <Input
                autoFocus
                aria-label="Email Address"
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
                aria-label="Password"
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
);

const FullScreenAuth = ({type, onSubmit}) => {
    const {colorMode} = useColorMode();
    const {handleSubmit, register, errors} = useForm();

    return (
        <Flex align="center" justify="center" h="100vh">
            <AuthContent
                as="form"
                backgroundColor={['none', colorMode === 'light' ? 'gray.100' : 'gray.900']}
                borderRadius={8}
                errors={errors}
                maxWidth="400px"
                onSubmit={handleSubmit((data) => onSubmit(data))}
                px={8}
                py={12}
                register={register}
                shadow={[null, 'md']}
                spacing={3}
                type={type}
                w="100%"
            />
        </Flex>
    );
};

const AuthModal = ({isOpen, onClose, type, onSubmit}) => {
    const {handleSubmit, register, errors} = useForm();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="400px">
            <ModalOverlay />
            <ModalContent borderRadius={4}>
                <ModalCloseButton />
                <ModalBody>
                    <Flex align="center" justify="center">
                        <AuthContent
                            as="form"
                            errors={errors}
                            onSubmit={handleSubmit((data) => onSubmit(data))}
                            px={8}
                            py={12}
                            register={register}
                            spacing={3}
                            type={type}
                            w="100%"
                        />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export const withAuthModal = (Component) => (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const auth = useAuth();
    const toast = useToast();

    const signUp = ({email, pass}) => {
        auth.signup(email, pass)
            .then(() => {
                toast({
                    title: 'Success! 🍻',
                    description: 'Your account has been created.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true
                });
                onClose();
            })
            .catch((error) => {
                toast({
                    title: 'An error occurred.',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true
                });
            });
    };
    return (
        <>
            <AuthModal isOpen={isOpen} onClose={onClose} type="Sign Up" onSubmit={signUp} />
            <Component openAuthModal={onOpen} {...props} />
        </>
    );
};

export const withSignInRedirect = (Component) => (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const auth = useAuth();
    const toast = useToast();
    const router = useRouter();

    const signIn = ({email, pass}) => {
        auth.signin(email, pass)
            .then(() => {
                router.push('/deals');
            })
            .catch((error) => {
                toast({
                    title: 'An error occurred.',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true
                });
            });
    };

    return (
        <>
            <AuthModal isOpen={isOpen} onClose={onClose} type="Sign In" onSubmit={signIn} />
            <Component onSignIn={onOpen} {...props} />
        </>
    );
};

export default FullScreenAuth;
