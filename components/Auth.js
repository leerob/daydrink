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
    useColorMode
} from '@chakra-ui/core';
import useForm from 'react-hook-form';
import Logo from '../components/Logo';

const AuthContent = ({register, errors, type, ...rest}) => (
    <Stack {...rest}>
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

export const AuthModal = ({isOpen, onClose, type, onSubmit}) => {
    const {handleSubmit, register, errors} = useForm();

    return (
        <Modal isOpen={isOpen} onClose={onClose} borderRadius={8} size="400px">
            <ModalOverlay />
            <ModalContent>
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

export default FullScreenAuth;
