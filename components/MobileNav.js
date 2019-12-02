import {Drawer, DrawerBody, IconButton, useDisclosure, DrawerOverlay, DrawerContent} from '@chakra-ui/core';
import React, {useEffect} from 'react';
import {useRouter} from 'next/router';

import SideNav from './SideNav';
import Hamburger from '../icons/Hamburger';

const useRouteChanged = (callback) => {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url) => {
            callback();
            console.log('App is changing to: ', url);
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events, callback]);
};

const MobileNav = () => {
    const {isOpen, onToggle, onClose} = useDisclosure();

    useRouteChanged(onClose);

    return (
        <>
            <IconButton
                aria-label="Navigation Menu"
                fontSize="20px"
                variant="ghost"
                display={{sm: 'inline-flex', md: 'none'}}
                color="gray.500"
                icon={Hamburger}
                onClick={onToggle}
            />
            <Drawer size="xs" isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerBody p={0}>
                        <SideNav contentHeight="100vh" top="0" />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default MobileNav;
