/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useToast} from '@chakra-ui/core';
import {useAuth} from '../utils/auth';
import Auth from '../components/Auth';
import {useRouter} from 'next/router';

export default () => {
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

    return <Auth type="Sign In" onSubmit={signIn} />;
};
