import React from 'react';
import useForm from 'react-hook-form';
import {request} from 'graphql-request';
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
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    Button
} from '@chakra-ui/core';

const API = 'https://daydrink.herokuapp.com/v1/graphql';

const createDeal = ({description, locationId}, onClose) => {
    const createDealMutation = `mutation createDeal($description: String!, $locationId: uuid!) {
        insert_deals(objects: {
          alcoholType: "BEER",
          description: $description,
          locationId: $locationId
        }) {
          returning {
            id
          }
        }
      }
    `;

    const variables = {
        description,
        locationId
    };

    request(API, createDealMutation, variables);
    onClose();
};

function AddDealModal() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const initialRef = React.useRef();
    const {handleSubmit, register, errors} = useForm();

    return (
        <>
            <Button onClick={onOpen} leftIcon="add" variantColor="teal" variant="solid" h="40px">
                Add New Deal
            </Button>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit((data) => createDeal(data, onClose))}>
                        <ModalHeader>Add Deal</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl isInvalid={errors.description && errors.description.message}>
                                <FormLabel>Description</FormLabel>
                                <Input
                                    name="description"
                                    ref={register({
                                        required: 'Please enter a description.'
                                    })}
                                    placeholder="$3 White Claws"
                                />
                                <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl mt={4} isInvalid={errors.locationId && errors.locationId.message}>
                                <FormLabel htmlFor="location">Location</FormLabel>
                                <Select
                                    ref={register({
                                        required: 'Please select a location.'
                                    })}
                                    name="locationId"
                                    id="location"
                                    placeholder="Select Bar"
                                >
                                    <option value="474bcdd3-ea8f-4fbf-a866-a56596ec2fd1">{`Johnny's`}</option>
                                </Select>
                                <FormErrorMessage>{errors.locationId && errors.locationId.message}</FormErrorMessage>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type="submit" leftIcon="check" variantColor="teal" ml={3}>
                                Create
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddDealModal;
