import React from 'react';
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    Select,
    Button
} from '@chakra-ui/core';

function AddDealModal() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const initialRef = React.useRef();

    return (
        <>
            <Button onClick={onOpen} leftIcon="add" variantColor="teal" variant="solid">
                Add New Deal
            </Button>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Deal</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input ref={initialRef} placeholder="$3 White Claws" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel htmlFor="location">Location</FormLabel>
                            <Select id="location" placeholder="Select Bar" />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button leftIcon="check" variantColor="teal" ml={3}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddDealModal;
